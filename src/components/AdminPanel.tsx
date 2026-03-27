import { useState } from 'react';
import { Plus, Trash2, Edit2, X, Save, Image as ImageIcon } from 'lucide-react';
import { addProduct, updateProduct, deleteProduct } from '../firebase';
import { Product } from '../types';
import { cn, getSymbol } from '../lib/utils';

export default function AdminPanel({ isDarkMode, products }: { isDarkMode: boolean, products: Product[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviews: 0,
    image: '',
    platform: 'Amazon',
    currency: 'USD',
    category: 'Electronics',
    description: '',
    features: [],
    affiliateUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct(editingId, formData);
      } else {
        await addProduct(formData);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving product", error);
      alert("Failed to save product. Check console.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: 0,
      originalPrice: 0,
      discount: 0,
      rating: 5,
      reviews: 0,
      image: '',
      platform: 'Amazon',
      currency: 'USD',
      category: 'Electronics',
      description: '',
      features: [],
      affiliateUrl: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  return (
    <section id="admin" className="py-20 bg-zinc-500/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Admin Panel</h2>
            <p className="text-zinc-500">Manage your deals and products.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

        {isAdding && (
          <div className={cn(
            "mb-12 p-8 rounded-3xl border animate-in fade-in slide-in-from-top-4",
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
          )}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={resetForm} className="p-2 hover:bg-zinc-500/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Product Title</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500/50 outline-none", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Currency</label>
                    <select 
                      value={formData.currency}
                      onChange={e => setFormData({...formData, currency: e.target.value as any})}
                      className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500/50 outline-none", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}
                    >
                      <option value="USD">USA (USD)</option>
                      <option value="GBP">United Kingdom (GBP)</option>
                      <option value="PKR">Pakistan (PKR)</option>
                      <option value="INR">India (INR)</option>
                      <option value="AED">United Arab Emirates (AED)</option>
                      <option value="SAR">Saudi Arabia (SAR)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Price</label>
                    <input 
                      required
                      type="number" 
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500/50 outline-none", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Original Price</label>
                    <input 
                      type="number" 
                      value={formData.originalPrice}
                      onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})}
                      className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500/50 outline-none", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Platform</label>
                    <select 
                      value={formData.platform}
                      onChange={e => setFormData({...formData, platform: e.target.value as any})}
                      className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500/50 outline-none", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}
                    >
                      <option value="Amazon">Amazon</option>
                      <option value="Daraz">Daraz</option>
                      <option value="ClickBank">ClickBank</option>
                      <option value="Alibaba">Alibaba</option>
                      <option value="Hostinger">Hostinger</option>
                      <option value="Bluehost">Bluehost</option>
                    </select>
                  </div>
                </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500/50 outline-none", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Digital Products">Digital Products</option>
                      <option value="Hosting">Hosting</option>
                    </select>
                  </div>
                </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input 
                      required
                      type="url" 
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className={cn("w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500/50 outline-none", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Affiliate URL</label>
                  <input 
                    required
                    type="url" 
                    value={formData.affiliateUrl}
                    onChange={e => setFormData({...formData, affiliateUrl: e.target.value})}
                    className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500/50 outline-none", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className={cn("w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none", isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200")}
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button 
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 rounded-xl font-bold border border-zinc-800 hover:bg-zinc-500/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {products.map(product => (
            <div 
              key={product.id}
              className={cn(
                "flex items-center gap-6 p-4 rounded-2xl border transition-all",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
              )}
            >
              <img src={product.image} className="w-20 h-20 rounded-xl object-cover" alt="" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded">
                    {product.platform}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-500/10 text-zinc-500 rounded">
                    {product.category}
                  </span>
                </div>
                <h4 className="font-bold">{product.title}</h4>
                <p className="text-emerald-500 font-bold">{getSymbol(product.currency)} {product.price}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(product)}
                  className="p-3 rounded-xl bg-zinc-500/10 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-3 rounded-xl bg-zinc-500/10 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
