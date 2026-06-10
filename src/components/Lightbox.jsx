import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-dark/85 p-4 backdrop-blur-sm sm:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <motion.figure
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="relative max-h-full overflow-auto rounded-2xl bg-white p-2 shadow-(--shadow-deep)"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={item.image} alt={item.alt} className="max-h-[82vh] w-auto rounded-xl" />
            <figcaption className="px-3 py-3 text-center text-sm font-semibold text-forest-dark">
              {item.title}
            </figcaption>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-forest-dark/70 text-cream backdrop-blur transition-colors hover:bg-forest-dark"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
