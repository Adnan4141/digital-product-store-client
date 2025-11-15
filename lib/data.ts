import { Product, Category } from '@/types';

// In-memory data store (replace with database in production)
let products: Product[] = [
  {
    id: '1',
    name: 'Premium Digital Course',
    description: 'Learn advanced techniques with this comprehensive course',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    stock: 100,
    categoryId: '1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Design Template Pack',
    description: 'Professional design templates for your projects',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    stock: 50,
    categoryId: '2',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Software License',
    description: 'One-year license for premium software',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
    stock: 25,
    categoryId: '3',
    createdAt: new Date().toISOString(),
  },
];

let categories: Category[] = [
  {
    id: '1',
    name: 'Courses',
    slug: 'courses',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Templates',
    slug: 'templates',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Software',
    slug: 'software',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getProducts(categoryId?: string): Product[] {
  if (categoryId) {
    return products.filter((p) => p.categoryId === categoryId);
  }
  return products;
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = {
    ...products[index],
    ...updates,
  };
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Category {
  const newCategory: Category = {
    ...category,
    id: Date.now().toString(),
    slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  categories.push(newCategory);
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  categories[index] = {
    ...categories[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return categories[index];
}

export function deleteCategory(id: string): boolean {
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return false;
  categories.splice(index, 1);
  return true;
}

