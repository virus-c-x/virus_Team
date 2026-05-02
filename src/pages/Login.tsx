import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, Loader2, Chrome } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      setError('Invalid credentials. Access denied.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/admin');
    } catch (err: any) {
      setError('Authentication failed. Check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-10 rounded-[2.5rem] max-w-md w-full neon-glow-purple border-brand-purple/30"
      >
        <div className="flex flex-col items-center gap-4 mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center neon-glow-purple">
            <Lock className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">Guardian Login</h1>
            <p className="text-white/40 text-sm">Secure access to the command center</p>
          </div>
        </div>

        <div className="space-y-6">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold group"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                <Chrome size={20} className="group-hover:text-brand-purple transition-colors" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#050505] px-4 text-white/20 font-bold tracking-widest">or legacy auth</span></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Protocol</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-brand-purple outline-none transition-all" 
                  placeholder="admin@viruslabs.com" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Secure Token</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-brand-purple outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
            
            {error && <p className="text-red-400 text-xs text-center border border-red-400/20 bg-red-400/5 py-2 rounded-lg">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 text-lg"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Authorize Access'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

