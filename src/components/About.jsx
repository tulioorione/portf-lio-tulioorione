import { motion } from "framer-motion"

export default function About() {
  return (
    <section
      id="about"
      className="relative"
      style={{ paddingTop: 140, paddingBottom: 140, background: "rgba(0,0,0,0.7)" }}
    >
      <div className="section-divider" />

      <div className="section-container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            01 // Sobre
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-grotesk font-black text-5xl md:text-7xl lg:text-8xl mt-6 tracking-tight leading-[0.9]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Sobre <span className="text-outline">mim</span>
        </motion.h2>

        {/* Content grid — 3/5 + 2/5 */}
        <div className="mt-20 grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Bio — 3 columns */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted leading-relaxed text-lg md:text-xl">
              {/* TODO: Escreva sua bio aqui */}
              Desenvolvedor Fullstack apaixonado por construir soluções completas
              — do back-end robusto em Java ao front-end interativo com React.
              Busco constantemente aprender novas tecnologias e entregar
              código limpo e eficiente.
            </p>
            <p className="text-muted leading-relaxed text-lg md:text-xl mt-8">
              {/* TODO: Mais detalhes sobre experiência/formação */}
              Com experiência em desenvolvimento de APIs REST, interfaces
              responsivas e bancos de dados relacionais, estou sempre pronto
              para novos desafios que exijam pensamento criativo e técnico.
            </p>
          </motion.div>

          {/* Quick facts — 2 columns */}
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {[
              { label: "Stack principal", value: "Java · React · Python" },
              { label: "Foco", value: "Fullstack Development" },
              { label: "Localização", value: "Brasil" }, // TODO: cidade
              { label: "Disponível para", value: "CLT · Freelance" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-l-2 border-outline pl-6 py-1 hover:border-accent transition-colors duration-300"
              >
                <span className="font-mono text-[11px] text-muted uppercase tracking-wider block mb-1.5">
                  {item.label}
                </span>
                <span className="font-grotesk font-bold text-lg text-white block">
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
