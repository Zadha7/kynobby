import { useState, useEffect } from 'react';
import { Key, Shield, Globe, Bell, Save, AlertCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <div className="max-w-4xl space-y-8">
      {/* Site Configuration */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Site Configuration</h3>
            <p className="text-sm text-zinc-500">General website settings and metadata.</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Site Name</label>
              <input type="text" defaultValue="PASAND Deals" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Support Email</label>
              <input type="email" defaultValue="support@pasand.com" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Security & Access</h3>
            <p className="text-sm text-zinc-500">Manage administrative access and permissions.</p>
          </div>
        </div>
        
        <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
          <h4 className="font-bold text-zinc-900 mb-2">Restricted Access</h4>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Administrative access is strictly limited to the primary owner's email address (<span className="font-bold text-emerald-600">zadhaarif0@gmail.com</span>). Role-based access for other users is currently disabled.
          </p>
        </div>
      </section>

      <div className="flex justify-end">
        <button 
          onClick={() => {
            setIsSaving(true);
            setTimeout(() => setIsSaving(false), 1000);
          }}
          className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
          {!isSaving && <Save className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
