import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const menuItems = [
  { label: 'Home', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop' },
  { label: 'Projects', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop' },
  { label: 'Process', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2700&auto=format&fit=crop' },
  { label: 'Studio', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2700&auto=format&fit=crop' },
  { label: 'Contact', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2700&auto=format&fit=crop' },
]

export function OverlayMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(menuItems[0].image)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Floating Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-50 px-6 py-3 bg-black text-white rounded-full font-medium text-sm uppercase tracking-widest hover:scale-105 transition-transform mix-blend-difference"
      >
        Menu
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-black text-white flex"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 hover:rotate-90 transition-transform duration-300"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="w-full h-full flex flex-col md:flex-row">
              {/* Links Section */}
              <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-12 md:px-24">
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href="#"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      onMouseEnter={() => setActiveImage(item.image)}
                      className="text-5xl md:text-7xl font-display uppercase tracking-tighter hover:text-zinc-400 transition-colors cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Image Preview Section */}
              <div className="hidden md:block w-1/2 h-full relative overflow-hidden bg-zinc-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt="Menu Preview"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
