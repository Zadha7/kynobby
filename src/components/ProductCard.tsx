import { Star, Heart, ExternalLink, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { cn, getSymbol } from '../lib/utils';
import { toggleFavorite, recordClick, auth } from '../firebase';
import { useState } from 'react';

const PLATFORM_LOGOS: Record<string, string> = {
  'Amazon': 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128',
  'Daraz': 'https://www.google.com/s2/favicons?domain=daraz.pk&sz=128',
  'ClickBank': 'https://www.google.com/s2/favicons?domain=clickbank.com&sz=128',
  'Alibaba': 'https://www.google.com/s2/favicons?domain=alibaba.com&sz=128',
  'Hostinger': 'https://www.google.com/s2/favicons?domain=hostinger.com&sz=128',
  'Bluehost': 'https://www.google.com/s2/favicons?domain=bluehost.com&sz=128',
};

export default function ProductCard({ 
  product, 
  isDarkMode, 
  isFavorite,
  onToggleFavorite 
}: { 
  product: Product, 
  isDarkMode: boolean, 
  isFavorite: boolean,
  onToggleFavorite: () => void
}) {
  const [loading, setLoading] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!auth.currentUser) return alert("Please sign in to favorite deals!");
    
    setLoading(true);
    await toggleFavorite(auth.currentUser.uid, product.id, isFavorite);
    onToggleFavorite();
    setLoading(false);
  };

  const handleDealClick = async () => {
    if (auth.currentUser) {
      await recordClick(auth.currentUser.uid, product.id, product.platform);
    }
    window.open(product.affiliateUrl, '_blank');
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl",
        isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
      )}
    >
      <Link to={`/product/${product.id}`}>
        {/* Platform Badge */}
        <div className="absolute top-2 right-2 z-10 bg-white p-1 rounded shadow-sm">
          <img 
            src={PLATFORM_LOGOS[product.platform]} 
            alt={product.platform} 
            className="w-4 h-4 object-contain" 
            referrerPolicy="no-referrer" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${product.platform.toLowerCase()}.com&sz=64`;
            }}
          />
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute bottom-2 right-2 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-zinc-100">
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000'} 
            alt={product.title} 
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-sm mb-1 line-clamp-1">{product.title}</h3>
          
          <div className="flex items-center justify-between mb-2">
            <div className="text-emerald-600 font-bold text-sm">
              {getSymbol(product.currency)} {product.price.toLocaleString()}
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-zinc-300")} />
              ))}
            </div>
          </div>

          <div className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-bold text-xs transition-all text-center">
            View Details
          </div>
        </div>
      </Link>

      {/* Favorite Button - Outside Link to avoid navigation */}
      <button 
        onClick={handleFavorite}
        disabled={loading}
        className={cn(
          "absolute top-2 left-2 z-10 p-2 rounded-full shadow-sm transition-all",
          isFavorite ? "bg-red-50 text-red-500" : "bg-white/80 text-zinc-400 hover:text-red-500 backdrop-blur-sm"
        )}
      >
        <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
      </button>
    </motion.div>
  );
}
