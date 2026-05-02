import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Rocket, Shield, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundParticles from '../components/BackgroundParticles';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 md:pt-32">
        <BackgroundParticles />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16 relative z-10">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-[10px] font-bold uppercase tracking-wider w-fit"
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              NOW ACCEPTING Q4 PROJECTS
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-display font-extrabold leading-[1.05] tracking-tight"
            >
              Crafting the <br/>
              <span className="text-gradient">Digital Future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-400 max-w-md leading-relaxed"
            >
              High-end bespoke websites for visionary brands. We combine futuristic design with cutting-edge tech to create immersive digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/portfolio" className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">
                View Work 
              </Link>
              <Link to="/templates" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-center">
                Explore Templates
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, xl: 100 }}
            animate={{ opacity: 1, xl: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-card p-6 aspect-[4/3] relative z-20 overflow-hidden transform rotate-2 animate-float">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1.5 text-white underline underline-offset-1">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="h-4 w-32 bg-white/10 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-32 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-2xl border border-white/5"></div>
                <div className="h-32 bg-white/5 rounded-2xl border border-white/5"></div>
                <div className="h-20 bg-white/5 rounded-2xl border border-white/5"></div>
                <div className="col-span-2 h-20 bg-gradient-to-tr from-blue-600/20 to-purple-500/20 rounded-2xl border border-white/5"></div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="h-2 w-1/2 bg-purple-300/30 rounded-full mb-3"></div>
                <div className="h-2 w-full bg-white/5 rounded-full mb-2"></div>
                <div className="h-2 w-3/4 bg-white/5 rounded-full"></div>
              </div>
            </div>
            
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[80px] rounded-full z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/30 blur-[60px] z-0" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto glass-panel p-12 rounded-[2rem] grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Happy Clients', value: '150+' },
            { label: 'Projects Done', value: '420+' },
            { label: 'Team Experts', value: '12' },
            { label: 'CSAT Score', value: '99%' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left flex flex-col gap-1"
            >
              <span className="text-3xl md:text-4xl font-display font-bold text-white">{stat.value}</span>
              <span className="text-sm text-white/40 uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold">Engineered for <span className="text-gradient">Performance</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto">Our development process focuses on three core pillars: aesthetic excellence, lightning speed, and absolute reliability.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Palette className="text-brand-purple" />, title: 'Visionary Design', desc: 'Bespoke interfaces designed to set industry standards and capture eyes.' },
              { icon: <Rocket className="text-brand-blue" />, title: 'Lightning Speed', desc: 'Optimized for Core Web Vitals to ensure sub-second loading experiences.' },
              { icon: <Shield className="text-brand-violet" />, title: 'Enterprise Security', desc: 'Hardened codebases and hosting for peace of mind and data integrity.' }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                className="glass-card p-10 flex flex-col gap-6 group hover:-translate-y-2"
              >
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 w-fit group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-display font-bold">{benefit.title}</h3>
                <p className="text-white/40 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Simplified for Home */}
      <section className="px-6 bg-white/[0.01] py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold">Your journey to <span className="text-gradient">digital mastery.</span></h2>
              <div className="flex flex-col gap-10">
                {[
                  { step: '01', title: 'Consultation', desc: 'We dive deep into your brand vision and business goals.' },
                  { step: '02', title: 'Blueprint', desc: 'Architecture and high-fidelity prototypes of your experience.' },
                  { step: '03', title: 'Building', desc: 'Our experts translate the vision into high-performance code.' }
                ].map((step, i) => (
                  <motion.div key={i} {...fadeIn} className="flex gap-6">
                    <span className="text-3xl font-display font-bold text-brand-purple/30">{step.step}</span>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                      <p className="text-white/40 text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/how-it-works" className="btn-secondary w-fit">Learn Full Process</Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 mt-12">
                <div className="glass-card aspect-square animate-float p-1 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1551288049-bbbda5366a7a?q=80&w=2400&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="glass-card aspect-[4/5] p-1 overflow-hidden neon-glow-purple">
                  <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2400&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl text-white underline underline-offset-1" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="glass-card aspect-[4/5] p-1 overflow-hidden neon-glow-blue">
                   <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2400&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="glass-card aspect-square p-1 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2400&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6">
        <motion.div 
          {...fadeIn}
          className="max-w-5xl mx-auto rounded-[3rem] p-16 md:p-24 relative overflow-hidden text-center flex flex-col items-center gap-8 bg-gradient-to-br from-brand-blue to-brand-violet"
        >
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight z-10">Ready to build the future?</h2>
          <p className="text-white/80 max-w-xl text-lg z-10">Limited availability for exclusive projects. Secured your spot today for a Q3 launch.</p>
          <div className="flex gap-4 z-10">
            <Link to="/pricing" className="bg-white text-brand-bg px-10 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all">Start Your Project</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
