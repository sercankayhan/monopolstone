import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  specifications: {
    dimensions?: string;
    weight?: string;
    material?: string;
    finish?: string;
    thickness?: string;
    colors?: string[];
    [key: string]: any;
  };
  images: {
    url: string;
    alt: string;
    isPrimary: boolean;
    sortOrder: number;
  }[];
  category: mongoose.Types.ObjectId;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9-]+$/,
        'Slug can only contain lowercase letters, numbers, and hyphens',
      ],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    specifications: {
      dimensions: { type: String, trim: true },
      weight: { type: String, trim: true },
      material: { type: String, trim: true },
      finish: { type: String, trim: true },
      thickness: { type: String, trim: true },
      colors: [{ type: String, trim: true }],
    },
    images: [
      {
        url: {
          type: String,
          required: [true, 'Image URL is required'],
          trim: true,
        },
        alt: {
          type: String,
          required: [true, 'Image alt text is required'],
          trim: true,
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
        sortOrder: {
          type: Number,
          default: 0,
        },
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'SEO title cannot be more than 60 characters'],
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'SEO description cannot be more than 160 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

productSchema.index({ slug: 1 });
productSchema.index({ category: 1, isActive: 1, sortOrder: 1 });
productSchema.index({ isActive: 1, isFeatured: 1, sortOrder: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

productSchema.virtual('primaryImage').get(function () {
  return this.images.find(img => img.isPrimary) || this.images[0];
});

export default mongoose.model<IProduct>('Product', productSchema);