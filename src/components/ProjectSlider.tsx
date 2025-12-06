import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const projects = [
  {
    id: "01",
    title: "FinFlow Platform",
    client: "Apex Capital",
    year: "2024",
    role: "Full-Stack",
    description: "A comprehensive financial dashboard allowing real-time tracking of assets across multiple global markets.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "MedConnect Portal",
    client: "HealthFirst",
    year: "2024",
    role: "Web App",
    description: "Secure patient-doctor communication portal with integrated scheduling and telemedicine capabilities.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Velocity Dashboard",
    client: "TechVentures",
    year: "2023",
    role: "SaaS Platform",
    description: "High-performance analytics platform for tracking startup growth metrics and velocity.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
  },
]

export function ProjectSlider() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(1)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Add delay: first 10% and last 10% are dead zones
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-200%"])
  const progressScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const adjustedProgress = Math.max(0, Math.min(1, (latest - 0.1) / 0.8))
    const rawIndex = Math.ceil(adjustedProgress * projects.length)
    const index = Math.min(Math.max(rawIndex, 1), projects.length)
    if (index !== currentIndex) setCurrentIndex(index)
  })

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen items-center overflow-x-clip overflow-y-visible">
        {/* Horizontal sliding container */}
        <motion.div style={{ x }} className="flex">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </motion.div>

        {/* Bottom Footer Bar - constrained width */}
        <div className="absolute bottom-5 left-0 w-full z-50 px-8 md:px-16 pb-8">
          {/* Progress bar acts as top divider */}
          <div className="w-full h-px bg-white/20 mb-6">
            <motion.div
              style={{ scaleX: progressScale }}
              className="h-full bg-white origin-left"
            />
          </div>

          {/* Footer content */}
          <div className="flex justify-between items-center text-white">
            <div className="font-mono text-sm tracking-widest">
              [{currentIndex}/{projects.length}]
            </div>
            <a href="#" className="flex items-center gap-2 group cursor-pointer uppercase font-medium tracking-widest text-sm hover:opacity-70 transition-opacity">
              View All Projects
              <span className="text-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="relative h-screen w-screen flex-shrink-0 bg-black text-white flex items-center justify-center p-6 md:p-16 box-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 via-zinc-900/0 to-black/80 z-10 pointer-events-none" />

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-20">

        {/* LEFT: Title - high z-index to appear above image */}
        <div className="md:col-span-3 order-2 md:order-1 relative z-50 overflow-visible">
          <span className="block text-xs font-mono text-zinc-500 mb-4 uppercase tracking-widest">
            Project {project.id}
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase leading-[0.9] tracking-tighter"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 50%, #e8b892 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {project.title.split(" ").map((word: string, i: number) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
        </div>

        {/* CENTER: Image */}
        <div className="md:col-span-6 order-1 md:order-2 flex justify-center items-center relative z-10">
          <div className="relative aspect-[4/3] w-full max-h-[60vh] overflow-hidden group">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                View Project
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="md:col-span-3 order-3 flex flex-col gap-6 md:pl-4 text-sm">
          <div className="flex flex-col gap-1">
            <h3 className="uppercase text-zinc-500 text-xs tracking-widest">Role</h3>
            <p className="uppercase tracking-wide">{project.role}</p>
            <p className="uppercase tracking-wide">{project.year}</p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="uppercase text-zinc-500 text-xs tracking-widest">Client</h3>
            <p className="uppercase tracking-wide">{project.client}</p>
          </div>

          <p className="text-zinc-400 leading-relaxed text-sm mt-2">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  )
}
