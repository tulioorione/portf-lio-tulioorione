import { motion } from "framer-motion"
import { skills } from "../data/skills"

function SkillBar({ name, level, delay }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2.5">
        <span className="font-mono text-sm text-white">{name}</span>
        <span className="font-mono text-xs text-muted">{level}%</span>
      </div>
      <div className="h-0.75 bg-outline/40 overflow-hidden">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
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
            02 // Skills
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
          Tech <span className="text-outline">Stack</span>
        </motion.h2>

        {/* Skill categories — gap: 48px */}
        <div
          className="mt-20 grid md:grid-cols-3"
          style={{ gap: 48 }}
        >
          {skills.map((category, catIdx) => (
            <motion.div
              key={category.category}
              className="border border-outline p-8 hover:border-accent/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
            >
              <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-10">
                {`{ ${category.category} }`}
              </h3>
              {/* mb-32px (mb-8) between each skill item */}
              <div className="flex flex-col" style={{ gap: 32 }}>
                {category.items.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.1 + i * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
