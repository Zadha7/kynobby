import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { generateImage } from '../services/gemini';

const partners = [
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Daraz', domain: 'daraz.pk' },
  { name: 'ClickBank', domain: 'clickbank.com' },
  { name: 'Alibaba', domain: 'alibaba.com' },
  { name: 'Hostinger', domain: 'hostinger.com' },
  { name: 'Bluehost', domain: 'bluehost.com' },
];

export default function Partners({ isDarkMode }: { isDarkMode: boolean }) {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadBanner() {
      try {
        const url = await generateImage("A professional, high-resolution banner showing a grid of modern tech company logos for an affiliate marketing website, clean and minimalist style, white background, high quality, 4k", "16:9");
        if (url) {
          setBannerUrl(url);
        } else {
          // Fallback to a static high-quality placeholder if AI generation fails (e.g., quota)
          setBannerUrl("https://picsum.photos/seed/partners/1920/1080?blur=2");
        }
      } catch (error) {
        setBannerUrl("https://picsum.photos/seed/partners/1920/1080?blur=2");
      }
    }
    loadBanner();
  }, []);

  return (
    <section className={cn("py-16", isDarkMode ? "bg-zinc-950" : "bg-zinc-50")}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={cn("h-[1px] flex-1", isDarkMode ? "bg-zinc-800" : "bg-zinc-200")} />
          <h2 className={cn("text-sm font-black uppercase tracking-[0.3em] whitespace-nowrap", isDarkMode ? "text-emerald-500" : "text-emerald-600")}>
            Our Trusted Partners
          </h2>
          <div className={cn("h-[1px] flex-1", isDarkMode ? "bg-zinc-800" : "bg-zinc-200")} />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 mb-16">
          {partners.map((partner) => (
            <motion.div 
              key={partner.name}
              whileHover={{ y: -5, scale: 1.05 }}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
              )}
            >
              <div className="w-full aspect-video flex items-center justify-center bg-white rounded-xl p-3 shadow-inner mb-4 overflow-hidden">
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`} 
                  alt={partner.name} 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/${partner.name}/200/100`;
                  }}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className={cn("text-xs font-bold uppercase tracking-widest", isDarkMode ? "text-zinc-500" : "text-zinc-400")}>
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        {bannerUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden border border-zinc-200/50 shadow-2xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 mix-blend-overlay z-10" />
            <img 
              src={bannerUrl} 
              alt="Partnership Banner" 
              className="w-full h-[250px] object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-8 z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Verified Network</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                Global Affiliate Network
              </h3>
              <p className="text-zinc-300 max-w-2xl mx-auto text-xs md:text-sm font-medium leading-relaxed">
                We've integrated with the world's most trusted platforms to ensure you always get the most accurate prices and genuine deals.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
