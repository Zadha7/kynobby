import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, addProduct, updateProduct, deleteProduct } from '../../firebase';
import { Product } from '../../types';
import { Plus, Search, Edit2, Trash2, ExternalLink, Filter, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    rating: 4.5,
    reviews: 0,
    image: '',
    platform: 'Amazon',
    currency: 'USD',
    category: 'Electronics',
    description: '',
    features: [],
    affiliateUrl: '',
  });

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('title'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const productsData = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast.success('Product updated successfully!');
      } else {
        await addProduct(formData);
        toast.success('Product created successfully!');
      }
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete);
      toast.success('Product deleted successfully!');
      setIsDeleteConfirmOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error('Failed to delete product. Please check your permissions.');
    }
  };

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports'];
  const platforms = ['All', 'Amazon', 'Daraz', 'ClickBank', 'Alibaba', 'Hostinger', 'Bluehost'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'All' || p.platform === selectedPlatform;
    
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-2xl">
            <Filter className="w-4 h-4 text-zinc-400" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-sm font-bold text-zinc-600 focus:outline-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-2xl">
            <Filter className="w-4 h-4 text-zinc-400" />
            <select 
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-transparent text-sm font-bold text-zinc-600 focus:outline-none cursor-pointer"
            >
              {platforms.map(plat => (
                <option key={plat} value={plat}>{plat}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => {
              setEditingProduct(null);
              setFormData({
                title: '',
                price: 0,
                originalPrice: 0,
                discount: 0,
                rating: 4.5,
                reviews: 0,
                image: '',
                platform: 'Amazon',
                currency: 'USD',
                category: 'Electronics',
                description: '',
                features: [],
                affiliateUrl: '',
              });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">Product</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">Category</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">Price</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">Platform</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">Loading products...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">No products found.</td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden flex-shrink-0">
                        <img 
                          src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000'} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000';
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 line-clamp-1">{product.title}</p>
                        <p className="text-xs text-zinc-500">ID: {product.id.substring(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-zinc-900">{product.currency} {product.price}</p>
                    {product.discount && (
                      <p className="text-[10px] text-emerald-500 font-bold">-{product.discount}% OFF</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={`https://www.google.com/s2/favicons?domain=${product.platform.toLowerCase().includes('daraz') ? 'daraz.pk' : product.platform.toLowerCase() + '.com'}&sz=64`} 
                        className="w-4 h-4 rounded-sm" 
                        alt="" 
                      />
                      <span className="text-xs font-medium text-zinc-600">{product.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 transition-all">
                      <button 
                        onClick={() => {
                          setEditingProduct(product);
                          setFormData(product);
                          setIsModalOpen(true);
                        }}
                        className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setProductToDelete(product.id);
                          setIsDeleteConfirmOpen(true);
                        }}
                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <a 
                        href={product.affiliateUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-8 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-zinc-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-all"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Product Title</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Category</label>
                    <select
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home & Kitchen</option>
                      <option>Beauty</option>
                      <option>Sports</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Currency</label>
                    <select
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      value={formData.currency}
                      onChange={(e) => setFormData({...formData, currency: e.target.value as any})}
                    >
                      <option value="USD">USA (USD)</option>
                      <option value="GBP">United Kingdom (GBP)</option>
                      <option value="PKR">Pakistan (PKR)</option>
                      <option value="INR">India (INR)</option>
                      <option value="AED">United Arab Emirates (AED)</option>
                      <option value="SAR">Saudi Arabia (SAR)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Price</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Platform</label>
                    <select
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      value={formData.platform}
                      onChange={(e) => setFormData({...formData, platform: e.target.value as any})}
                    >
                      <option>Amazon</option>
                      <option>Daraz</option>
                      <option>ClickBank</option>
                      <option>Alibaba</option>
                      <option>Hostinger</option>
                      <option>Bluehost</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Image URL</label>
                  <input
                    required
                    type="url"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                  {formData.image && (
                    <div className="mt-2 w-32 h-32 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Affiliate URL</label>
                  <input
                    required
                    type="url"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    value={formData.affiliateUrl}
                    onChange={(e) => setFormData({...formData, affiliateUrl: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Features (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Fast shipping, 1 year warranty"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    value={formData.features?.join(', ')}
                    onChange={(e) => setFormData({...formData, features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '')})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 bg-zinc-100 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 text-center mb-2">Delete Product?</h3>
              <p className="text-zinc-500 text-center mb-8">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="flex-1 px-6 py-4 bg-zinc-100 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 px-6 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
