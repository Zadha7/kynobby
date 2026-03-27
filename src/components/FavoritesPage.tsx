import { useState, useEffect } from 'react';
import { Product, UserProfile } from '../types';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import ProductCard from './ProductCard';
import { Heart, ShoppingBag, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface FavoritesPageProps {
  isDarkMode: boolean;
  userProfile: UserProfile | null;
}

export default function FavoritesPage({ isDarkMode, userProfile }: FavoritesPageProps) {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile || userProfile.favorites.length === 0) {
      setFavoriteProducts([]);
      setLoading(false);
      return;
    }

    // Firestore 'in' query is limited to 10 items. 
    // For a real app, we might need to chunk this or fetch all and filter.
    // For now, let's fetch all products and filter client-side to be safe, 
    // or use the 'in' query if favorites are few.
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const allProducts = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      const filtered = allProducts.filter(p => userProfile.favorites.includes(p.id));
      setFavoriteProducts(filtered);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userProfile]);

  if (!userProfile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <Heart className="w-16 h-16 text-zinc-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Sign in to see favorites</h2>
        <p className="text-zinc-500 text-center max-w-md">
          Keep track of the best deals by adding them to your favorites list.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
          <Heart className="w-6 h-6 text-red-500 fill-current" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">My Favorites</h1>
          <p className="text-zinc-500">You have {favoriteProducts.length} saved deals</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      ) : favoriteProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-zinc-200 rounded-[2.5rem] p-12 text-center"
        >
          <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-zinc-300" />
          </div>
          <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
          <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
            Explore our deals and click the heart icon to save products you're interested in.
          </p>
          <a 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            Browse Deals
          </a>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isDarkMode={isDarkMode}
              isFavorite={true}
              onToggleFavorite={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}
