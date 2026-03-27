import { useState, useEffect } from 'react';
import Hero from './Hero';
import ProductMarquee from './ProductMarquee';
import Partners from './Partners';
import ProductCard from './ProductCard';
import FeaturedProduct from './FeaturedProduct';
import Dashboard from './Dashboard';
import { Product, UserProfile } from '../types';
import { db } from '../firebase';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { Laptop, Smartphone, Globe, Filter, Loader2, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';

interface HomePageProps {
  isDarkMode: boolean;
  userProfile: UserProfile | null;
  searchTerm: string;
}

export default function HomePage({ isDarkMode, userProfile, searchTerm }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Products
    const q = query(collection(db, 'products'), orderBy('title'));
    const unsubscribeProducts = onSnapshot(q, (snap) => {
      const productsData = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribeProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProduct = products[0];

  return (
    <div className="flex flex-col">
      <Hero isDarkMode={isDarkMode} />
      <ProductMarquee isDarkMode={isDarkMode} />
      <Partners isDarkMode={isDarkMode} />

      {/* Categories Section */}
      <section id="categories" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'All', icon: Filter },
              { name: 'Electronics', icon: Smartphone },
              { name: 'Digital Products', icon: Laptop },
              { name: 'Web Hosting', icon: Globe },
              { name: 'Wholesale', icon: ShoppingBag },
            ].map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-xl border transition-all",
                  selectedCategory === cat.name ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-zinc-100 bg-zinc-50 hover:bg-zinc-100"
                )}
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm">
                  <cat.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-sm font-bold text-zinc-600">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section id="deals" className="py-12 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              </div>
            ) : (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isDarkMode={isDarkMode}
                  isFavorite={userProfile?.favorites.includes(product.id) || false}
                  onToggleFavorite={() => {}}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {featuredProduct && <FeaturedProduct product={featuredProduct} isDarkMode={isDarkMode} />}
      
      <Dashboard isDarkMode={isDarkMode} products={products} />
    </div>
  );
}
