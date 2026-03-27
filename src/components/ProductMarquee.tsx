import { motion } from 'motion/react';

const productImages = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=300", // Laptop
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300", // Watch
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=300", // Phone
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300", // Headphones
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300", // Camera
  "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=300", // Tablet
  "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=300", // Speaker
  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=300", // Monitor
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=300", // Keyboard
  "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=300", // Mouse
];

export default function ProductMarquee({ isDarkMode }: { isDarkMode: boolean }) {
  // Duplicate the array to create a seamless loop
  const duplicatedImages = [...productImages, ...productImages];

  return (
    <div className={`py-12 overflow-hidden ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Featured Products Showcase
        </h2>
      </div>
      
      <div className="relative flex">
        {/* Gradient Masks */}
        <div className={`absolute inset-y-0 left-0 w-32 z-10 pointer-events-none ${isDarkMode ? 'bg-gradient-to-r from-zinc-950 to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`} />
        <div className={`absolute inset-y-0 right-0 w-32 z-10 pointer-events-none ${isDarkMode ? 'bg-gradient-to-l from-zinc-950 to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`} />
        
        <motion.div
          className="flex gap-6 px-4"
          whileHover={{ animationPlayState: 'paused' }}
          animate={{
            x: ["0%", "-50%"], 
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 ${
                isDarkMode ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-100 bg-zinc-50'
              } shadow-lg transition-transform hover:scale-105`}
            >
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
