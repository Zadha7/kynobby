import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, recordClick, auth } from '../firebase';
import { Product, UserProfile } from '../types';
import { 
  Star, 
  Heart, 
  ExternalLink, 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Loader2,
  Share2
} from 'lucide-react';
import { cn, getSymbol } from '../lib/utils';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface ProductDetailsProps {
  isDarkMode: boolean;
  userProfile: UserProfile | null;
}

const PLATFORM_LOGOS: Record<string, string> = {
  'Amazon': 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128',
  'Daraz': 'https://www.google.com/s2/favicons?domain=daraz.pk&sz=128',
  'ClickBank': 'https://www.google.com/s2/favicons?domain=clickbank.com&sz=128',
  'Alibaba': 'https://www.google.com/s2/favicons?domain=alibaba.com&sz=128',
  'Hostinger': 'https://www.google.com/s2/favicons?domain=hostinger.com&sz=128',
  'Bluehost': 'https://www.google.com/s2/favicons?domain=bluehost.com&sz=128',
};

export default function ProductDetails({ isDarkMode, userProfile }: ProductDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          toast.error("Product not found");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, navigate]);

  const handleDealClick = async () => {
    if (!product) return;
    if (auth.currentUser) {
      await recordClick(auth.currentUser.uid, product.id, product.platform);
    }
    window.open(product.affiliateUrl, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!product) return null;

  const isFavorite = userProfile?.favorites.includes(product.id) || false;

  return (
    <div className={cn(
      "min-h-screen pt-20 pb-12",
      isDarkMode ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"
    )}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-zinc-500 hover:text-emerald-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Deals
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className={cn(
              "aspect-square rounded-3xl overflow-hidden border-4",
              isDarkMode ? "border-zinc-800 bg-zinc-900" : "border-white bg-white shadow-xl"
            )}>
              <img 
                src={product.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000'} 
                alt={product.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={cn(
                  "aspect-square rounded-xl border-2 overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors",
                  isDarkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-100 bg-white"
                )}>
                  <img 
                    src={product.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000'} 
                    alt={`${product.title} view ${i}`} 
                    className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.category}
              </div>
              <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full text-xs font-bold text-zinc-600">
                <img 
                  src={PLATFORM_LOGOS[product.platform]} 
                  alt={product.platform} 
                  className="w-4 h-4 object-contain" 
                  referrerPolicy="no-referrer"
                />
                {product.platform}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-5 h-5", 
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-zinc-300"
                    )} 
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-zinc-500">
                  ({product.rating} / 5.0)
                </span>
              </div>
              <div className="h-4 w-px bg-zinc-200" />
              <div className="text-sm font-medium text-emerald-600">
                Verified Deal
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-emerald-600">
                {getSymbol(product.currency)} {product.price.toLocaleString()}
              </span>
              {product.discount && (
                <>
                  <span className="text-xl text-zinc-400 line-through">
                    {getSymbol(product.currency)} {(product.price * (1 + product.discount/100)).toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    SAVE {product.discount}%
                  </span>
                </>
              )}
            </div>

            <p className={cn(
              "text-lg mb-8 leading-relaxed",
              isDarkMode ? "text-zinc-400" : "text-zinc-600"
            )}>
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                onClick={handleDealClick}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-6 h-6" />
                Get This Deal
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={handleShare}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all flex items-center justify-center",
                    isDarkMode ? "border-zinc-800 hover:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  <Share2 className="w-6 h-6" />
                </button>
                <button 
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all flex items-center justify-center flex-1",
                    isFavorite ? "bg-red-50 border-red-100 text-red-500" : isDarkMode ? "border-zinc-800 hover:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  <Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />
                  <span className="ml-2 font-bold">{isFavorite ? 'Saved' : 'Favorite'}</span>
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-zinc-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Secure Platform</h4>
                  <p className="text-xs text-zinc-500">Verified by {product.platform}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Fast Delivery</h4>
                  <p className="text-xs text-zinc-500">Global shipping available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Easy Returns</h4>
                  <p className="text-xs text-zinc-500">30-day money back</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
