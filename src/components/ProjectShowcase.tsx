import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  Command,
  CreditCard,
  Globe,
  LayoutDashboard,
  Layers,
  Link2,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import './ProjectShowcase.css'

const projects = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    brand: 'Workspace',
    address: 'workspace.demo / visao-geral',
    category: 'INTELIGÊNCIA PARA A OPERAÇÃO',
    title: 'Seu negócio, em perspectiva.',
    description:
      'Indicadores, resultados e prioridades reunidos em uma visão clara. Um painel desenhado para transformar dados em boas decisões.',
    features: [
      'Indicadores em tempo real',
      'Relatórios e visualização de dados',
      'Gestão de equipes e resultados',
    ],
    detail: 'Para acompanhar, analisar e decidir.',
    number: '01',
  },
  {
    id: 'saas',
    label: 'SaaS',
    icon: Workflow,
    brand: 'Orbit',
    address: 'app.orbit.demo / automacoes',
    category: 'UM PRODUTO QUE TRABALHA COM VOCÊ',
    title: 'Menos tarefas. Mais possibilidades.',
    description:
      'Uma plataforma com uma experiência própria. Fluxos conectados, automações inteligentes e uma jornada que simplifica o trabalho de cada dia.',
    features: [
      'Fluxos e automações conectados',
      'Áreas de trabalho personalizadas',
      'Experiência de produto por assinatura',
    ],
    detail: 'Para usar, automatizar e evoluir.',
    number: '02',
  },
  {
    id: 'website',
    label: 'Website',
    icon: Globe,
    brand: 'Forma',
    address: 'forma.demo / studio',
    category: 'UMA PRESENÇA QUE TEM PERSONALIDADE',
    title: 'Uma marca que você sente.',
    description:
      'Design editorial, narrativa e uma presença digital memorável. Um site que apresenta o que torna a sua marca única e conduz à próxima conversa.',
    features: [
      'Identidade visual e direção de arte',
      'Narrativa e apresentação de serviços',
      'Experiência fluida em qualquer tela',
    ],
    detail: 'Para apresentar, conectar e converter.',
    number: '03',
  },
] as const

