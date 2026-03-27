import { Check, ChevronRight, ShoppingCart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { cn, getSymbol } from '../lib/utils';

export default function FeaturedProduct({ product, isDarkMode }: { product: Product, isDarkMode: boolean }) {
  const getLogo = (platform: string) => {
    const domain = platform.toLowerCase().includes('daraz') ? 'daraz.pk' : 
                   platform.toLowerCase().includes('clickbank') ? 'clickbank.com' :
                   platform.toLowerCase().includes('alibaba') ? 'alibaba.com' :
                   platform.toLowerCase().includes('bluehost') ? 'bluehost.com' :
                   platform.toLowerCase().includes('hostinger') ? 'hostinger.com' :
                   'amazon.com';
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  const handleBuy = () => {
    window.open(product.affiliateUrl, '_blank');
  };

  return (
    <section className="py-12 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Product Details</h2>
        
        <div className={cn(
          "rounded-xl overflow-hidden border bg-white shadow-sm flex flex-col lg:flex-row",
          isDarkMode ? "bg-zinc-900 border-zinc-800" : "border-zinc-200"
        )}>
          {/* Left Side: Image & Features */}
          <div className="lg:w-2/3 p-8 flex flex-col md:flex-row gap-8 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
              <p className="text-3xl font-black text-white mb-6">
                {getSymbol(product.currency)} {product.price.toLocaleString()}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-bold">Features</span>
                </div>
                <ul className="space-y-2 text-xs text-emerald-100">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1">▶</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
              <img 
                src={product.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000'} 
                className="w-full max-w-[300px] h-auto rounded-xl shadow-2xl rotate-3" 
                alt={product.title} 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000';
                }}
              />
            </div>
          </div>

          {/* Right Side: Buy Buttons */}
          <div className="lg:w-1/3 p-8 flex flex-col gap-3 justify-center">
            <Link 
              to={`/product/${product.id}`}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg font-bold transition-all border-2",
                isDarkMode ? "border-zinc-700 hover:bg-zinc-800 text-white" : "border-zinc-200 hover:bg-zinc-50 text-zinc-900"
              )}
            >
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-500" />
                View Full Details
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>

            {product.platform === 'Amazon' && (
              <button 
                onClick={handleBuy}
                className="flex items-center justify-between bg-orange-400 hover:bg-orange-500 text-white px-4 py-3 rounded-lg font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <img src={getLogo('Amazon')} className="w-5 h-5 rounded-sm bg-white p-0.5" alt="" referrerPolicy="no-referrer" />
                  Buy on Amazon
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {product.platform === 'Daraz' && (
              <button 
                onClick={handleBuy}
                className="flex items-center justify-between bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <img src={getLogo('Daraz')} className="w-5 h-5 rounded-sm bg-white p-0.5" alt="" referrerPolicy="no-referrer" />
                  Buy Daraz
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {product.platform === 'ClickBank' && (
              <button 
                onClick={handleBuy}
                className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-900 text-white px-4 py-3 rounded-lg font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <img src={getLogo('ClickBank')} className="w-5 h-5 rounded-sm bg-white p-0.5" alt="" referrerPolicy="no-referrer" />
                  Get Deal on ClickBank
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {product.platform === 'Alibaba' && (
              <button 
                onClick={handleBuy}
                className="flex items-center justify-between bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <img src={getLogo('Alibaba')} className="w-5 h-5 rounded-sm bg-white p-0.5" alt="" referrerPolicy="no-referrer" />
                  Order from Alibaba
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {product.platform === 'Hostinger' && (
              <button 
                onClick={handleBuy}
                className="w-full flex items-center justify-between bg-zinc-800 hover:bg-zinc-900 text-white px-4 py-3 rounded-lg font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <img src={getLogo('Hostinger')} className="w-5 h-5 rounded-sm bg-white p-0.5" alt="" referrerPolicy="no-referrer" />
                  Start Hosting
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {product.platform === 'Bluehost' && (
              <button 
                onClick={handleBuy}
                className="w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <img src={getLogo('Bluehost')} className="w-5 h-5 rounded-sm bg-white p-0.5" alt="" referrerPolicy="no-referrer" />
                  Bluehost
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
