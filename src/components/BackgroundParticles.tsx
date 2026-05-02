import { motion } from 'motion/react';

const particles = Array.from({ length: 8 });

export default function BackgroundParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
