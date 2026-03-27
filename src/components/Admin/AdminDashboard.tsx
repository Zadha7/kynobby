import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight, Sparkles, AlertTriangle, CheckCircle2, Key, MousePointer2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserProfile, Product } from '../../types';
import { cn } from '../../lib/utils';

const stats = [
  { label: 'Total Sales', value: '$124,592', change: '+12.5%', icon: DollarSign, color: 'emerald' },
  { label: 'Active Users', value: '12,459', change: '+5.2%', icon: Users, color: 'blue' },
  { label: 'Total Orders', value: '45,291', change: '-2.1%', icon: ShoppingCart, color: 'orange' },
  { label: 'Conversion Rate', value: '3.24%', change: '+0.8%', icon: TrendingUp, color: 'purple' },
];

export default function AdminDashboard() {
  const [recentClicks, setRecentClicks] = useState<{ user: UserProfile, click: any, product?: Product }[]>([]);
  const [loadingClicks, setLoadingClicks] = useState(true);

  useEffect(() => {
    fetchRecentClicks();
  }, []);

  const fetchRecentClicks = async () => {
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      const productsSnap = await getDocs(collection(db, 'products'));
      const productsMap = new Map(productsSnap.docs.map(doc => [doc.id, { id: doc.id, ...doc.data() } as Product]));
      
      const allClicks: { user: UserProfile, click: any, product?: Product }[] = [];
      
      usersSnap.docs.forEach(doc => {
        const user = doc.data() as UserProfile;
        if (user.clickHistory) {
          user.clickHistory.forEach(click => {
            allClicks.push({
              user,
              click,
              product: productsMap.get(click.productId)
            });
          });
        }
      });

      // Sort by timestamp descending
      allClicks.sort((a, b) => new Date(b.click.timestamp).getTime() - new Date(a.click.timestamp).getTime());
      setRecentClicks(allClicks.slice(0, 5));
    } catch (error) {
      console.error("Error fetching recent clicks:", error);
    } finally {
      setLoadingClicks(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                stat.color === 'emerald' ? "bg-emerald-500/10 text-emerald-500" :
                stat.color === 'blue' ? "bg-blue-500/10 text-blue-500" :
                stat.color === 'orange' ? "bg-orange-500/10 text-orange-500" :
                "bg-purple-500/10 text-purple-500"
              )}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.change.startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
              )}>
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-sm font-medium text-zinc-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Charts Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Recent Affiliate Clicks</h3>
            <button className="text-sm font-bold text-emerald-500 hover:text-emerald-600 transition-all">View All</button>
          </div>
          <div className="space-y-4">
            {loadingClicks ? (
              <div className="p-8 text-center text-zinc-500">Loading activity...</div>
            ) : recentClicks.length === 0 ? (
              <div className="p-8 text-center text-zinc-500">No recent activity.</div>
            ) : recentClicks.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden flex-shrink-0">
                    {item.user.photoURL ? (
                      <img src={item.user.photoURL} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-500/10 text-emerald-600 font-bold">
                        {item.user.displayName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{item.user.displayName}</p>
                    <p className="text-xs text-zinc-500 truncate max-w-[200px]">
                      Clicked on <span className="font-bold">{item.product?.title || 'Unknown Product'}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs mb-1">
                    <MousePointer2 className="w-3 h-3" />
                    {item.click.platform}
                  </div>
                  <p className="text-[10px] text-zinc-400">
                    {new Date(item.click.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
            <TrendingUp className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">Analytics Overview</h3>
          <p className="text-zinc-500 text-sm max-w-xs mb-8">
            Detailed analytics and charts will be integrated here as the platform grows.
          </p>
          <button className="bg-zinc-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-zinc-800 transition-all">
            Configure Reports
          </button>
        </div>
      </div>
    </div>
  );
}
