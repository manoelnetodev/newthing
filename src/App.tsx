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
  Sparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import { SolutionsJourney } from './components/SolutionsJourney'
import { BriefModal } from './components/BriefModal'
import { ProjectShowcase } from './components/ProjectShowcase'
import { WhoWeAre } from './components/WhoWeAre'
import { SolutionFinder } from './components/SolutionFinder'
import { QuickFaq } from './components/QuickFaq'
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
  const [energyPlaying, setEnergyPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const nodes = [
    {
      label: 'Estratégia & finanças',
      pain: 'Planilhas soltas',
      icon: Compass,
      className: 'node-strategy',
    },
    {
      label: 'Experiência & design',
      pain: 'Retrabalho manual',
      icon: MousePointer2,
      className: 'node-design',
    },
    {
      label: 'Sistemas sob medida',
      pain: 'Sistemas desconectados',
      icon: Code2,
      className: 'node-code',
    },
    {
      label: 'Automação & IA',
      pain: 'Decisões no escuro',
      icon: Workflow,
      className: 'node-integrations',
    },
  ]
  return (
    <div className="comparison-grid" data-energy-motion={energyPlaying ? 'running' : 'paused'}>
      <div className="flow-card scattered-card">
        <div className="flow-card-top">
          <span>Quando a operação fica fragmentada</span>
          <span className="flow-badge muted-red">
            <i />
            Mais ruído
          </span>
        </div>
        <div
          className="flow-diagram scattered-diagram"
          role="img"
          aria-label="Planilhas soltas, retrabalho manual, sistemas desconectados e decisões sem contexto"
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
          {nodes.map(({ label, pain, icon: Icon, className }) => (
            <span className={`diagram-node ${className}`} key={label}>
              <Icon size={15} />
              {pain}
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
          aria-label="A Newthing conecta estratégia e finanças, experiência e design, sistemas sob medida e automação"
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
    title: 'Escopo antes da execução',
    description:
      'Objetivo, funcionalidades, integrações e critérios de entrega são alinhados antes de começar. Você entende o que será construído e o que precisa fornecer.',
    icon: Compass,
    deliverable: 'Entregas e prioridades definidas',
  },
  {
    id: '02',
    title: 'Entregas para você validar',
    description:
      'Protótipos e demonstrações tornam a construção visível. Os pontos de acompanhamento são combinados conforme o projeto, com espaço para seu retorno.',
    icon: Layers,
    deliverable: 'Validação nas etapas combinadas',
  },
  {
    id: '03',
    title: 'Decisões com contexto',
    description:
      'Explicamos alternativas e registramos prioridades. Quando surge uma nova demanda, alinhamos seu impacto no escopo, no prazo e no investimento antes de avançar.',
    icon: Code2,
    deliverable: 'Mudanças avaliadas em conjunto',
  },
  {
    id: '04',
    title: 'Continuidade definida',
    description:
      'A entrega inclui o que foi combinado para começar a usar a solução. Suporte, manutenção e novas funcionalidades têm responsabilidades e condições alinhadas.',
    icon: Rocket,
    deliverable: 'Orientações e próximos passos claros',
  },
]
const faqs = [
  {
    question: 'Tenho apenas uma ideia. Por onde começo?',
    phase: 0,
    answer: [
      'Você não precisa chegar com um projeto pronto ou saber qual tecnologia usar. Conte o que deseja conquistar, o que dificulta sua rotina hoje e quem será beneficiado. Nosso trabalho começa pela escuta: entender o seu contexto antes de propor uma solução.',
      'A partir disso, organizamos os objetivos, identificamos o que precisa ser construído primeiro e desenhamos um caminho de projeto. Se a ideia ainda estiver aberta, podemos usar exemplos de telas e fluxos para tornar as possibilidades mais concretas.',
    ],
    outcome:
      'Sua ideia ganha uma direção: problema definido, prioridades e um primeiro escopo para avaliar com clareza.',
  },
  {
    question: 'É possível começar com uma versão pequena?',
    phase: 1,
    answer: [
      'Sim. Começar com o essencial pode ser uma decisão estratégica. Definimos uma primeira versão que resolva uma necessidade real, com uma experiência completa para essa finalidade e espaço para evoluir.',
      'Por exemplo: um sistema pode começar com cadastro de clientes e controle de pedidos; um site, com apresentação dos serviços e um caminho claro até o contato. Depois de observar o uso e ouvir você, priorizamos as próximas funcionalidades.',
    ],
    outcome:
      'Você investe primeiro no que tem mais importância para o seu momento e decide os próximos passos com base na experiência real.',
  },
  {
    question: 'Vocês criam sites ou também sistemas?',
    phase: 1,
    answer: [
      'Criamos sites, landing pages, sistemas de gestão, portais e aplicações web sob medida. Também desenvolvemos automações e integrações para conectar ferramentas e organizar processos da empresa.',
      'A escolha depende do que você precisa alcançar. Apresentar seus serviços pode pedir um site; acompanhar pedidos e equipes pode pedir um sistema; reduzir tarefas repetitivas pode pedir uma automação. Explicamos as alternativas e definimos a solução com você.',
    ],
    outcome:
      'O ponto de partida é o seu objetivo. A tecnologia e as funcionalidades são escolhidas para atender a ele.',
  },
  {
    question: 'Como são definidos prazo e investimento?',
    phase: 1,
    answer: [
      'Primeiro, entendemos o objetivo e detalhamos as entregas: telas, funcionalidades, integrações, conteúdos e necessidades de implantação. Esse levantamento permite estimar o esforço e propor um cronograma coerente com o escopo.',
      'Antes de iniciar a construção, alinhamos o que está incluído, as etapas, o investimento e as responsabilidades de cada lado. Hospedagem, serviços externos e acompanhamento também precisam ficar claros. Se surgir uma nova necessidade, avaliamos juntos o impacto antes de ampliar o projeto.',
    ],
    outcome:
      'Você decide com uma visão clara do que está contratando, do que precisa fornecer e de como cada etapa será acompanhada.',
  },
  {
    question: 'Como participo do projeto sem entender de tecnologia?',
    phase: 2,
    answer: [
      'Você conhece o seu negócio; nós cuidamos de traduzir essa realidade em uma solução digital. Explicamos as decisões em uma linguagem clara e usamos referências, protótipos e demonstrações para que você consiga visualizar o que está sendo construído.',
      'Nos momentos de validação, você confere os fluxos, experimenta as funcionalidades e compartilha o que precisa de ajuste. As prioridades e os pontos de acompanhamento são combinados no planejamento, para que a participação seja organizada e as decisões tenham contexto.',
    ],
    outcome:
      'Você participa com a sua experiência, entende o andamento e valida a solução antes de avançarmos para as próximas entregas.',
  },
  {
    question: 'E depois da entrega? Vocês continuam acompanhando?',
    phase: 3,
    answer: [
      'A entrega precisa preparar você para usar a solução. Por isso, o projeto deve prever a validação final, as orientações de uso e os cuidados necessários para colocar o site ou sistema em operação.',
      'O acompanhamento após o lançamento é definido conforme a necessidade e o escopo contratado: suporte, manutenção, monitoramento ou evolução de funcionalidades. Alinhamos os canais, o período e o que está coberto, distinguindo correções de novas demandas. Assim, você sabe como pedir ajuda e como planejar melhorias.',
    ],
    outcome:
      'A continuidade é planejada com transparência, com responsabilidades claras para o cuidado e a evolução da solução.',
  },
  {
    question: 'Já uso ferramentas na empresa. Preciso trocar tudo?',
    phase: 2,
    answer: [
      'Nem sempre. Antes de propor uma mudança, entendemos o que já funciona, onde há retrabalho e quais informações precisam circular entre as ferramentas. Muitas vezes, conectar etapas ou automatizar uma tarefa é mais adequado do que substituir toda a operação.',
      'Avaliamos as possibilidades de integração, as permissões de acesso, a qualidade dos dados e as limitações dos serviços envolvidos. Quando uma integração não for viável, explicamos o motivo e discutimos alternativas, incluindo uma transição por etapas quando fizer sentido.',
    ],
    outcome:
      'A proposta considera a sua estrutura atual e o impacto na rotina da equipe, com mudanças que tenham uma razão clara para existir.',
  },
  {
    question: 'Como dou o primeiro passo por aqui?',
    phase: 0,
    answer: [
      'Use “Preparar meu briefing” para registrar seu objetivo, o momento do projeto e o que você gostaria de melhorar. Pode escrever com suas próprias palavras; não é necessário usar termos técnicos.',
      'Você recebe um plano preliminar com uma estrutura a avaliar e prioridades para a primeira versão. Revise, copie ou baixe o resumo. Se quiser conversar com a equipe, abra o WhatsApp com a mensagem preenchida e confirme o envio por lá. O plano ainda será validado com você; preencher não gera contratação.',
    ],
    outcome:
      'Você sai com o ponto de partida organizado e um resumo do que deseja construir, pronto para uma conversa mais objetiva.',
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
          <div className="container">
            <div className="hero-opening">
              <div className="hero-content">
                <div className="hero-eyebrow">
                  <span className="pulse-dot" />
                  SITES, SISTEMAS E AUTOMAÇÕES.
                </div>
                <h1>
                  Sua ideia merece
                  <span>acontecer de verdade.</span>
                </h1>
                <p>
                  Menos planilhas espalhadas, atendimento sem contexto e ferramentas desconectadas.
                  Criamos sites, sistemas e automações para organizar a rotina e dar forma ao que
                  você quer realizar.
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
                    Escopo claro
                  </span>
                  <span>
                    <CheckCircle2 size={14} />
                    Você acompanha
                  </span>
                  <span>
                    <CheckCircle2 size={14} />
                    Evolução planejada
                  </span>
                </div>
                <a className="hero-scroll-invitation" href="#solucoes">
                  <span>
                    <ArrowRight size={12} style={{ transform: 'rotate(90deg)' }} />
                  </span>
                  Veja como uma ideia se transforma em solução
                </a>
              </div>
            </div>
            <div className="hero-connection-intro">
              <span>ESTRATÉGIA, DESIGN E CÓDIGO NA MESMA DIREÇÃO.</span>
              <p>Quando as partes se conectam, o caminho fica mais claro.</p>
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
        <ProjectShowcase />
        <SolutionsJourney
          key={journeyRequest.id}
          initialExample={journeyRequest.exampleIndex}
          initialPhase={journeyRequest.phase}
        />
        <section id="processo" className="section process-section">
          <div className="container">
            <div className="split-heading">
              <SectionHeading
                label="COMO TRABALHAMOS NA PRÁTICA"
                title={
                  <>
                    Você acompanha a construção.
                    <br />
                    <span>As decisões ficam claras.</span>
                  </>
                }
                text="Quatro compromissos que organizam o trabalho e tornam a parceria mais previsível, da definição do escopo à continuidade."
              />
              <span className="process-stamp">
                <span className="stamp-dot" />
                CLAREZA + RESPONSABILIDADE
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
        <WhoWeAre onContact={openBrief} />
        <QuickFaq faqs={faqs} onBrief={openBrief} />
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
            <span>
              © {new Date().getFullYear()} Newthing. Tecnologia, estratégia e sistemas sob medida.
            </span>
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
