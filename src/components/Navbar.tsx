import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, ShoppingCart, Settings, Layout, Menu, X, Shield, LogOut, User, Heart } from 'lucide-react';
import { auth, signInWithGoogle, logOut, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';

export default function Navbar({ 
  isDarkMode, 
  toggleDarkMode,
  searchTerm,
  setSearchTerm
}: { 
  isDarkMode: boolean, 
  toggleDarkMode: () => void,
  searchTerm: string,
  setSearchTerm: (term: string) => void
}) {
  const [user, setUser] = useState(auth.currentUser);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log("Current User:", user?.email);
      if (user) {
        onSnapshot(doc(db, 'users', user.uid), (snap) => {
          if (snap.exists()) setUserProfile(snap.data() as UserProfile);
        });
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const isAdmin = user?.email?.toLowerCase().trim() === 'zadhaarif0@gmail.com';
  console.log("Is Admin:", isAdmin, "Email:", user?.email);

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300",
      isDarkMode ? "bg-zinc-950/90 border-zinc-800 text-white" : "bg-emerald-600/90 border-emerald-500 text-white"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">PASAND <span className="text-white/80">Deals</span></span>
          </Link>

          {/* Working Search Bar */}
          <div className="flex-1 max-w-md relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/60 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "block w-full pl-10 pr-10 py-2 border border-white/20 rounded-xl leading-5 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 focus:ring-0 sm:text-sm transition-all",
                isDarkMode ? "bg-white/5" : "bg-white/10"
              )}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>


          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-white/70 transition-colors">Home</Link>
            <Link to="/favorites" className="flex items-center gap-1.5 text-sm font-medium hover:text-white/70 transition-colors">
              <Heart className="w-4 h-4" />
              Favorites
            </Link>
            <a href="#categories" className="text-sm font-medium hover:text-white/70 transition-colors">Categories</a>
            <a href="#deals" className="text-sm font-medium hover:text-white/70 transition-colors">Deals</a>
            {isAdmin && (
              <Link to="/admin" className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                <Shield className="w-4 h-4" />
                Admin Panel
              </Link>
            )}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {userProfile ? (
              <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-bold">{userProfile.displayName}</p>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest font-black">{userProfile.role}</p>
                </div>
                <div className="relative group">
                  <img 
                    src={userProfile.photoURL} 
                    className="w-8 h-8 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all cursor-pointer" 
                    alt="" 
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-zinc-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <button 
                      onClick={() => logOut()}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-red-500 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => signInWithGoogle()}
                className="flex items-center gap-2 px-6 py-2 bg-white text-emerald-600 rounded-xl font-bold hover:bg-zinc-100 transition-all shadow-lg shadow-black/10"
              >
                <User className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={cn(
          "md:hidden border-t p-4 space-y-4",
          isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-emerald-700 border-emerald-600"
        )}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Home</Link>
          <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg font-medium">
            <Heart className="w-5 h-5" />
            Favorites
          </Link>
          <a href="#categories" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Categories</a>
          <a href="#deals" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Deals</a>
          {isAdmin && (
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold text-emerald-400">Admin Panel</Link>
          )}
          <div className="pt-4 border-t border-white/10">
            {userProfile ? (
              <button 
                onClick={() => { logOut(); setIsMenuOpen(false); }}
                className="flex items-center gap-2 text-lg font-medium text-red-300"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            ) : (
              <button 
                onClick={() => { signInWithGoogle(); setIsMenuOpen(false); }}
                className="flex items-center gap-2 text-lg font-medium"
              >
                <User className="w-5 h-5" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
