import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
    >
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-[#0F1A0F] text-sm font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
            style={{ boxShadow: '0 4px 20px rgba(15,61,31,0.15)' }}
          >
            Chat with us
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white" />
          </motion.div>
        )}

        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-full whatsapp-pulse"
          style={{ background: '#25D366', opacity: 0.4 }}
        />

        {/* Button */}
        <a
          href="https://wa.me/919347959693?text=Hi%2C%20I%27m%20interested%20in%20Zenviro%20products"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Zenviro on WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-transform hover:scale-110"
          style={{ background: '#25D366' }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <MessageCircle size={26} className="text-white" />
        </a>
      </div>
    </motion.div>
  );
}
