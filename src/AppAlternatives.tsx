import { GradientBackground } from './components/GradientBackground'
import { ExpandingButton } from './components/ExpandingButton'
import Hero from './components/Hero'

function App() {
  // You can switch between these two approaches:
  
  // Option 1: Use the full Hero component with expanding CTA
  return <Hero />

  // Option 2: Use the simple gradient background with custom content
  // return (
  //   <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
  //     <GradientBackground />
  //     <div className="absolute inset-0 -z-10 bg-black/20" />

  //     <section className="px-6 flex flex-col items-center gap-6 text-center">
  //       <h1 className="font-instrument-serif text-white text-center text-balance font-normal tracking-tight text-5xl sm:text-6xl md:text-7xl">
  //         imagination is limit
  //       </h1>
        
  //       <ExpandingButton />
  //     </section>
  //   </main>
  // )
}

export default App
