import { motion } from 'motion/react';
import { Search, PenTool, Code2, Globe } from 'lucide-react';

const steps = [
  {
    icon: <Search size={32} className="text-brand-blue" />,
    title: 'Consultation & Discovery',
    desc: 'We start with a deep dive into your business ecosystem. We identify your audience, your competitors, and the unique atmospheric value your brand provides.',
    details: [
      'Market Analysis',
      'User Personas',
      'Technical Audit',
      'Strategic Roadmap'
    ]
  },
  {
    icon: <PenTool size={32} className="text-brand-purple" />,
    title: 'Visionary Design',
    desc: 'Our architects craft high-fidelity digital prototypes. We focus on high-end aesthetics, smooth interactions, and a layout that tells your brand story effectively.',
    details: [
      'Interactive Prototypes',
      'Custom Pattern Library',
      'Motion Design Audit',
      'Collaborative Feedback'
    ]
  },
  {
    icon: <Code2 size={32} className="text-brand-violet" />,
    title: 'Expert Building',
    desc: 'Precision coding begins. We translate the designs into high-performance, responsive code using the latest frameworks and optimized infrastructure.',
    details: [
      'Next.js / React Build',
      'Lightning-fast Frontend',
      'API & SDK Integration',
      'Staging Environment'
    ]
  },
  {
    icon: <Globe size={32} className="text-brand-blue" />,
    title: 'Deployment & Mastery',
    desc: 'The final artifact is verified and launched to a global CDN. We don’t just deliver a site; we empower you to master it with training and priority support.',
    details: [
      'SEO Final Polish',
      'CDN Launch Protocol',
      'Mastery Training',
      'Priority Evolution Support'
    ]
  }
];

export default function HowItWorks() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-32 flex flex-col gap-6">
        <h1 className="text-5xl md:text-7xl font-display font-bold">The <span className="text-gradient">Architectural</span> Process</h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
          From vision to velocity. Our refined 4-stage protocol ensures every project 
          delivered meets our rigorous standards for digital excellence.
        </p>
      </div>

      <div className="relative flex flex-col gap-24">
        {/* Timeline Line (Desktop Only) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-32 relative z-10 ${
              i % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Step Icon Node */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-brand-bg border border-white/10 neon-glow-purple z-20">
              <span className="text-brand-purple font-display font-bold">{i + 1}</span>
            </div>

            {/* Step Content */}
            <div className="flex-1 w-full flex flex-col gap-8">
              <div className="glass-card p-10 flex flex-col gap-6">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 w-fit">
                  {step.icon}
                </div>
                <h2 className="text-3xl font-display font-bold">{step.title}</h2>
                <p className="text-white/40 leading-relaxed text-lg">
                  {step.desc}
                </p>
              </div>
            </div>

            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              {step.details.map((detail, j) => (
                <div key={j} className="glass-panel p-6 rounded-2xl flex items-center justify-center text-center text-sm font-bold uppercase tracking-widest text-white/30 border-white/5 hover:border-brand-purple/30 hover:text-white transition-all cursor-default">
                  {detail}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust & Guarantee Section */}
      <section className="mt-48 text-center px-6">
        <div className="max-w-4xl mx-auto glass-panel p-16 rounded-[3rem] border-white/5 bg-gradient-to-b from-transparent to-brand-blue/5">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-display font-bold">Absolute <span className="text-gradient">Transparency</span></h2>
            <p className="text-white/50 text-lg">
              No hidden fees, no black-box development. You have full access to our project management ecosystem throughout the entire build process.
            </p>
            <div className="pt-8 flex flex-wrap justify-center gap-12">
              <div className="flex flex-col items-center gap-2">
                <span className="text-brand-blue font-display font-bold text-3xl">24/7</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Dashboard Access</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-brand-purple font-display font-bold text-3xl">Weekly</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Status Updates</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-brand-violet font-display font-bold text-3xl">Direct</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Slack Channel</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
