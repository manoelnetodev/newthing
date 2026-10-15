import { useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Compass,
  Globe,
  Layers,
  Lightbulb,
  Menu,
  MousePointer2,
  Pause,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import { SolutionsJourney } from './components/SolutionsJourney'
import { BriefModal } from './components/BriefModal'
import { ProjectShowcase } from './components/ProjectShowcase'
import { WhoWeAre } from './components/WhoWeAre'
import { SolutionFinder } from './components/SolutionFinder'
import './components/FlowComparisonMotion.css'

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
  const [energyPlaying, setEnergyPlaying] = useState(true)
  const nodes = [
    { label: 'Estratégia', icon: Compass, className: 'node-strategy' },
    { label: 'Design', icon: MousePointer2, className: 'node-design' },
    { label: 'Código', icon: Code2, className: 'node-code' },
    { label: 'Integrações', icon: Workflow, className: 'node-integrations' },
  ]
  return (
    <div className="comparison-grid" data-energy-motion={energyPlaying ? 'running' : 'paused'}>
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
          <svg
            className="flow-lines"
            viewBox="0 0 500 215"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M100 55 Q220 170 395 65 M130 160 Q280 20 380 165 M100 55 L130 160 M395 65 L380 165" />
            <path
              className="comparison-noise-energy"
              pathLength={100}
              d="M100 55 Q220 170 395 65"
            />
            <path
              className="comparison-noise-energy alternate"
              pathLength={100}
              d="M130 160 Q280 20 380 165"
            />
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
          <div className="flow-card-actions">
            <span className="flow-badge blue-badge">
              <i />
              Uma direção
            </span>
            <button
              type="button"
              className="comparison-motion-toggle"
              aria-label={
                energyPlaying ? 'Pausar energia do diagrama' : 'Continuar energia do diagrama'
              }
              aria-pressed={!energyPlaying}
              onClick={() => setEnergyPlaying((playing) => !playing)}
            >
              {energyPlaying ? <Pause size={11} /> : <Play size={11} />}
            </button>
          </div>
        </div>
        <div
          className="flow-diagram connected-diagram"
          role="img"
          aria-label="Newthing conecta estratégia, design, código e integrações em um único projeto"
        >
          <svg
            className="flow-lines"
            viewBox="0 0 500 215"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M115 60 L250 107 L385 60 M125 165 L250 107 L375 165" />
            <circle cx="250" cy="107" r="70" />
            <path
              className="comparison-energy energy-strategy"
              pathLength={100}
              d="M115 60 L250 107"
            />
            <path
              className="comparison-energy energy-design"
              pathLength={100}
              d="M250 107 L385 60"
            />
            <path
              className="comparison-energy energy-code"
              pathLength={100}
              d="M125 165 L250 107"
            />
            <path
              className="comparison-energy energy-integrations"
              pathLength={100}
              d="M250 107 L375 165"
            />
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [briefOpen, setBriefOpen] = useState(false)
  const [finderOpen, setFinderOpen] = useState(false)
  const [journeyRequest, setJourneyRequest] = useState({ exampleIndex: 0, phase: 0, id: 0 })
  const finderTrigger = useRef<HTMLButtonElement>(null)
  const returnBriefToFinder = useRef(false)
  const [briefContext, setBriefContext] = useState<{ stage?: string; project?: string }>({})
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const openBrief = () => {
    returnBriefToFinder.current = false
    setMenuOpen(false)
    setBriefContext({})
    setBriefOpen(true)
  }
  const openBriefForGoal = (goal: string, stage: string) => {
    returnBriefToFinder.current = finderOpen
    setFinderOpen(false)
    setMenuOpen(false)
    setBriefContext({ stage, project: `Meu objetivo: ${goal}\n\nHoje, meu maior desafio é: ` })
    setBriefOpen(true)
  }
  const closeBrief = () => {
    setBriefOpen(false)
    if (returnBriefToFinder.current) {
      requestAnimationFrame(() => finderTrigger.current?.focus({ preventScroll: true }))
    }
  }
  const viewRecommendedExample = (exampleIndex: number, phase: number) => {
    setFinderOpen(false)
    setJourneyRequest((previous) => ({ exampleIndex, phase, id: previous.id + 1 }))
    window.history.pushState(null, '', '#solucoes')
    requestAnimationFrame(() => {
      document.getElementById('journey-detail-content')?.focus({ preventScroll: true })
      document.getElementById('journey-practice')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      })
    })
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
            <a href="#quem-somos" onClick={() => setMenuOpen(false)}>
              Quem somos
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
              <button
                type="button"
                className="button button-secondary hero-finder"
                ref={finderTrigger}
                onClick={() => setFinderOpen(true)}
                aria-haspopup="dialog"
              >
                <Compass size={18} />
                <span>
                  <strong>Descobrir meu caminho</strong>
                  <small>2 perguntas para orientar seu projeto</small>
                </span>
                <ArrowRight size={15} />
              </button>
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
        <SolutionsJourney
          key={journeyRequest.id}
          initialExample={journeyRequest.exampleIndex}
          initialPhase={journeyRequest.phase}
        />
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
        <WhoWeAre onContact={openBrief} onStartProject={openBriefForGoal} />
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
              <a href="#quem-somos">Quem somos</a>
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
      {finderOpen && (
        <SolutionFinder
          onClose={() => setFinderOpen(false)}
          onViewExample={viewRecommendedExample}
          onStartProject={openBriefForGoal}
        />
      )}
      {briefOpen && (
        <BriefModal
          onClose={closeBrief}
          initialStage={briefContext.stage}
          initialProject={briefContext.project}
        />
      )}
    </>
  )
}
