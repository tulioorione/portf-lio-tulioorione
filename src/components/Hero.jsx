import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STACK_CHIPS = ["Java", "React", "JavaScript", "Python", "HTML/CSS"]

export default function Hero() {
  const [phase, setPhase] = useState("scan") // scan → reveal → content
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("reveal"), 1200),
      setTimeout(() => setPhase("content"), 2400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Passive glitch every 6s
  useEffect(() => {
    if (phase !== "content") return
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [phase])

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      {/* Scan line */}
      <AnimatePresence>
        {phase === "scan" && (
          <motion.div
            className="absolute left-0 w-full h-1 bg-accent z-50 shadow-[0_0_40px_10px_rgba(239,68,68,0.4)]"
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#2a2a2a 1px, transparent 1px), linear-gradient(90deg, #2a2a2a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* TÚLIO — drops down */}
        <AnimatePresence>
          {(phase === "reveal" || phase === "content") && (
            <motion.h1
              className={`font-grotesk font-black text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter text-white ${glitch ? "glitch-active" : ""}`}
              initial={{ y: -120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              TÚLIO
            </motion.h1>
          )}
        </AnimatePresence>

        {/* ORIONE — outline, rises up */}
        <AnimatePresence>
          {(phase === "reveal" || phase === "content") && (
            <motion.h1
              className={`font-grotesk font-black text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter text-outline ${glitch ? "glitch-active" : ""}`}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              ORIONE
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Badge — slides in */}
        <AnimatePresence>
          {phase === "content" && (
            <motion.div
              className="mt-6 inline-block"
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <span className="bg-accent text-black font-mono font-bold text-sm px-4 py-2 tracking-wider uppercase">
                Fullstack Developer
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stack chips */}
        <AnimatePresence>
          {phase === "content" && (
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {STACK_CHIPS.map((chip, i) => (
                <motion.span
                  key={chip}
                  className="font-mono text-xs border border-outline text-muted px-3 py-1.5 tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.08 }}
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {phase === "content" && (
            <motion.div
              className="mt-10 flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button
                onClick={() => scrollTo("projects")}
                className="font-mono text-sm border-2 border-accent text-accent px-6 py-3 tracking-wider uppercase hover:bg-accent hover:text-black transition-colors duration-300 cursor-pointer"
              >
                Ver projetos
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="font-mono text-sm border border-outline text-muted px-6 py-3 tracking-wider uppercase hover:border-white hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Contato
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-void to-transparent" />
    </section>
  )
}
