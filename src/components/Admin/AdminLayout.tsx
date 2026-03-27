import { ReactNode, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Settings, LogOut, Home, Search, X, User, ShoppingBag, ChevronRight, Loader2 } from 'lucide-react';
import { collection, query, getDocs, limit, where, or } from 'firebase/firestore';
import { db } from '../../firebase';
import { Product, UserProfile } from '../../types';
import { cn } from '../../lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ products: Product[], users: UserProfile[] }>({ products: [], users: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length > 1) {
        performSearch();
      } else {
        setSearchResults({ products: [], users: [] });
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const performSearch = async () => {
    setIsSearching(true);
    setShowResults(true);
    try {
      // Search Products
      const productsQuery = query(
        collection(db, 'products'),
        limit(5)
      );
      const productsSnap = await getDocs(productsQuery);
      const allProducts = productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      const filteredProducts = allProducts.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Search Users
      const usersQuery = query(
        collection(db, 'users'),
        limit(5)
      );
      const usersSnap = await getDocs(usersQuery);
      const allUsers = usersSnap.docs.map(doc => ({ ...doc.data() })) as UserProfile[];
      const filteredUsers = allUsers.filter(u => 
        u.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults({
        products: filteredProducts,
        users: filteredUsers
      });
    } catch (error) {
      console.error("Global search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-zinc-400 flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-white font-black text-xl tracking-tighter">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-zinc-900">P</div>
            PASAND <span className="text-emerald-500">ADMIN</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "hover:bg-zinc-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 hover:text-white transition-all font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Site
          </Link>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all font-medium text-left"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-8 flex-1">
            <h1 className="font-bold text-zinc-900 whitespace-nowrap">
              {navItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
            </h1>

            {/* Global Search Bar */}
            <div className="relative flex-1 max-w-md hidden md:block" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search products or users..."
                  className="w-full pl-10 pr-10 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.trim().length > 1 && setShowResults(true)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-200 rounded-full transition-all"
                  >
                    <X className="w-3 h-3 text-zinc-400" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                  {isSearching ? (
                    <div className="p-8 text-center">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald-500 mx-auto mb-2" />
                      <p className="text-xs text-zinc-500">Searching...</p>
                    </div>
                  ) : searchResults.products.length === 0 && searchResults.users.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500">
                      <p className="text-sm font-medium">No results found</p>
                      <p className="text-xs">Try searching for something else</p>
                    </div>
                  ) : (
                    <div className="py-2">
                      {searchResults.products.length > 0 && (
                        <div>
                          <div className="px-4 py-2 bg-zinc-50 text-[10px] font-black uppercase tracking-widest text-zinc-400 border-y border-zinc-100">
                            Products
                          </div>
                          {searchResults.products.map(product => (
                            <button
                              key={product.id}
                              onClick={() => {
                                navigate('/admin/products');
                                setShowResults(false);
                                setSearchTerm('');
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-all text-left group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0">
                                <img src={product.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-zinc-900 truncate">{product.title}</p>
                                <p className="text-xs text-zinc-500 truncate">{product.category}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-all" />
                            </button>
                          ))}
                        </div>
                      )}

                      {searchResults.users.length > 0 && (
                        <div>
                          <div className="px-4 py-2 bg-zinc-50 text-[10px] font-black uppercase tracking-widest text-zinc-400 border-y border-zinc-100">
                            Users
                          </div>
                          {searchResults.users.map(user => (
                            <button
                              key={user.uid}
                              onClick={() => {
                                navigate('/admin/users');
                                setShowResults(false);
                                setSearchTerm('');
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-all text-left group"
                            >
                              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold text-xs flex-shrink-0">
                                {user.photoURL ? (
                                  <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                  user.displayName.charAt(0)
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-zinc-900 truncate">{user.displayName}</p>
                                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-all" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-zinc-900">Admin User</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-black">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
