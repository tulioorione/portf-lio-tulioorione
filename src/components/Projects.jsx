import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "../data/projects"

const RADIUS = 170
const AUTO_SPEED = 0.08
const FRICTION = 0.94
const SENSITIVITY = 0.25

function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="carousel-card group cursor-pointer flex flex-col"
      style={{
        width: 280,
        height: 360,
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        borderRadius: 8,
        padding: 20,
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: "#111111",
          border: project.image ? "1px solid #1a1a1a" : "1px dashed #2a2a2a",
          borderRadius: 6,
          marginBottom: 16,
        }}
      >
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <span className="font-mono text-xs text-muted/50">&#9654; preview</span>
        )}
      </div>

      <h3 className="font-grotesk font-black text-xl leading-tight">
        {project.title}
      </h3>

      <p className="font-mono text-xs text-muted mt-2 leading-relaxed line-clamp-2 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {project.stack.slice(0, 3).map((s) => (
          <span
            key={s}
            className="font-mono text-[10px] uppercase tracking-wider text-muted border border-outline px-2 py-0.5"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-3" style={{ borderTop: "1px solid #1a1a1a" }}>
        <span className="font-mono text-[11px] text-accent uppercase tracking-wider">
          ver mais &rarr;
        </span>
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-surface border border-outline max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 font-mono text-2xl text-muted hover:text-accent transition-colors leading-none cursor-pointer"
        >
          &times;
        </button>

        <div
          className="w-full flex items-center justify-center overflow-hidden mb-6"
          style={{
            aspectRatio: "16/9",
            background: "#111111",
            border: project.image ? "1px solid #1a1a1a" : "1px dashed #2a2a2a",
            borderRadius: 6,
          }}
        >
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <span className="font-mono text-xs text-muted/50">&#9654; preview</span>
          )}
        </div>

        <h3 className="font-grotesk font-black text-3xl md:text-4xl leading-tight">
          {project.title}
        </h3>

        <p className="font-mono text-sm text-muted mt-4 leading-relaxed">
          {project.longDescription || project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] uppercase tracking-wider text-muted border border-outline px-2.5 py-1"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-6 mt-8 pt-5" style={{ borderTop: "1px solid #1a1a1a" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-wider"
            >
              GitHub &rarr;
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-wider"
            >
              Live &rarr;
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const stageRef = useRef(null)
  const cardsRef = useRef([])
  const angleRef = useRef(0)
  const velocityRef = useRef(0)
  const pausedRef = useRef(false)
  const draggingRef = useRef(false)
  const lastXRef = useRef(0)
  const dragMovedRef = useRef(0)
  const [selected, setSelected] = useState(null)

  const cardCount = projects.length
  const angleStep = 360 / cardCount

  useEffect(() => {
    let raf
    const tick = () => {
      if (!pausedRef.current) {
        if (!draggingRef.current) {
          angleRef.current += velocityRef.current
          velocityRef.current *= FRICTION
          if (Math.abs(velocityRef.current) < 0.05) {
            velocityRef.current = 0
            angleRef.current += AUTO_SPEED
          }
        }
      }

      cardsRef.current.forEach((el, i) => {
        if (!el) return
        const cardAngle = angleStep * i + angleRef.current
        el.style.transform = `translate(-50%, -50%) rotateY(${cardAngle}deg) translateZ(${RADIUS}px)`

        const norm = (((cardAngle % 360) + 360) % 360)
        const distFromFront = Math.min(norm, 360 - norm)
        const t = 1 - distFromFront / 180
        const scale = 0.55 + t * 0.45
        const opacity = 0.25 + t * 0.75
        const isFront = distFromFront < angleStep / 2

        el.style.opacity = opacity
        el.style.zIndex = Math.round(t * 1000)
        const inner = el.firstChild
        if (inner) {
          inner.style.transform = `scale(${scale})`
          inner.style.boxShadow = isFront ? "0 0 40px #ef444433" : "none"
          inner.style.borderColor = isFront ? "rgba(239,68,68,0.4)" : "#1a1a1a"
        }
      })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [angleStep])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const startDrag = (x) => {
      if (pausedRef.current) return
      draggingRef.current = true
      lastXRef.current = x
      velocityRef.current = 0
      dragMovedRef.current = 0
      stage.style.cursor = "grabbing"
    }
    const moveDrag = (x) => {
      if (!draggingRef.current) return
      const delta = x - lastXRef.current
      lastXRef.current = x
      dragMovedRef.current += Math.abs(delta)
      velocityRef.current = delta * SENSITIVITY
      angleRef.current += velocityRef.current
    }
    const endDrag = () => {
      if (!draggingRef.current) return
      draggingRef.current = false
      stage.style.cursor = "grab"
    }

    const onMouseDown = (e) => startDrag(e.clientX)
    const onMouseMove = (e) => moveDrag(e.clientX)
    const onMouseUp = () => endDrag()

    const onTouchStart = (e) => startDrag(e.touches[0].clientX)
    const onTouchMove = (e) => moveDrag(e.touches[0].clientX)
    const onTouchEnd = () => endDrag()

    stage.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    stage.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", onTouchEnd)

    return () => {
      stage.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      stage.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  useEffect(() => {
    pausedRef.current = !!selected
  }, [selected])

  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{ paddingTop: 140, paddingBottom: 140, background: "rgba(0,0,0,0.7)" }}
    >
      <div className="section-divider" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            03 // Projetos
          </span>
        </motion.div>

        <motion.h2
          className="font-grotesk font-black text-5xl md:text-7xl lg:text-8xl mt-6 tracking-tight leading-[0.9]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Trabalhos <span className="text-outline">recentes</span>
        </motion.h2>

        <p className="font-mono text-[11px] text-muted/60 uppercase tracking-widest mt-4">
          clique e arraste para girar
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative w-full flex items-center justify-center"
        style={{
          marginTop: 140,
          height: 480,
          perspective: 1600,
          perspectiveOrigin: "50% 50%",
          touchAction: "pan-y",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        <div
          className="absolute left-1/2 pointer-events-none"
          style={{
            bottom: -40,
            width: 560,
            height: 90,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.35) 0%, rgba(239,68,68,0.15) 35%, rgba(239,68,68,0) 70%)",
            filter: "blur(12px)",
            zIndex: 0,
          }}
        />

        <div
          className="relative w-0 h-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute left-0 top-0"
              style={{
                width: 280,
                height: 360,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform, opacity",
              }}
            >
              <div style={{ width: "100%", height: "100%", borderRadius: 8, transition: "box-shadow 0.3s, border-color 0.3s" }}>
                <ProjectCard
                  project={p}
                  onClick={() => {
                    if (dragMovedRef.current < 5) setSelected(p)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
