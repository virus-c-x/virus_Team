import { motion } from 'motion/react';
import { Check, Zap, Rocket, Star, Info, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { orderService } from '../lib/firestoreService';

const plans = [
  {
    name: 'Essence',
    icon: <Zap size={24} className="text-brand-blue" />,
    price: '$2,499',
    tagline: 'Best for startups looking to launch fast.',
    features: [
      'Custom 5-page Response Site',
      'Visionary UI/UX Design',
      'Advanced Animations',
      'SEO Fundamental Setup',
      '1 Month Support',
      '3 Revision Rounds'
    ],
    recommended: false
  },
  {
    name: 'Ascent',
    icon: <Rocket size={24} className="text-brand-purple" />,
    price: '$5,999',
    tagline: 'The ultimate digital experience for growing brands.',
    features: [
      'Up to 15 Premium Pages',
      'Full Brand Identity Design',
      'Interactive 3D Elements',
      'High-Performance Backend',
      'Advanced SEO Strategy',
      '3 Months Support',
      'Unlimited Revisions'
    ],
    recommended: true
  },
  {
    name: 'Apex',
    icon: <Star size={24} className="text-brand-violet" />,
    price: 'Custom',
    tagline: 'Tailored solutions for enterprise benchmarks.',
    features: [
      'Unlimited Custom Pages',
      'Bespoke Interactive Systems',
      'Enterprise Infrastructure',
      'Dedicated Architect',
      'Global CDN & Analytics',
      '1 Year Priority Support',
      'Bi-weekly Strategy Calls'
    ],
    recommended: false
  }
];

export default function Pricing() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectName: '',
    projectDescription: '',
    budget: '',
    age: '',
    city: '',
    message: ''
  });

  const handleOrder = (planName: string) => {
    setSelectedPlan(planName);
    setShowOrderForm(true);
    setIsSuccess(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await orderService.createOrder({
        ...formData,
        plan: selectedPlan
      });
      setIsSuccess(true);
      setTimeout(() => {
        setShowOrderForm(false);
        setIsSuccess(false);
        setFormData({
          fullName: '', email: '', phone: '', projectName: '',
          projectDescription: '', budget: '', age: '', city: '', message: ''
        });
      }, 5000);
    } catch (err) {
      console.error(err);
      alert('Transmission failed. Re-initiating protocol.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-24 flex flex-col gap-6">
        <h1 className="text-5xl md:text-7xl font-display font-bold">Invest in <span className="text-gradient">Excellence</span></h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
          Transparent pricing for visionary results. Choose the plan that aligns with your ambition and let's craft something remarkable.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-10 flex flex-col gap-8 relative overflow-hidden ${
              plan.recommended ? 'border-brand-purple/50 bg-brand-purple/5 neon-glow-purple scale-105 z-10' : ''
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-brand-purple px-6 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-widest">
                Recommended
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 w-fit">
                {plan.icon}
              </div>
              <h3 className="text-3xl font-display font-bold">{plan.name}</h3>
              <p className="text-white/40 text-sm">{plan.tagline}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-display font-bold">{plan.price}</span>
              {plan.price !== 'Custom' && <span className="text-white/30 text-sm">/ project</span>}
            </div>

            <div className="flex flex-col gap-4 flex-grow">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex gap-3 items-center text-sm text-white/70">
                  <div className="w-5 h-5 rounded-full bg-brand-purple/20 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-brand-purple" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleOrder(plan.name)}
              className={`${
                plan.recommended ? 'btn-primary' : 'btn-secondary'
              } w-full`}
            >
              Order {plan.name}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Order Modal / Overlay */}
      {showOrderForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md"
            onClick={() => setShowOrderForm(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel p-10 rounded-[2.5rem] max-w-xl w-full relative z-10 neon-glow-purple border-brand-purple/30"
          >
            {isSuccess ? (
              <div className="py-20 flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                  <Check size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold">Transmission Received</h3>
                <p className="text-white/50">Our architects have received your request. Expect a frequency match within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-display font-bold mb-2">Initialize Project</h3>
                <p className="text-white/50 mb-8 flex items-center gap-2 text-sm italic">
                  <Info size={14} className="text-brand-purple" />
                  You've selected the <span className="text-brand-purple font-bold uppercase tracking-widest">{selectedPlan}</span> plan.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-all" 
                        placeholder="John Wick" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Work Email</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-all" 
                        placeholder="john@continental.com" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Phone Vector</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-all" 
                        placeholder="+1 (234) 567-890" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Project Identifier</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.projectName}
                        onChange={e => setFormData({...formData, projectName: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-all" 
                        placeholder="Project Neon" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-white/40">Budget</label>
                       <input required type="text" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none" placeholder="$5k" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-white/40">Age</label>
                       <input required type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none" placeholder="25" />
                    </div>
                    <div className="col-span-2 space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-white/40">City/Zone</label>
                       <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none" placeholder="New York" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Brief Notes / Context</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-all h-24" 
                      placeholder="Tell us about your digital dream..."
                    ></textarea>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button type="submit" disabled={loading} className="btn-primary flex-grow">
                      {loading ? <Loader2 className="animate-spin" /> : 'Transmit Request'}
                    </button>
                    <button type="button" onClick={() => setShowOrderForm(false)} className="px-8 py-3 rounded-xl font-medium border border-white/10">Abort</button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* FAQ Simplified */}
      <section className="mt-40 max-w-4xl mx-auto flex flex-col gap-12">
        <h2 className="text-4xl font-display font-bold text-center">Frequently Asked <span className="text-gradient">Artifacts</span></h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { q: 'How long does a project take?', a: 'Standard projects typical wrap in 4-6 weeks from initial consultation to launch.' },
            { q: 'Do you offer hosting?', a: 'Yes, we provide premium global CDN hosting through our cloud partners for extreme reliability.' },
            { q: 'Can I migrate my current site?', a: 'Absolutely. We handle data migration and SEO preservation for every transition.' },
            { q: 'Is the design exclusive?', a: 'Every bespoke plan receives a unique architectural design. We never reuse layouts.' }
          ].map((faq, i) => (
            <div key={i} className="flex flex-col gap-2">
              <h4 className="font-bold text-lg text-brand-purple">{faq.q}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
