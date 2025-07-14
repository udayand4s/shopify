'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useStore, Product } from '@/contexts/StoreContext';
import { Plus, Edit, Trash2, Package, Star } from 'lucide-react';
import { toast } from 'sonner';

export function ProductManager() {
  const { state, dispatch } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    inventory: 0,
    featured: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const product: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name!,
      description: formData.description!,
      price: formData.price || 0,
      category: formData.category!,
      image: formData.image || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      inventory: formData.inventory || 0,
      featured: formData.featured || false,
    };

    if (editingProduct) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: product });
      toast.success('Product updated successfully');
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: product });
      toast.success('Product added successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      inventory: 0,
      featured: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (productId: string) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: productId });
    toast.success('Product deleted successfully');
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !state.categories.includes(newCategory.trim())) {
      dispatch({ type: 'ADD_CATEGORY', payload: newCategory.trim() });
      setNewCategory('');
      setShowCategoryForm(false);
      toast.success('Category added successfully');
    }
  };

  const handleDeleteCategory = (category: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: category });
    toast.success('Category deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
          <p className="text-gray-600 mt-1">Manage your store inventory and categories</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Category Management */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {state.categories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-2">
                {category}
                <button
                  onClick={() => handleDeleteCategory(category)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          
          {showCategoryForm ? (
            <div className="flex gap-2">
              <Input
                placeholder="Category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <Button onClick={handleAddCategory} size="sm">Add</Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCategoryForm(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCategoryForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Product Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {state.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input
                    id="inventory"
                    type="number"
                    value={formData.inventory}
                    onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                {product.featured && <Star className="h-4 w-4 text-yellow-500" />}
              </div>
              
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-lg">${product.price}</span>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  {product.inventory} in stock
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}