import { motion } from 'motion/react';
import { ExternalLink, ShoppingCart, Filter, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productService } from '../lib/firestoreService';

export default function Templates() {
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts().then(res => {
      setDbTemplates(res || []);
      setLoading(false);
    });
  }, []);

  const staticTemplates = [
    {
      id: 1,
      title: 'Aura Fintech',
      category: 'SaaS',
      image: 'https://images.unsplash.com/photo-1551288049-d8d21a24d864?q=80&w=2400&auto=format&fit=crop',
      description: 'Ultra-clean, data-centric interface for the next generation of finance.',
      price: '$499'
    },
    // ... other static templates
  ];

  const allTemplates = [...dbTemplates, ...staticTemplates.slice(0, 5)]; // Keep it clean

  if (loading) return <div className="h-screen flex items-center justify-center"><RefreshCw className="animate-spin text-brand-purple" size={48} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold">Premium <span className="text-gradient">Templates</span></h1>
          <p className="text-white/50 max-w-xl text-lg">Start your digital presence on a solid foundation. Customizable, high-performance base for your brand.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
          <Filter size={16} />
          Filter Categories
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allTemplates.map((template, i) => (
          <motion.div
            key={template.id || i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card group overflow-hidden flex flex-col"
          >
            {/* Preview Image */}
            <div className="aspect-[16/10] overflow-hidden relative">
              <img 
                src={template.image} 
                alt={template.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-bg/20 group-hover:bg-transparent transition-all duration-300" />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                {template.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow gap-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-display font-bold">{template.title}</h3>
                <span className="text-brand-purple font-display font-bold">{template.price}</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                {template.description || 'Premium architecture designed for high-performance conversion and futuristic aesthetics.'}
              </p>
              
              <div className="mt-auto grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider group/btn">
                  Live Demo
                  <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
                <Link to="/pricing" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-purple hover:bg-brand-violet transition-all text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-purple/20 text-white">
                  Buy & Sync
                  <ShoppingCart size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Request Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 p-12 glass-panel rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border-purple-500/20 bg-brand-purple/5"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-display font-bold">Need something bespoke?</h2>
          <p className="text-white/50">Our architects can build a completely unique experience from scratch.</p>
        </div>
        <Link to="/pricing" className="btn-primary min-w-[240px]">Connect with Architects</Link>
      </motion.div>
    </div>
  );
}
