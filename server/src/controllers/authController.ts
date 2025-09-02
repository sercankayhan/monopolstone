import { Request, Response } from 'express';
import { sign, Secret, SignOptions } from 'jsonwebtoken';
import { User } from '../models';
import { asyncHandler, createError } from '../middleware';
import { AuthRequest } from '../middleware/auth';

const generateToken = (userId: string): string => {
  const jwtSecretEnv = process.env.JWT_SECRET;
  if (!jwtSecretEnv) {
    throw new Error('JWT_SECRET is not defined');
  }

  const jwtSecret: Secret = jwtSecretEnv as Secret;

  const options: SignOptions = {
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

  return sign({ userId }, jwtSecret, options);
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError('User already exists with this email', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'editor',
  });

  const token = generateToken(user._id.toString());

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, isActive: true }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw createError('Invalid email or password', 401);
  }

  const token = generateToken(user._id.toString());

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = req.user;
  
  if (!user) {
    throw createError('User not found', 404);
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    },
  });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, email } = req.body;
  const user = req.user;

  if (!user) {
    throw createError('User not found', 404);
  }

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email, _id: { $ne: user._id } });
    if (existingUser) {
      throw createError('Email is already in use', 400);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { name: name || user.name, email: email || user.email },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw createError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    },
  });
});

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const user = req.user;

  if (!user) {
    throw createError('User not found', 404);
  }

  const userWithPassword = await User.findById(user._id).select('+password');
  if (!userWithPassword || !(await userWithPassword.comparePassword(currentPassword))) {
    throw createError('Current password is incorrect', 400);
  }

  userWithPassword.password = newPassword;
  await userWithPassword.save();

  res.json({
    success: true,
    message: 'Password changed successfully',
  });
});

export const refreshToken = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = req.user;
  
  if (!user) {
    throw createError('User not found', 404);
  }

  const token = generateToken(user._id.toString());

  res.json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      token,
    },
  });
});