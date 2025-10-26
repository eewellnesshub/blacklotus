import { GradientBackground } from './components/gradient-background'
import { ExpandingCTA } from './components/ExpandingCTA'

function App() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <section className="px-6 flex flex-col items-center gap-6 text-center">
        <h1 className="font-instrument-serif text-white text-center text-balance font-normal tracking-tight text-5xl sm:text-6xl md:text-7xl">
          Everything is possible with Black lotus.
        </h1>

        <ExpandingCTA />
      </section>
    </main>
  )
}

export default App
