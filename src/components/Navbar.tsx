import { motion } from 'motion/react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Templates', path: '/templates' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'How It Works', path: '/how-it-works' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 backdrop-blur-md bg-brand-bg/70 border-b border-white/10' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-300" />
          <span className="text-xl font-display font-bold tracking-tight">VIRUS<span className="text-purple-400">LABS</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-400 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/pricing"
            className="btn-primary flex items-center gap-2 text-sm !px-6 !py-2.5"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-brand-bg/95 border-b border-white/10 backdrop-blur-xl"
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-xl font-display font-medium transition-colors ${
                  isActive ? 'text-brand-purple' : 'text-white/70'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className="btn-primary text-center"
          >
            Order Now
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}
