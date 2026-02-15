'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { addProduct, updateProduct, getProduct } from '@/lib/firestore-service';
import { Product } from '@/lib/db-types';

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  const isEdit = !!productId;

  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '/placeholder.svg?height=400&width=300',
    inStock: true,
    stock: 0,
  });

  useEffect(() => {
    if (isEdit) {
      loadProduct();
    }
  }, [isEdit, productId]);

  const loadProduct = async () => {
    try {
      const product = await getProduct(productId);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          inStock: product.inStock,
          stock: product.stock,
        });
      }
    } catch (error) {
      toast.error('Failed to load product');
      router.push('/admin/products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isEdit) {
        await updateProduct(productId, {
          ...formData,
          id: productId,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any);
        toast.success('Product updated successfully');
      } else {
        await addProduct({
          ...formData,
          id: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any);
        toast.success('Product added successfully');
      }
      router.push('/admin/products');
    } catch (error) {
      toast.error('Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0C0F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0C0F]">
      {/* Header */}
      <div className="bg-[#12131A] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/products" className="text-[#A6ACB8] hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-white">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Basic Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  className="prime-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    placeholder="0.00"
                    className="prime-input"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-white mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                    placeholder="0"
                    className="prime-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  className="prime-input min-h-24 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Oversized, Minimal"
                    className="prime-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-white mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="prime-input"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20"
                />
                <label htmlFor="inStock" className="text-white cursor-pointer">
                  Product is in stock
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 prime-btn-primary disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
            </Button>
            <Link href="/admin/products" className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
