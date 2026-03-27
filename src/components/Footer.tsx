import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <footer className={isDarkMode ? "bg-zinc-100 text-zinc-600 py-8" : "bg-zinc-100 text-zinc-600 py-8"}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Contact Us</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-zinc-200">
            <Mail className="w-4 h-4 text-zinc-400 ml-2" />
            <input 
              type="email" 
              placeholder="Subscribe to Newsletter" 
              className="bg-transparent border-none focus:ring-0 text-sm py-1"
            />
            <button className="bg-emerald-600 text-white px-4 py-1 rounded-md text-sm font-bold hover:bg-emerald-700 transition-all">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="text-zinc-400 hover:text-emerald-600 transition-colors"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="text-zinc-400 hover:text-emerald-600 transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="text-zinc-400 hover:text-emerald-600 transition-colors"><Instagram className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
}
