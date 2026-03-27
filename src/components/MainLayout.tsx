import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '../lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function MainLayout({ children, isDarkMode, toggleDarkMode, searchTerm, setSearchTerm }: MainLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 font-sans flex flex-col",
      isDarkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"
    )}>
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
