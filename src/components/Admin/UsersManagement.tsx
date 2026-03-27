import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserProfile } from '../../types';
import { Search, Shield, User, Mail, Calendar, MoreVertical, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function UsersManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedRole, setSelectedRole] = useState('All');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const q = query(collection(db, 'users'), orderBy('displayName'));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => ({
        ...doc.data()
      })) as UserProfile[];
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (uid: string, currentRole: 'admin' | 'user') => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      try {
        await updateDoc(doc(db, 'users', uid), { role: newRole });
        fetchUsers();
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || u.role === selectedRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-2xl">
          <Filter className="w-4 h-4 text-zinc-400" />
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-transparent text-sm font-bold text-zinc-600 focus:outline-none cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admins</option>
            <option value="User">Users</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">User</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">Email</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">Role</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">Activity</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">Loading users...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">No users found.</td>
                </tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-zinc-50/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden flex-shrink-0">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-emerald-500/10 text-emerald-600 font-bold">
                            {user.displayName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 line-clamp-1">{user.displayName}</p>
                        <p className="text-xs text-zinc-500">ID: {user.uid.substring(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      user.role === 'admin' ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-100 text-zinc-500"
                    )}>
                      {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">{user.favorites?.length || 0} Favorites</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => toggleRole(user.uid, user.role)}
                        className="p-2 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-lg transition-all text-zinc-400"
                        title={user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-zinc-500/10 hover:text-zinc-900 rounded-lg transition-all text-zinc-400">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
