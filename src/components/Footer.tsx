import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-black text-white relative overflow-hidden border-t border-white/20">

      {/* Top Section - Compact Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3">

        {/* COLUMN 1: Brand & Info */}
        <div className="flex flex-col justify-between p-6 md:p-10 lg:border-r border-white/20">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
                B
              </div>
              <div className="text-xs font-bold uppercase leading-tight tracking-wide mt-1">
                UNIQUE PUBLIC INTERVENTIONS <br />
                <span className="text-zinc-500">// IMMERSIVE ACTIVATIONS</span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-xs pt-2">
              Founded by Simon Vaughan and Ben Kearns, we unite decades of combined expertise as visionary creatives and practical masterminds.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            <div className="text-zinc-400 text-xs space-y-1">
              <p>88 London Rd, Brighton BN1 4JF</p>
              <a href="mailto:hello@blacklotus.agency" className="text-white hover:underline transition-all">
                hello@blacklotus.agency
              </a>
            </div>
            <div className="flex gap-4">
              <Instagram className="w-4 h-4 text-zinc-500 hover:text-white transition-colors cursor-pointer" />
              <Linkedin className="w-4 h-4 text-zinc-500 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        {/* COLUMN 2: Navigation */}
        <div className="flex flex-col lg:border-r border-white/20">
          {['HOME', 'PROJECTS', 'WHAT WE DO', 'LATEST NEWS', 'GET IN TOUCH'].map((item, i, arr) => {
            // Calculate opacity: starts at 0.2 for HOME, decreases to 0 for GET IN TOUCH
            const borderOpacity = 0.2 * (1 - i / (arr.length - 1))
            const colors = ['#FF3366', '#33FF99', '#3366FF', '#FF9933', '#9933FF']

            return (
              <a
                key={i}
                href="#"
                className="group relative flex items-center justify-between px-6 md:px-10 py-6 transition-colors overflow-hidden"
              >
                {/* Color Sweep Background */}
                <div
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"
                  style={{ backgroundColor: colors[i] }}
                />

                {/* Fading border effect - progressively fades from HOME to GET IN TOUCH */}
                {borderOpacity > 0 && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px z-10"
                    style={{
                      background: `linear-gradient(to right, rgba(255, 255, 255, ${borderOpacity}) 0%, rgba(255, 255, 255, ${borderOpacity}) 20%, rgba(255, 255, 255, 0) 100%)`
                    }}
                  />
                )}

                <span className="text-sm md:text-base font-medium tracking-wide relative z-10 group-hover:text-black transition-colors">{item}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 relative z-10 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </a>
            )
          })}
        </div>

        {/* COLUMN 3: CTA & Copyright */}
        <div className="flex flex-col justify-between p-6 md:p-10">
          <div className="max-w-md">
            <h3 className="text-2xl md:text-3xl font-light leading-[1.1] mb-4 tracking-tight">
              Ready to kick start a discovery session?
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Share your ideas with us, and we'll begin turning your vision into reality today.
            </p>
          </div>

          <div className="flex justify-between items-end mt-12 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            <span>BLACK LOTUS AGENCY LTD 2025 ©</span>
            <span>WEBSITE BY PHUNK</span>
          </div>
        </div>

      </div>

      {/* Massive Bottom Text - scaled to exactly fill its container */}
      <div className="w-full relative flex items-end justify-center pointer-events-none overflow-hidden -mt-2 h-[40vh]">
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            textLength="100"
            lengthAdjust="spacingAndGlyphs"
            fill="white"
            style={{
              fontFamily: 'Impact, "Arial Narrow Bold", sans-serif',
              fontSize: '20px',
            }}
          >
            BLACK LOTUS
          </text>
        </svg>
      </div>
    </footer>
  )
}