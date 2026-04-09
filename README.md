# Portfólio — Túlio Orione

Portfólio pessoal de desenvolvedor fullstack, com design minimalista em tom escuro, animações 3D e interações ricas.

🔗 **Repositório:** [github.com/tulioorione/portf-lio-tulioorione](https://github.com/tulioorione/portf-lio-tulioorione)

---

## ✨ Destaques

- **Hero animado** com efeito de scan line, reveal sequencial do nome e glitch passivo.
- **Background global de Particle Network** — canvas com partículas conectadas que reagem ao mouse, presente em todas as seções.
- **Carrossel 3D de projetos** (cover flow) com rotação automática, clique-arraste com inércia, destaque do card frontal e iluminação ambiente.
- **Modal de detalhes** dos projetos com animação fluida (Framer Motion) e fechamento por `Esc`, clique no overlay ou botão.
- **Seções** Sobre, Skills (com barras de progresso animadas) e Contato.
- **Responsivo** para desktop e mobile, com suporte a swipe no carrossel.

---

## 🛠 Stack

| Camada          | Tecnologias                          |
| --------------- | ------------------------------------ |
| Build & Dev     | Vite                                 |
| Framework       | React 19                             |
| Estilização     | Tailwind CSS v4                      |
| Animações       | Framer Motion                        |
| Tipografia      | Space Grotesk + JetBrains Mono       |

---

## 🚀 Como rodar localmente

Pré-requisitos: **Node.js 18+** e **npm**.

```bash
# 1. Clonar o repositório
git clone https://github.com/tulioorione/portf-lio-tulioorione.git
cd portf-lio-tulioorione

# 2. Instalar dependências
npm install

# 3. Rodar em modo desenvolvimento
npm run dev

# 4. Abrir no navegador
# http://localhost:5173
```

### Scripts disponíveis

| Comando           | Ação                                           |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento (Vite)    |
| `npm run build`   | Gera a versão de produção em `dist/`           |
| `npm run preview` | Visualiza localmente o build de produção       |
| `npm run lint`    | Executa o ESLint sobre o código                |

---

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── Navbar.jsx            # Navegação fixa com toggle mobile
│   ├── Hero.jsx              # Seção principal com reveal animado
│   ├── About.jsx             # Sobre mim
│   ├── Skills.jsx            # Stack técnica com barras de progresso
│   ├── Projects.jsx          # Carrossel 3D + modal de detalhes
│   ├── Contact.jsx           # Cards de contato e CTA
│   └── ParticleNetwork.jsx   # Background global animado
├── data/
│   ├── projects.js           # Dados dos projetos exibidos no carrossel
│   └── skills.js             # Dados das habilidades e níveis
├── styles/
│   └── globals.css           # Estilos globais e utilitários Tailwind
├── App.jsx                   # Composição das seções
└── main.jsx                  # Entry point do React
```

---

## 🎨 Paleta e identidade visual

- **Fundo:** `#000000` (void)
- **Cor de destaque:** `#ef4444` (accent — vermelho vibrante)
- **Texto principal:** `#ffffff`
- **Texto suave:** `#888888` (muted)
- **Bordas:** `#2a2a2a` (outline)
- **Fonte de display:** Space Grotesk (800/900)
- **Fonte monoespaçada:** JetBrains Mono

---

## 🧩 Personalização

Para usar como base do seu próprio portfólio, edite principalmente:

1. **`src/data/projects.js`** — seus projetos, descrições, stack e links.
2. **`src/data/skills.js`** — suas habilidades e níveis de proficiência.
3. **`src/components/About.jsx`** — sua bio e informações pessoais.
4. **`src/components/Contact.jsx`** — seus canais de contato.
5. **`src/components/Hero.jsx`** — nome e stack exibidos no topo.

---

## 📄 Licença

Uso pessoal e educacional. Sinta-se à vontade para se inspirar, mas dê os devidos créditos ao utilizar como base.

---

Feito com ❤️ por **Túlio Orione**
