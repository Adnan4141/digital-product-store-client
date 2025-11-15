export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number; // Float in Prisma, number in TypeScript
  imageUrl: string | null;
  stock: number;
  categoryId: string | null;
  createdAt: string;
  category?: Category | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  price: number; // Float in Prisma, number in TypeScript
  quantity: number;
  product?: Product;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';

export interface Order {
  id: string;
  customerEmail: string;
  totalAmount: number; // Float in Prisma, number in TypeScript
  status: OrderStatus;
  stripePaymentIntentId: string | null;
  createdAt: string;
  items: OrderItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
