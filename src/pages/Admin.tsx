import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Check, 
  Clock, 
  Activity,
  Plus,
  Trash2,
  RefreshCw,
  Edit2
} from 'lucide-react';
import { orderService, productService, siteService } from '../lib/firestoreService';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any>({
    heroTitle: 'High-End Digital Experiences.',
    heroSubtitle: 'We craft premium, futuristic websites that captivate, convert, and command attention. Elevate your brand with visionary design.'
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        fetchData();
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [o, p, c] = await Promise.all([
        orderService.getOrders(),
        productService.getProducts(),
        siteService.getContent()
      ]);
      setOrders(o || []);
      setProducts(p || []);
      if (c) setSiteContent(c);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    await orderService.updateOrderStatus(id, status);
    fetchData();
  };

  const handleUpdateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    await siteService.updateContent(siteContent);
    alert('Site content updated!');
  };

  const handleBootstrap = async () => {
    await siteService.updateContent({
      heroTitle: 'Crafting the Digital Future.',
      heroSubtitle: 'High-end bespoke websites for visionary brands. We combine futuristic design with cutting-edge tech to create immersive digital experiences.'
    });
    alert('System Initialized!');
    fetchData();
  };

  if (loading && !user) return <div className="h-screen flex items-center justify-center"><RefreshCw className="animate-spin text-brand-purple" size={48} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <div className="md:w-64 flex flex-col gap-8">
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold">N</div>
             <span className="font-display font-bold">Command Center</span>
          </div>
          
          <div className="flex flex-col gap-2">
            {[
              { id: 'orders', icon: <ShoppingCart size={18} />, label: 'Manage Orders' },
              { id: 'products', icon: <Package size={18} />, label: 'CMS: Templates' },
              { id: 'site', icon: <Settings size={18} />, label: 'Site Config' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => signOut(auth)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all mt-auto"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Decommission System</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === 'orders' && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-display font-bold">Recent Acquisitions</h2>
            <div className="grid gap-4">
              {orders.map(order => (
                <div key={order.id} className="glass-card p-6 flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 mb-1">
                       <span className="text-lg font-bold">{order.fullName}</span>
                       <span className={`px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                         order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                         order.status === 'in progress' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'
                       }`}>
                         {order.status}
                       </span>
                    </div>
                    <p className="text-white/40 text-sm">{order.email} • {order.phone}</p>
                    <p className="text-white/40 text-xs mt-2 italic px-3 py-2 bg-white/5 rounded-lg border border-white/5">"{order.message}"</p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-[10px] uppercase font-bold tracking-widest text-white/30">
                       <span>Budget: <span className="text-white">{order.budget}</span></span>
                       <span>Location: <span className="text-white">{order.city}</span></span>
                       <span>Project: <span className="text-white">{order.projectName}</span></span>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 justify-end">
                    <button onClick={() => handleStatusUpdate(order.id, 'done')} className="p-3 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all"><Check size={18} /></button>
                    <button onClick={() => handleStatusUpdate(order.id, 'in progress')} className="p-3 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all"><Activity size={18} /></button>
                    <button onClick={() => handleStatusUpdate(order.id, 'pending')} className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-all"><Clock size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'site' && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-display font-bold">Digital Presence Controller</h2>
            <form onSubmit={handleUpdateContent} className="glass-card p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Content Editor</h3>
                  <p className="text-white/40 text-sm">Control the primary narrative of your homepage.</p>
                </div>
                <button 
                  type="button" 
                  onClick={handleBootstrap}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-all"
                >
                  Force Initialize System
                </button>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Hero Directive (Title)</label>
                <input 
                  type="text" 
                  value={siteContent.heroTitle}
                  onChange={e => setSiteContent({...siteContent, heroTitle: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-xl font-display font-bold focus:border-brand-purple outline-none" 
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Hero Narrative (Subtitle)</label>
                <textarea 
                  rows={4}
                  value={siteContent.heroSubtitle}
                  onChange={e => setSiteContent({...siteContent, heroSubtitle: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white/60 focus:border-brand-purple outline-none leading-relaxed" 
                />
              </div>
              <button type="submit" className="btn-primary w-fit px-12">Commit Changes</button>
            </form>
          </div>
        )}

        {activeTab === 'products' && (
           <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                 <h2 className="text-3xl font-display font-bold">Template Catalog</h2>
                 <button className="btn-secondary !px-6 !py-2 text-sm"><Plus size={16} /> New Artifact</button>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                 {products.map(p => (
                   <div key={p.id} className="glass-card overflow-hidden group">
                      <div className="aspect-video bg-white/5 relative">
                         <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="p-6 flex justify-between items-center">
                         <div>
                            <h4 className="font-bold">{p.title}</h4>
                            <span className="text-xs text-white/40 uppercase tracking-widest">{p.category} • {p.price}</span>
                         </div>
                         <div className="flex gap-2">
                            <button className="p-2 text-white/30 hover:text-white transition-all"><Edit2 size={16} /></button>
                            <button onClick={() => productService.deleteProduct(p.id)} className="p-2 text-red-500/50 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                         </div>
                      </div>
                   </div>
                 ))}
                 {products.length === 0 && <p className="text-white/20 italic col-span-2 text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">No templates deployed to catalog yet.</p>}
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