function DashboardPreview() {
  return (
    <div
      className="concept-dashboard concept-canvas"
      role="img"
      aria-label="Dashboard Workspace: painel claro com menu lateral azul, indicadores de receita e conversão, gráfico de evolução e lista de projetos. Dados ilustrativos."
    >
      <div className="dash-sidebar" aria-hidden="true">
        <div className="dash-brand">
          <span>
            <Layers />
          </span>
          workspace<b>.</b>
        </div>
        <span className="dash-menu-label">MEU ESPAÇO</span>
        <span className="dash-menu active">
          <LayoutDashboard />
          Visão geral
        </span>
        <span className="dash-menu">
          <Layers />
          Projetos<span>12</span>
        </span>
        <span className="dash-menu">
          <Users />
          Clientes
        </span>
        <span className="dash-menu">
          <CreditCard />
          Financeiro
        </span>
        <div className="dash-sidebar-bottom">
          <span className="dash-menu">
            <Settings2 />
            Configurações
          </span>
          <div className="dash-person">
            <span>AC</span>
            <div>
              Ana Costa<small>Administradora</small>
            </div>
            <ChevronDown />
          </div>
        </div>
      </div>
      <div className="dash-main" aria-hidden="true">
        <div className="dash-topbar">
          <span>
            Meu espaço <span>/</span> Visão geral
          </span>
          <div>
            <Search />
            <Bell />
            <span>AC</span>
          </div>
        </div>
        <div className="dash-page">
          <div className="dash-heading">
            <div>
              <span>QUARTA-FEIRA, 14 DE OUTUBRO</span>
              <strong>Uma visão mais clara do seu negócio.</strong>
              <small>Os números certos para o seu próximo passo.</small>
            </div>
            <span className="dash-period">
              Este mês <ChevronDown />
            </span>
          </div>
          <div className="dash-metrics">
            {[
              {
                label: 'Receita do mês',
                value: 'R$ 48.750',
                change: '+12,8%',
                bars: [3, 5, 4, 7, 6, 8],
              },
              {
                label: 'Taxa de conversão',
                value: '8,4%',
                change: '+2,1%',
                bars: [3, 4, 3, 5, 7, 8],
              },
              { label: 'Novos clientes', value: '128', change: '+18,4%', bars: [2, 4, 5, 4, 6, 9] },
            ].map((metric) => (
              <div className="dash-metric" key={metric.label}>
                <span>
                  {metric.label}
                  <MoreHorizontal />
                </span>
                <strong>{metric.value}</strong>
                <div>
                  <small>
                    {metric.change} <span>vs. mês anterior</span>
                  </small>
                  <span className="metric-spark">
                    {metric.bars.map((height, index) => (
                      <i key={index} style={{ height: `${height * 2}px` }} />
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="dash-analytics">
            <div className="dash-chart">
              <div className="mock-card-title">
                <strong>Evolução da receita</strong>
                <span>
                  <i />
                  Receita
                </span>
              </div>
              <div className="dash-chart-body">
                <div className="chart-y">
                  <span>60 mil</span>
                  <span>40 mil</span>
                  <span>20 mil</span>
                  <span>0</span>
                </div>
                <div className="dash-chart-plot">
                  <svg viewBox="0 0 340 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="dashboard-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5385ed" stopOpacity=".24" />
                        <stop offset="100%" stopColor="#5385ed" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 80 C20 80 22 66 42 68 S70 83 90 57 S125 68 145 40 S180 55 202 32 S239 47 260 22 S300 30 340 7 L340 100 L0 100Z"
                      fill="url(#dashboard-area)"
                    />
                    <path
                      d="M0 80 C20 80 22 66 42 68 S70 83 90 57 S125 68 145 40 S180 55 202 32 S239 47 260 22 S300 30 340 7"
                      fill="none"
                      stroke="#4e7fea"
                      strokeWidth="2.4"
                    />
                  </svg>
                  <div className="chart-months">
                    <span>MAI</span>
                    <span>JUN</span>
                    <span>JUL</span>
                    <span>AGO</span>
                    <span>SET</span>
                    <span>OUT</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="dash-sources">
              <div className="mock-card-title">
                <strong>Origem dos clientes</strong>
                <MoreHorizontal />
              </div>
              <div className="source-ring">
                <span>
                  128<small>clientes</small>
                </span>
              </div>
              <div className="source-legend">
                <span>
                  <i />
                  Orgânico<b>64%</b>
                </span>
                <span>
                  <i />
                  Indicação<b>36%</b>
                </span>
              </div>
            </div>
          </div>
          <div className="dash-projects">
            <div className="mock-card-title">
              <strong>Projetos em destaque</strong>
              <span>
                Ver todos <ArrowUpRight />
              </span>
            </div>
            <div className="dash-project-row">
              <span className="project-initial blue-initial">N</span>
              <span>
                Nova identidade digital<small>Design & desenvolvimento</small>
              </span>
              <div className="mini-progress">
                <i />
              </div>
              <span className="mock-status">Em andamento</span>
            </div>
            <div className="dash-project-row">
              <span className="project-initial mint-initial">P</span>
              <span>
                Portal do cliente<small>Experiência de produto</small>
              </span>
              <div className="mini-progress">
                <i />
              </div>
              <span className="mock-status complete">Concluído</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SaasPreview() {
  return (
    <div
      className="concept-saas concept-canvas"
      role="img"
      aria-label="SaaS Orbit: plataforma escura com detalhes violeta, editor de automação conectando novo lead, inteligência artificial e CRM, com histórico de execuções. Dados ilustrativos."
    >
      <div className="orbit-nav" aria-hidden="true">
        <span className="orbit-brand">
          <span>
            <Command />
          </span>
          orbit<span className="orbit-pro">PRO</span>
        </span>
        <div className="orbit-workspace">
          Meu workspace <ChevronDown />
        </div>
        <div className="orbit-nav-right">
          <Bell />
          <span>AC</span>
        </div>
      </div>
      <div className="orbit-subnav" aria-hidden="true">
        <span className="active">
          <Workflow />
          Automações
        </span>
        <span>
          <Layers />
          Biblioteca
        </span>
        <span>
          <Link2 />
          Integrações
        </span>
        <span className="orbit-usage">
          <i />
          Seu workspace está conectado
        </span>
      </div>
      <div className="orbit-page" aria-hidden="true">
        <div className="orbit-heading">
          <div>
            <span>MENOS MANUAL. MAIS INTELIGENTE.</span>
            <strong>Seu trabalho, em outro ritmo.</strong>
            <small>Conecte as ferramentas. Deixe o fluxo acontecer.</small>
          </div>
          <span className="orbit-new">
            <Plus />
            Nova automação
          </span>
        </div>
        <div className="orbit-flow">
          <div className="orbit-flow-heading">
            <span>
              <span className="workflow-icon">
                <Zap />
              </span>
              <span>
                Qualificação de novos leads<small>Seu fluxo de aquisição, conectado.</small>
              </span>
            </span>
            <span className="orbit-live">
              <i />
              Ativa
            </span>
          </div>
          <div className="orbit-flow-canvas">
            <svg className="orbit-connectors" viewBox="0 0 600 160" preserveAspectRatio="none">
              <path d="M100 80 H500" />
              <path d="M100 80 H500" className="orbit-connector-glow" />
            </svg>
            <div className="orbit-flow-node">
              <span className="orbit-node-icon node-green">
                <Globe />
              </span>
              <strong>Novo lead</strong>
              <small>Formulário recebido</small>
              <span className="node-event">GATILHO</span>
            </div>
            <span className="flow-connector-arrow">
              <ArrowRight />
            </span>
            <div className="orbit-flow-node orbit-ai">
              <span className="orbit-node-icon node-purple">
                <Sparkles />
              </span>
              <strong>Qualificar com IA</strong>
              <small>Entender e organizar</small>
              <span className="node-event">INTELIGÊNCIA</span>
            </div>
            <span className="flow-connector-arrow">
              <ArrowRight />
            </span>
            <div className="orbit-flow-node">
              <span className="orbit-node-icon node-blue">
                <Users />
              </span>
              <strong>Atualizar CRM</strong>
              <small>Contato sincronizado</small>
              <span className="node-event">AÇÃO</span>
            </div>
          </div>
          <div className="orbit-flow-footer">
            <span>
              <CheckCircle2 />
              Todas as etapas configuradas
            </span>
            <span>
              Última edição há 5 min <MoreHorizontal />
            </span>
          </div>
        </div>
        <div className="orbit-bottom">
          <div className="orbit-runs">
            <div className="mock-card-title">
              <strong>Últimas execuções</strong>
              <span>
                Ver histórico <ArrowUpRight />
              </span>
            </div>
            {[
              { name: 'Lead #0428', time: 'Há 2 minutos', duration: '1,2 s' },
              { name: 'Lead #0427', time: 'Há 8 minutos', duration: '0,9 s' },
            ].map((run) => (
              <div className="orbit-run" key={run.name}>
                <span>
                  <CheckCircle2 />
                  {run.name}
                </span>
                <small>{run.time}</small>
                <span className="orbit-run-success">Concluída</span>
                <small>{run.duration}</small>
              </div>
            ))}
          </div>
          <div className="orbit-time">
            <span>
              <Zap />
              TEMPO RECUPERADO
            </span>
            <strong>
              12,5 <small>horas</small>
            </strong>
            <span>neste mês · exemplo ilustrativo</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function WebsitePreview() {
  return (
    <div
      className="concept-website concept-canvas"
      role="img"
      aria-label="Website Forma: site editorial em tons de marfim e verde, tipografia marcante, escultura geométrica, chamada de contato e portfólio de um estúdio criativo. Conceito ilustrativo."
    >
      <div className="forma-nav" aria-hidden="true">
        <span className="forma-brand">
          forma<span>®</span>
        </span>
        <div>
          <span>O estúdio</span>
          <span>Projetos</span>
          <span>
            Contato <ArrowUpRight />
          </span>
        </div>
      </div>
      <div className="forma-hero" aria-hidden="true">
        <div className="forma-copy">
          <span className="forma-eyebrow">
            <i />
            ESTÚDIO INDEPENDENTE DE DESIGN
          </span>
          <strong>
            Essência que
            <br />
            ganha <em>forma.</em>
          </strong>
          <p>
            Construímos identidades e experiências
            <br />
            para marcas que querem deixar sua marca.
          </p>
          <span className="forma-cta">
            Vamos criar algo novo <ArrowUpRight />
          </span>
          <span className="forma-scroll">
            <ArrowDown />
            ESTRATÉGIA. IDENTIDADE. EXPERIÊNCIA.
          </span>
        </div>
        <div className="forma-art">
          <span className="forma-art-caption">
            EXPLORAÇÃO Nº 003
            <br />
            <b>Equilíbrio em movimento.</b>
          </span>
          <div className="forma-sculpture">
            <span className="sculpture-shadow" />
            <span className="sculpture-block sculpture-base" />
            <span className="sculpture-block sculpture-middle" />
            <span className="sculpture-block sculpture-top" />
            <span className="sculpture-orb" />
          </div>
          <span className="forma-art-index">F / 03</span>
        </div>
      </div>
      <div className="forma-work" aria-hidden="true">
        <div>
          <span>IDEIAS COM INTENÇÃO.</span>
          <strong>
            Design para ser sentido.
            <br />E lembrado.
          </strong>
        </div>
        <div className="forma-project forma-project-one">
          <span className="forma-project-art">
            a<span>u</span>ra.
          </span>
          <div>
            <span>
              Aura Studio<small>Identidade & posicionamento</small>
            </span>
            <ArrowUpRight />
          </div>
        </div>
        <div className="forma-project forma-project-two">
          <span className="forma-project-art">
            <span className="forma-orbit-art" />
            norte.
          </span>
          <div>
            <span>
              Norte Digital<small>Website & experiência</small>
            </span>
            <ArrowUpRight />
          </div>
        </div>
      </div>
    </div>
  )
}

const previews = [DashboardPreview, SaasPreview, WebsitePreview]

export function ProjectShowcase() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const project = projects[selected]
  const Preview = previews[selected]

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % projects.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + projects.length) % projects.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = projects.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="projetos" className="section showroom-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">
            <span />
            POSSIBILIDADES
          </span>
          <h2>
            Ideias diferentes.
            <br />
            <span>O mesmo cuidado ao construir.</span>
          </h2>
          <p>
            Três experiências, três propósitos. Explore o que podemos construir para o seu negócio.
          </p>
        </div>
        <div className="showroom-toolbar">
          <div className="showroom-tabs" role="tablist" aria-label="Tipos de projeto">
            {projects.map((item, index) => (
              <button
                key={item.id}
                ref={(element) => {
                  tabs.current[index] = element
                }}
                id={`project-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls={`project-panel-${item.id}`}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => navigateTabs(event, index)}
              >
                <item.icon size={16} aria-hidden="true" />
                {item.label}
                <span className="showroom-tab-index">0{index + 1}</span>
              </button>
            ))}
          </div>
          <span className="showroom-hint">
            <span />
            Explore as experiências
          </span>
        </div>
        <div
          className={`showroom-card showroom-${project.id}`}
          id={`project-panel-${project.id}`}
          role="tabpanel"
          aria-labelledby={`project-tab-${project.id}`}
          tabIndex={0}
        >
          <div key={project.id} className="showroom-scene">
            <div className="showroom-visual">
              <div className="demo-window">
                <div className="demo-browser-bar">
                  <span className="demo-window-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>
                    <ShieldCheck />
                    {project.address}
                  </span>
                  <MoreHorizontal />
                </div>
                <Preview />
              </div>
              <div className="showroom-caption">
                <span className="concept-indicator" />
                Conceito de interface <span>·</span> Dados ilustrativos
              </div>
            </div>
            <div className="showroom-copy">
              <span className="showroom-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Check size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="showroom-copy-footer">
                <span>
                  <project.icon size={18} />
                  {project.detail}
                </span>
                <span className="showroom-counter">
                  {project.number}
                  <span> / 03</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <span className="showroom-announcement" role="status">
          Exibindo {project.label}: {project.title}
        </span>
      </div>
    </section>
  )
}
