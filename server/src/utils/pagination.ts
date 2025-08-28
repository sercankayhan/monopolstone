import { Document, Query } from 'mongoose';
import { PaginationOptions, ApiResponse } from '../types';

export const paginate = async <T extends Document>(
  query: Query<T[], T>,
  options: PaginationOptions
): Promise<{
  docs: T[];
  pagination: ApiResponse['pagination'];
}> => {
  const { page = 1, limit = 10, sort = '-createdAt' } = options;
  const skip = (page - 1) * limit;

  const [docs, total] = await Promise.all([
    query.sort(sort).skip(skip).limit(limit).exec(),
    query.model.countDocuments(query.getFilter()),
  ]);

  const pages = Math.ceil(total / limit);

  return {
    docs,
    pagination: {
      page,
      limit,
      total,
      pages,
    },
  };
};

export const buildSearchQuery = (searchTerm: string, fields: string[]) => {
  if (!searchTerm) return {};

  const searchRegex = new RegExp(searchTerm, 'i');
  return {
    $or: fields.map(field => ({
      [field]: { $regex: searchRegex },
    })),
  };
};