import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { generateImage } from '../services/gemini';

export default function Hero({ isDarkMode }: { isDarkMode: boolean }) {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadHero() {
      const url = await generateImage("A high-resolution, professional 3D showcase of a modern laptop, luxury watch, and latest smartphone with floating UI elements, vibrant emerald green and white theme, clean minimalist background, 4k, cinematic lighting", "16:9");
      if (url) setHeroImageUrl(url);
    }
    loadHero();
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-emerald-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#ffffff_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#ffffff_0%,transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>Premium Deals Platform</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
              Find the Best Deals You Love
            </h1>
            
            <p className="text-emerald-50 text-xl mb-8">
              Save Big with Top Affiliate Offers!
            </p>

            <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all shadow-lg border border-emerald-400/50 flex items-center gap-2">
              Explore Deals
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 lg:order-2"
          >
            <div className="relative z-10">
              <img 
                src={heroImageUrl || "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000"} 
                alt="Product Showcase" 
                className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
              {/* Floating elements */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 backdrop-blur-md rounded-full border border-white/20" />
              <div className="absolute -left-4 top-1/2 w-12 h-12 bg-emerald-400 rounded-full blur-xl opacity-50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
