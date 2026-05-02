import { motion } from 'motion/react';
import { ExternalLink, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'Nebula Vision',
    client: 'Starlight Ventures',
    category: 'Interactive AI',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2400&auto=format&fit=crop',
    description: 'A revolutionary data visualization platform for celestial research, featuring real-time AI processing and immersive 3D charting.'
  },
  {
    id: 2,
    title: 'Vanguard Luxury',
    client: 'Vanguard Estates',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop',
    description: 'An exclusive boutique real estate portal presenting ultra-luxury properties through cinematic storytelling and VR walkthroughs.'
  },
  {
    id: 3,
    title: 'Synchro Health',
    client: 'HealthSync Inc.',
    category: 'MedTech',
    image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=2400&auto=format&fit=crop',
    description: 'Next-generation patient management dashboard focusing on accessibility, security, and lightning-fast data retrieval.'
  },
  {
    id: 4,
    title: 'Atlas Logistics',
    client: 'Global Flow',
    category: 'Logistics',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2400&auto=format&fit=crop',
    description: 'Enterprise-grade supply chain monitoring system with complex routing algorithms and real-time fleet tracking.'
  }
];

export default function Portfolio() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col gap-6 mb-24 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-display font-bold">Selected <span className="text-gradient">Artifacts</span></h1>
        <p className="text-white/50 text-lg leading-relaxed">
          Explore our collection of high-impact digital experiences. We don't just build websites; 
          we build benchmarks for your industry.
        </p>
      </div>

      <div className="flex flex-col gap-32">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
          >
            {/* Project Image */}
            <div className="flex-1 w-full group relative">
              <div className="absolute inset-0 bg-brand-purple/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="glass-card p-1 rounded-[2rem] overflow-hidden relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover rounded-[1.8rem] aspect-[16/10] grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Project Info */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-brand-purple">
                  <Tag size={12} />
                  {project.category}
                </span>
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                  Client: {project.client}
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-display font-bold">{project.title}</h2>
              <p className="text-white/50 text-lg leading-relaxed">
                {project.description}
              </p>
              
              <div className="pt-4">
                <Link to="/pricing" className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white group w-fit">
                  Preview Experience
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                    <ExternalLink size={20} />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Builder */}
      <section className="mt-40 text-center flex flex-col gap-12">
        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-white/30">Trusted by Global Visionaries</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125">
          <span className="text-2xl font-display font-black tracking-tighter">APPLE</span>
          <span className="text-2xl font-display font-black tracking-tighter">REVOLUT</span>
          <span className="text-2xl font-display font-black tracking-tighter">STRIPE</span>
          <span className="text-2xl font-display font-black tracking-tighter">NASA</span>
          <span className="text-2xl font-display font-black tracking-tighter">TESLA</span>
        </div>
      </section>
    </div>
  );
}
