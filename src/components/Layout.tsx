import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-grow pt-24">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {children}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
