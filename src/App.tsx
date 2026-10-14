import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Compass,
  GitBranch,
  Globe,
  Layers,
  Lightbulb,
  Menu,
  Monitor,
  MousePointer2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BriefModal } from './components/BriefModal'

function Brand({ small = false }: { small?: boolean }) {
  return (
    <a
      className={`brand ${small ? 'brand-small' : ''}`}
      href="#inicio"
      aria-label="Newthing — início"
    >
      <span className="brand-symbol">
        <span />
        <span />
        <span />
      </span>
      <span>
        newthing<span className="brand-period">.</span>
      </span>
    </a>
  )
}

function SectionHeading({
  label,
  title,
  text,
}: {
  label: string
  title: React.ReactNode
  text: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <span />
        {label}
      </span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function FlowComparison() {
  const nodes = [
    { label: 'Estratégia', icon: Compass, className: 'node-strategy' },
    { label: 'Design', icon: MousePointer2, className: 'node-design' },
    { label: 'Código', icon: Code2, className: 'node-code' },
    { label: 'Integrações', icon: Workflow, className: 'node-integrations' },
  ]
  return (
    <div className="comparison-grid">
      <div className="flow-card scattered-card">
        <div className="flow-card-top">
          <span>Quando as peças não se conectam</span>
          <span className="flow-badge muted-red">
            <i />
            Mais ruído
          </span>
        </div>
        <div
          className="flow-diagram scattered-diagram"
          role="img"
          aria-label="Estratégia, design, código e integrações separados, sem uma direção comum"
        >
          <svg className="flow-lines" viewBox="0 0 500 215" preserveAspectRatio="none">
            <path d="M100 55 Q220 170 395 65 M130 160 Q280 20 380 165 M100 55 L130 160 M395 65 L380 165" />
          </svg>
          {nodes.map(({ label, icon: Icon, className }) => (
            <span className={`diagram-node ${className}`} key={label}>
              <Icon size={15} />
              {label}
            </span>
          ))}
          <span className="diagram-center scattered-center">
            <Lightbulb size={22} />
            <small>Sua ideia</small>
          </span>
          <span className="small-cross cross-one">×</span>
          <span className="small-cross cross-two">×</span>
        </div>
        <div className="diagram-caption">
          <span>Decisões isoladas</span>
          <span>Retrabalho</span>
          <span>Pouca visibilidade</span>
        </div>
      </div>
      <div className="flow-card connected-card">
        <div className="flow-card-top">
          <span>Com a Newthing</span>
          <span className="flow-badge blue-badge">
            <i />
            Uma direção
          </span>
        </div>
        <div
          className="flow-diagram connected-diagram"
          role="img"
          aria-label="Newthing conecta estratégia, design, código e integrações em um único projeto"
        >
          <svg className="flow-lines" viewBox="0 0 500 215" preserveAspectRatio="none">
            <path d="M115 60 L250 107 L385 60 M125 165 L250 107 L375 165" />
            <circle cx="250" cy="107" r="70" />
          </svg>
          {nodes.map(({ label, icon: Icon, className }) => (
            <span className={`diagram-node ${className}`} key={label}>
              <Icon size={15} />
              {label}
            </span>
          ))}
          <span className="diagram-center connected-center">
            <span className="mini-brand-symbol">n.</span>
          </span>
          <span className="line-point point-one" />
          <span className="line-point point-two" />
        </div>
        <div className="diagram-caption">
          <span>
            <Check size={12} />
            Plano claro
          </span>
          <span>
            <Check size={12} />
            Peças conectadas
          </span>
          <span>
            <Check size={12} />
            Próximo passo definido
          </span>
        </div>
      </div>
    </div>
  )
}

const solutions: {
  id: string
  title: string
  tag: string
  text: string
  icon: LucideIcon
  items: string[]
}[] = [
  {
    id: '01',
    title: 'Da ideia ao plano.',
    tag: 'ESTRATÉGIA',
    text: 'Transforme uma ideia aberta em prioridades, jornadas e um caminho de construção.',
    icon: Compass,
    items: ['Discovery e diagnóstico', 'Escopo e prioridades', 'Protótipo e validação'],
  },
  {
    id: '02',
    title: 'Do plano ao produto.',
    tag: 'DESENVOLVIMENTO',
    text: 'Sites, sistemas e produtos digitais desenhados para resolver o problema certo.',
    icon: Code2,
    items: ['Landing pages e sites', 'Aplicações web e MVPs', 'Integrações e automações'],
  },
  {
    id: '03',
    title: 'Do produto ao próximo nível.',
    tag: 'EVOLUÇÃO',
    text: 'Dê continuidade ao que funciona e encontre espaço para melhorar a experiência.',
    icon: Rocket,
    items: [
      'Evolução de funcionalidades',
      'Experiência e performance',
      'Operação e infraestrutura',
    ],
  },
]
const steps = [
  {
    id: '01',
    title: 'Entender',
    description:
      'Primeiro, o seu contexto. Conversamos sobre a ideia, o problema e o que você quer alcançar.',
    icon: Compass,
    deliverable: 'Direção compartilhada',
  },
  {
    id: '02',
    title: 'Desenhar',
    description:
      'Organizamos o que importa, desenhamos os fluxos e definimos um escopo que faz sentido.',
    icon: Layers,
    deliverable: 'Plano de construção',
  },
  {
    id: '03',
    title: 'Construir',
    description:
      'Design e desenvolvimento trabalham juntos, com entregas visíveis e espaço para ajustar.',
    icon: Code2,
    deliverable: 'Produto para experimentar',
  },
  {
    id: '04',
    title: 'Evoluir',
    description:
      'Depois do lançamento, observamos o uso e organizamos os próximos passos do produto.',
    icon: Rocket,
    deliverable: 'Novas possibilidades',
  },
]
const showcases = [
  {
    name: 'Workspace',
    category: 'SISTEMA DE GESTÃO',
    title: 'Menos planilhas. Mais clareza.',
    description:
      'Um conceito de painel para reunir projetos, prioridades e o trabalho da equipe em um só lugar.',
    type: 'Dashboard',
    tags: ['Aplicação web', 'Design de produto'],
  },
  {
    name: 'Orbit',
    category: 'PRODUTO DIGITAL',
    title: 'Uma ideia que vira experiência.',
    description:
      'Um conceito de produto SaaS com uma jornada simples, do primeiro acesso ao uso diário.',
    type: 'SaaS',
    tags: ['Produto digital', 'Experiência do usuário'],
  },
  {
    name: 'Studio',
    category: 'PRESENÇA DIGITAL',
    title: 'Sua marca no lugar certo.',
    description:
      'Um conceito de site que conecta posicionamento, apresentação de serviços e uma próxima ação clara.',
    type: 'Website',
    tags: ['Landing page', 'Desenvolvimento web'],
  },
]
const faqs = [
  {
    question: 'Tenho apenas uma ideia. Por onde começo?',
    answer:
      'Comece organizando o problema que você quer resolver, quem vai usar a solução e qual seria a primeira função essencial. O briefing desta página ajuda a colocar essas informações no papel.',
  },
  {
    question: 'É possível começar com uma versão pequena?',
    answer:
      'Sim. Uma primeira versão pode focar em uma jornada principal. Isso permite testar a experiência antes de investir em mais funcionalidades.',
  },
  {
    question: 'Vocês criam sites ou também sistemas?',
    answer:
      'Esta proposta reúne presença digital, aplicações web e produtos SaaS. O escopo deve ser definido a partir da necessidade de cada projeto.',
  },
  {
    question: 'Como são definidos prazo e investimento?',
    answer:
      'Prazo e investimento dependem das funcionalidades, integrações e complexidade. O primeiro passo é definir o que a versão inicial precisa entregar.',
  },
  {
    question: 'Como funciona o próximo passo?',
    answer:
      'Clique em “Começar meu projeto”, preencha um briefing e baixe o arquivo. Nesta versão local, nenhum dado é enviado para uma equipe ou serviço externo.',
  },
]

function ProjectShowcase() {
  const [selected, setSelected] = useState(0)
  const showcase = showcases[selected]
  return (
    <section id="projetos" className="section section-showcase">
      <div className="container">
        <SectionHeading
          label="POSSIBILIDADES"
          title={
            <>
              Ideias diferentes.
              <br />
              <span>O mesmo cuidado ao construir.</span>
            </>
          }
          text="Explore algumas direções que um projeto digital pode tomar."
        />
        <div className="showcase-tabs" role="group" aria-label="Escolher exemplo de projeto">
          {showcases.map((item, index) => (
            <button
              key={item.name}
              aria-pressed={selected === index}
              className={selected === index ? 'selected' : ''}
              onClick={() => setSelected(index)}
            >
              {item.type}
              <ArrowUpRight size={14} />
            </button>
          ))}
        </div>
        <div className={`showcase-card showcase-${selected}`}>
          <div className="product-preview">
            <div className="preview-window-top">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>{showcase.name.toLowerCase()}.app / overview</span>
              <ShieldCheck size={13} />
            </div>
            <div className="preview-app">
              <aside className="preview-sidebar">
                <span className="preview-logo">
                  <Layers size={17} />
                  {showcase.name.toLowerCase()}
                  <b>.</b>
                </span>
                <span className="preview-nav active">
                  <Monitor size={13} />
                  Visão geral
                </span>
                <span className="preview-nav">
                  <Layers size={13} />
                  Projetos
                </span>
                <span className="preview-nav">
                  <Workflow size={13} />
                  Atividades
                </span>
                <span className="preview-nav">
                  <GitBranch size={13} />
                  Equipe
                </span>
                <span className="preview-avatar">
                  JD{' '}
                  <span>
                    João Demo<small>Meu espaço</small>
                  </span>
                </span>
              </aside>
              <div className="preview-content">
                <div className="preview-title">
                  <div>
                    <span>SEU ESPAÇO, ORGANIZADO</span>
                    <h4>{selected === 2 ? 'Sua próxima experiência.' : 'Tudo sob controle.'}</h4>
                  </div>
                  <span className="preview-user">JD</span>
                </div>
                <div className="preview-stats">
                  {[
                    { value: '12', label: 'Projetos' },
                    { value: '08', label: 'Em andamento' },
                    { value: '04', label: 'Concluídos' },
                  ].map((item) => (
                    <div key={item.label}>
                      <span>{item.label}</span>
                      <strong>
                        {item.value}
                        <span>↗</span>
                      </strong>
                      <small>Dados ilustrativos</small>
                    </div>
                  ))}
                </div>
                <div className="preview-chart">
                  <div>
                    <strong>Visão do projeto</strong>
                    <span>
                      Esta semana <ChevronDown size={10} />
                    </span>
                  </div>
                  <div className="chart-bars">
                    {[35, 52, 42, 68, 57, 83, 74, 95, 86, 100, 91, 110].map((height, index) => (
                      <span key={index} style={{ height: `${height}px` }} />
                    ))}
                  </div>
                  <div className="chart-labels">
                    <span>SEG</span>
                    <span>TER</span>
                    <span>QUA</span>
                    <span>QUI</span>
                    <span>SEX</span>
                    <span>SÁB</span>
                  </div>
                </div>
                <div className="preview-task">
                  <span>
                    <CheckCircle2 size={14} />
                    Primeira entrega
                  </span>
                  <span className="task-status">Concluída</span>
                </div>
              </div>
            </div>
            <span className="concept-label">Interface conceitual · dados fictícios</span>
          </div>
          <div className="showcase-copy">
            <span className="eyebrow">{showcase.category}</span>
            <h3>{showcase.title}</h3>
            <p>{showcase.description}</p>
            <div className="showcase-tags">
              {showcase.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="showcase-index">
              0{selected + 1}
              <span> / 03</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [briefOpen, setBriefOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const openBrief = () => {
    setMenuOpen(false)
    setBriefOpen(true)
  }
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="announcement">
        <span>Uma nova ideia merece um novo começo.</span>
        <a href="#solucoes">
          Conheça as possibilidades <ArrowRight size={13} />
        </a>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav
            className={menuOpen ? 'main-nav nav-open' : 'main-nav'}
            aria-label="Navegação principal"
          >
            <a href="#inicio" onClick={() => setMenuOpen(false)}>
              Início
            </a>
            <a href="#solucoes" onClick={() => setMenuOpen(false)}>
              Soluções
            </a>
            <a href="#processo" onClick={() => setMenuOpen(false)}>
              Como fazemos
            </a>
            <a href="#projetos" onClick={() => setMenuOpen(false)}>
              Projetos
            </a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>
              Sobre
            </a>
            <button className="mobile-nav-cta" onClick={openBrief}>
              Começar meu projeto <ArrowUpRight size={15} />
            </button>
          </nav>
          <button className="button button-primary header-cta" onClick={openBrief}>
            Vamos conversar <ArrowUpRight size={15} />
          </button>
          <button
            className="menu-button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="hero-glow" />
          <div className="container hero-content">
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              ESTRATÉGIA, DESIGN E TECNOLOGIA.
            </div>
            <h1>
              Da sua próxima ideia
              <br />
              <span>ao próximo grande passo.</span>
            </h1>
            <p>
              Conectamos visão de negócio, design e desenvolvimento
              <br className="desktop-break" /> para transformar o que você imagina em uma
              experiência real.
            </p>
            <div className="hero-buttons">
              <button className="button button-primary" onClick={openBrief}>
                Começar meu projeto <ArrowUpRight size={17} />
              </button>
              <a className="button button-secondary" href="#solucoes">
                Encontrar minha solução <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-reassurance">
              <span>
                <CheckCircle2 size={14} />
                Clareza em cada etapa.
              </span>
              <i />
              <span>Da primeira conversa à próxima entrega.</span>
            </div>
            <FlowComparison />
            <div className="capabilities-strip">
              <span>UMA BASE. NOVAS POSSIBILIDADES.</span>
              <div>
                <span>
                  <Globe size={17} />
                  Sites & landing pages
                </span>
                <span>
                  <Layers size={17} />
                  Produtos digitais
                </span>
                <span>
                  <Code2 size={17} />
                  Sistemas web
                </span>
                <span>
                  <Sparkles size={17} />
                  Automações & IA
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="solucoes" className="section solutions-section">
          <div className="container">
            <SectionHeading
              label="O QUE PODEMOS CONSTRUIR"
              title={
                <>
                  Sua visão ganha forma.
                  <br />
                  <span>A tecnologia conecta as peças.</span>
                </>
              }
              text="Cada projeto tem um ponto de partida. Encontre a solução que faz sentido para o seu momento."
            />
            <div className="solutions-grid">
              {solutions.map(({ id, title, tag, text, icon: Icon, items }) => (
                <article className="solution-card" key={id}>
                  <div className="solution-card-top">
                    <span className="service-icon">
                      <Icon size={24} strokeWidth={1.5} />
                    </span>
                    <span className="solution-number">{id}</span>
                  </div>
                  <span className="service-tag">{tag}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>
                        <Check size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={openBrief}>
                    Explorar esta solução <ArrowUpRight size={16} />
                  </button>
                </article>
              ))}
            </div>
            <div className="solution-help">
              <span>
                <Lightbulb size={18} />
                Ainda não sabe por onde começar? Organize a sua ideia com a gente.
              </span>
              <button onClick={openBrief}>
                Encontrar meu próximo passo <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
        <section id="processo" className="section process-section">
          <div className="container">
            <div className="split-heading">
              <SectionHeading
                label="DO CONTEXTO À CONSTRUÇÃO"
                title={
                  <>
                    Um caminho claro.
                    <br />
                    <span>Sem pular etapas.</span>
                  </>
                }
                text="Você acompanha o que está sendo construído, entende as decisões e participa do próximo passo."
              />
              <span className="process-stamp">
                <span className="stamp-dot" />
                VISÃO + EXECUÇÃO
              </span>
            </div>
            <div className="process-grid">
              {steps.map(({ id, title, description, icon: Icon, deliverable }) => (
                <article className="process-step" key={id}>
                  <div className="step-top">
                    <span>{id}</span>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="step-deliverable">
                    <CheckCircle2 size={13} />
                    {deliverable}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ProjectShowcase />
        <section id="sobre" className="section about-section">
          <div className="container about-grid">
            <div>
              <SectionHeading
                label="POR QUE NEWTHING"
                title={
                  <>
                    O próximo passo
                    <br />é melhor <span>em parceria.</span>
                  </>
                }
                text="Um projeto digital vai além do código. Ele precisa de boas perguntas, decisões claras e pessoas que cuidam do caminho inteiro."
              />
              <button className="button button-secondary" onClick={openBrief}>
                Conte a sua ideia <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="principles">
              {[
                {
                  icon: Target,
                  title: 'O problema vem primeiro.',
                  text: 'A tecnologia é escolhida para a sua necessidade. A construção começa pelo que realmente importa.',
                },
                {
                  icon: Workflow,
                  title: 'As peças trabalham juntas.',
                  text: 'Estratégia, experiência e engenharia caminham na mesma direção, desde o início.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Clareza para seguir em frente.',
                  text: 'Etapas definidas, decisões compartilhadas e espaço para evoluir conforme o projeto aprende.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <div className="principle" key={title}>
                  <span>
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="duvidas" className="section faq-section">
          <div className="container faq-grid">
            <SectionHeading
              label="PERGUNTAS FREQUENTES"
              title={
                <>
                  Antes de começar,
                  <br />
                  <span>vamos esclarecer.</span>
                </>
              }
              text="Algumas respostas para tirar a primeira ideia do papel com mais confiança."
            />
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  className={`faq-item ${openFaq === index ? 'faq-open' : ''}`}
                  key={faq.question}
                >
                  <h3>
                    <button
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      {faq.question}
                      <span>{openFaq === index ? '−' : '+'}</span>
                    </button>
                  </h3>
                  <div id={`faq-answer-${index}`} hidden={openFaq !== index}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="final-cta">
          <div className="cta-glow" />
          <div className="container">
            <span className="eyebrow">VAMOS DAR O PRIMEIRO PASSO?</span>
            <h2>
              O próximo grande projeto
              <br />
              pode começar <span>com uma conversa.</span>
            </h2>
            <p>Conte o que você imagina. Vamos organizar o caminho.</p>
            <button className="button button-primary" onClick={openBrief}>
              Começar meu projeto <ArrowUpRight size={18} />
            </button>
            <span className="cta-note">
              <Zap size={13} />
              Uma ideia. Um começo. Novas possibilidades.
            </span>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand small />
              <p>
                Novas ideias. Produtos com propósito.
                <br />
                Estratégia, design e tecnologia conectados.
              </p>
            </div>
            <div className="footer-links">
              <a href="#solucoes">Soluções</a>
              <a href="#processo">Como fazemos</a>
              <a href="#projetos">Projetos</a>
              <a href="#duvidas">Dúvidas</a>
            </div>
            <a className="back-top" href="#inicio">
              Voltar ao início <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Newthing. Projeto de demonstração.</span>
            <span>Feito para transformar ideias.</span>
          </div>
        </div>
      </footer>
      {briefOpen && <BriefModal onClose={() => setBriefOpen(false)} />}
    </>
  )
}
