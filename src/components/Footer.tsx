import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-10 bg-brand-bg relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center neon-glow-purple group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tighter text-white">VIRUS</span>
            </Link>
            <p className="text-white/50 max-w-sm text-sm leading-relaxed mb-8">
              Crafting premium digital experiences for forward-thinking brands. 
              We blend cutting-edge technology with visionary design to build 
              the future of the web.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-brand-purple transition-all"><Twitter size={20} /></a>
              <a href="#" className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-brand-purple transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-brand-purple transition-all"><Linkedin size={20} /></a>
              <a href="#" className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-brand-purple transition-all"><Github size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 uppercase text-xs tracking-widest">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/templates" className="text-sm text-white/50 hover:text-white transition-colors">Web Design</Link></li>
              <li><Link to="/templates" className="text-sm text-white/50 hover:text-white transition-colors">Development</Link></li>
              <li><Link to="/templates" className="text-sm text-white/50 hover:text-white transition-colors">Brand Identity</Link></li>
              <li><Link to="/templates" className="text-sm text-white/50 hover:text-white transition-colors">SEO Mastery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="text-sm text-white/50 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/how-it-works" className="text-sm text-white/50 hover:text-white transition-colors">Process</Link></li>
              <li><Link to="/pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30 truncate">
            &copy; {new Date().getFullYear()} VIRUS Digital Experience. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
