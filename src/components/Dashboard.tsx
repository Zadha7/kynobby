import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserProfile, Product } from '../types';
import { Heart, History, ChevronRight, ShoppingCart } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Dashboard({ isDarkMode, products }: { isDarkMode: boolean, products: Product[] }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!auth.currentUser) return;
    const unsubscribe = onSnapshot(doc(db, 'users', auth.currentUser.uid), (snap) => {
      if (snap.exists()) setProfile(snap.data() as UserProfile);
    });
    return () => unsubscribe();
  }, []);

  if (!profile) return null;

  const favoriteProducts = products.filter(p => profile.favorites.includes(p.id));
  const recentClicks = [...profile.clickHistory].reverse().slice(0, 5);

  return (
    <section id="dashboard" className="py-12 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">My Dashboard</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Favorites */}
          <div className={cn(
            "p-6 rounded-xl border bg-white shadow-sm",
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "border-zinc-200"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center gap-2">
                Favorites
                <span className="text-xs font-normal text-zinc-400">●</span>
              </h3>
            </div>
            
            <div className="space-y-2">
              {favoriteProducts.map(product => (
                <div key={product.id} className="flex items-center gap-4 p-2 rounded-lg bg-zinc-50 border border-zinc-100">
                  <img src={product.image} className="w-12 h-12 rounded object-cover" alt="" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold">{product.title}</h4>
                  </div>
                  <Heart className="w-4 h-4 text-orange-500 fill-current" />
                  <ChevronRight className="w-4 h-4 text-zinc-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Click History */}
          <div className={cn(
            "p-6 rounded-xl border bg-white shadow-sm",
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "border-zinc-200"
          )}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <History className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-bold">Click History</h3>
            </div>

            <div className="space-y-2">
              {recentClicks.map((click, i) => {
                const product = products.find(p => p.id === click.productId);
                return (
                  <div key={i} className="flex items-center gap-4 p-2 rounded-lg bg-zinc-50 border border-zinc-100">
                    <div className="flex-1">
                      <h4 className="text-xs font-bold">Order placed on <span className="text-orange-500">{click.platform}</span></h4>
                    </div>
                    <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                      <ShoppingCart className="w-3 h-3 text-white" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
