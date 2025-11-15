import { Product, Category } from '@/types';
import { API_BASE_URL } from '@/lib/config';
import ProductCatalog from '@/components/ProductCatalog';

async function getProducts(categoryId?: string): Promise<Product[]> {
  try {
    const url = categoryId
      ? `${API_BASE_URL}/products?categoryId=${categoryId}`
      : `${API_BASE_URL}/products`;
    
    const res = await fetch(url, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      console.error('Failed to fetch products:', res.status, res.statusText);
      return [];
    }
    
    const response = await res.json();
    return response.data || response || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status, res.statusText);
      return [];
    }
    
    const response = await res.json();
    return response.data || response || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Product Catalog
        </h1>
        <p className="text-gray-600 text-lg">Discover amazing digital products</p>
      </div>
      
      <ProductCatalog 
        initialProducts={products} 
        initialCategories={categories} 
      />
    </div>
  );
}
