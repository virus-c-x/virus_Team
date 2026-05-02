import { motion } from 'motion/react';
import { ExternalLink, ShoppingCart, Filter } from 'lucide-react';

const templates = [
  {
    id: 1,
    title: 'Aura Fintech',
    category: 'SaaS',
    image: 'https://images.unsplash.com/photo-1551288049-d8d21a24d864?q=80&w=2400&auto=format&fit=crop',
    description: 'Ultra-clean, data-centric interface for the next generation of finance.',
    price: '$499'
  },
  {
    id: 2,
    title: 'Ether Studio',
    category: 'Agency',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2400&auto=format&fit=crop',
    description: 'A brutalist, high-impact portfolio template for creative revolutionaries.',
    price: '$399'
  },
  {
    id: 3,
    title: 'Nexus Ecom',
    category: 'Store',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2400&auto=format&fit=crop',
    description: 'Highly modular e-commerce engine optimized for conversion speed.',
    price: '$599'
  },
  {
    id: 4,
    title: 'Nova AI',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2400&auto=format&fit=crop',
    description: 'Dynamic storytelling template designed for AI startups and research.',
    price: '$449'
  },
  {
    id: 5,
    title: 'Vibe Travel',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2400&auto=format&fit=crop',
    description: 'Immersive Concierge theme with smooth parallax and rich media galleries.',
    price: '$349'
  },
  {
    id: 6,
    title: 'Zen Health',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2400&auto=format&fit=crop',
    description: 'Soothing organic design for wellness brands and boutique studios.',
    price: '$299'
  }
];

export default function Templates() {
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
        {templates.map((template, i) => (
          <motion.div
            key={template.id}
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
                {template.description}
              </p>
              
              <div className="mt-auto grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider group/btn">
                  Live Demo
                  <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-purple hover:bg-brand-violet transition-all text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-purple/20">
                  Buy & Sync
                  <ShoppingCart size={14} />
                </button>
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
        className="mt-32 p-12 glass-panel rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border-brand-purple/20 bg-brand-purple/5"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-display font-bold">Need something bespoke?</h2>
          <p className="text-white/50">Our architects can build a completely unique experience from scratch.</p>
        </div>
        <button className="btn-primary">Connect with Architects</button>
      </motion.div>
    </div>
  );
}
