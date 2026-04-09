import { motion } from "framer-motion"

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "tulio@email.com",
    href: "mailto:tulio@email.com",
  },
  {
    label: "GitHub",
    value: "github.com/tulioorione",
    href: "https://github.com/tulioorione/portf-lio-tulioorione",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tulioorione",
    href: "https://linkedin.com/in/tulioorione",
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative" style={{ paddingTop: 140, background: "rgba(0,0,0,0.7)" }}>
      <div className="section-divider" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            04 // Contato
          </span>
        </motion.div>

        <motion.h2
          className="font-grotesk font-black text-5xl md:text-7xl lg:text-8xl mt-6 tracking-tight leading-[0.9]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Vamos <span className="text-outline">conversar</span>
        </motion.h2>

        <motion.p
          className="text-muted text-lg md:text-xl mt-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Aberto a oportunidades CLT, freelance e colaborações com a comunidade dev.
          Bora trocar uma ideia?
        </motion.p>

        <div className="mt-20 grid sm:grid-cols-3" style={{ gap: 24 }}>
          {CONTACT_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-all duration-500"
              style={{
                border: "1px solid #1a1a1a",
                borderRadius: 8,
                padding: 32,
                background: "#0a0a0a",
              }}
              whileHover={{ borderColor: "rgba(239, 68, 68, 0.4)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <span className="font-mono text-[11px] text-accent uppercase tracking-widest block mb-4">
                {link.label}
              </span>
              <span className="font-grotesk text-white text-sm md:text-base group-hover:text-accent transition-colors duration-300 break-all block">
                {link.value}
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="mailto:tulio@email.com"
            className="inline-block font-mono text-sm border-2 border-accent text-accent px-8 py-4 tracking-wider uppercase hover:bg-accent hover:text-black transition-colors duration-300"
          >
            Enviar email
          </a>
        </motion.div>
      </div>

      <div style={{ marginTop: 140 }} className="border-t border-outline">
        <div className="section-container py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} Túlio Orione
          </span>
          <span className="font-mono text-xs text-outline">
            Built with React + Tailwind + Framer Motion
          </span>
        </div>
      </div>
    </section>
  )
}
