import { useState, useEffect, useRef } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'

const TARGET_EMAIL = 'hello@blacklotus.dev' // TODO: change to your contact email

const budgetOptions = [
  { value: '<5k', label: '< $5k' },
  { value: '5k-15k', label: '$5k – $15k' },
  { value: '15k-50k', label: '$15k – $50k' },
  { value: '>50k', label: '$50k+' },
]

const timelineOptions = [
  { value: 'ASAP', label: 'ASAP' },
  { value: '1-3 months', label: '1–3 months' },
  { value: '3-6 months', label: '3–6 months' },
  { value: 'Flexible', label: 'Flexible' },
]

function CustomSelect({ 
  options, 
  value, 
  onChange, 
  label 
}: { 
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  label: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs text-black/60 mb-2.5 font-medium">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-0 py-3 pr-6 border-b-2 border-black/10 bg-transparent text-black focus:outline-none focus:border-black transition-colors text-base text-left appearance-none"
      >
        {selectedOption?.label || options[0].label}
      </button>
      <ChevronDown 
        className={`absolute right-0 bottom-4 w-4 h-4 text-black/40 pointer-events-none transition-transform ${isOpen ? 'rotate-180' : ''}`} 
      />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-white border border-black/10 rounded-xl shadow-xl overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left text-base transition-colors hover:bg-black/5 ${
                  value === option.value ? 'bg-black/5 font-medium' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ExpandingCTA() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [budget, setBudget] = useState('<5k')
  const [timeline, setTimeline] = useState('ASAP')

  const handleExpand = () => setIsExpanded(true)
  const handleClose = () => setIsExpanded(false)

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isExpanded])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || '')
    const email = String(fd.get('email') || '')
    const company = String(fd.get('company') || '')
    const details = String(fd.get('details') || '')

    const subject = `New project enquiry from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nBudget: ${budget}\nTimeline: ${timeline}\n\nProject Details:\n${details}`

    const mailto = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <>
      <AnimatePresence initial={false}>
        {!isExpanded && (
          <motion.div className="inline-block relative">
            <motion.div
              style={{ borderRadius: '100px' }}
              layout
              layoutId="cta-card"
              className="absolute inset-0 bg-white items-center justify-center transform-gpu will-change-transform"
            />
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout={false}
              onClick={handleExpand}
              className="h-15 px-6 sm:px-8 py-3 text-lg sm:text-xl font-regular text-black tracking-[-0.01em] relative"
            >
              Send enquiry
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-2">
            <motion.div
              layoutId="cta-card"
              transition={{ duration: 0.3 }}
              style={{ borderRadius: '24px' }}
              layout
              className="relative flex h-full w-full overflow-y-auto bg-white transform-gpu will-change-transform"
            >
              <motion.div
                initial={{ opacity: 0, scale: 2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                layout={false}
                transition={{ duration: 0.15, delay: 0.05 }}
                className="absolute h-full inset-0 overflow-hidden pointer-events-none"
                style={{ borderRadius: '24px' }}
              >
                <MeshGradient
                  speed={1}
                  colors={["#FFFFFF", "#F5F5F5", "#E8E8E8", "#D4D4D4"]}
                  distortion={0.8}
                  swirl={0.1}
                  grainMixer={0}
                  grainOverlay={0}
                  className="inset-0 sticky top-0"
                  style={{ height: '100%', width: '100%' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="relative z-10 grid md:grid-cols-2 h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16"
              >
                {/* Left brand/info panel */}
                <div className="flex flex-col gap-4">
                  <img src="/blacklotus.svg" alt="Black Lotus" className="h-12 w-auto" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-tight tracking-[-0.03em]">
                    Send your project enquiry
                  </h2>
                  <p className="text-black/80 leading-[160%]">
                    Tell us about your idea, scope and timeline. A developer from our team will reply via email.
                  </p>
                  <ul className="text-black/70 text-sm space-y-2">
                    <li>• Web apps, dashboards, landing pages</li>
                    <li>• React, Next.js, Vite, Tailwind, Node</li>
                    <li>• Fixed-price or time & materials</li>
                  </ul>
                </div>

                {/* Right form panel */}
                <div className="w-full">
                  <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs text-black/60 mb-2.5 font-medium">
                          Your name *
                        </label>
                        <input 
                          required 
                          type="text" 
                          id="name" 
                          name="name" 
                          className="w-full px-0 py-3 border-b-2 border-black/10 bg-transparent text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base" 
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs text-black/60 mb-2.5 font-medium">
                          Work email *
                        </label>
                        <input 
                          required 
                          type="email" 
                          id="email" 
                          name="email" 
                          className="w-full px-0 py-3 border-b-2 border-black/10 bg-transparent text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base" 
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="company" className="block text-xs text-black/60 mb-2.5 font-medium">
                          Company
                        </label>
                        <input 
                          type="text" 
                          id="company" 
                          name="company" 
                          className="w-full px-0 py-3 border-b-2 border-black/10 bg-transparent text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base" 
                          placeholder="Optional"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <CustomSelect 
                          options={budgetOptions}
                          value={budget}
                          onChange={setBudget}
                          label="Budget"
                        />
                        <CustomSelect 
                          options={timelineOptions}
                          value={timeline}
                          onChange={setTimeline}
                          label="Timeline"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="details" className="block text-xs text-black/60 mb-2.5 font-medium">
                        Project details *
                      </label>
                      <textarea 
                        required 
                        id="details" 
                        name="details" 
                        rows={5} 
                        className="w-full px-0 py-3 border-b-2 border-black/10 bg-transparent text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base resize-none" 
                        placeholder="What are you building? Goals, scope, links, deadlines..."
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-4">
                      <p className="text-xs text-black/50">We'll open your email client with the enquiry pre-filled.</p>
                      <button type="submit" className="px-8 py-3.5 rounded-full bg-black text-white font-medium hover:bg-black/90 transition-all tracking-[-0.02em] text-sm hover:scale-[1.02] active:scale-[0.98]">
                        Send enquiry
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>

              <motion.button onClick={handleClose} className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-black bg-transparent transition-colors hover:bg-black/10 rounded-full" aria-label="Close">
                <X className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
