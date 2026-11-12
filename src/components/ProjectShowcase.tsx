import { useEffect, useRef, useState } from 'react'
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
  Sparkles,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import './ProjectShowcase.css'
import { DevicePreview } from './DevicePreview'
import { previewDevices } from './previewDevices'
import type { PreviewDevice } from './previewDevices'
import { Modal } from './ui'
import './ShowroomExplorer.css'
import { PreviewSectionContent } from './PreviewSectionContent'
import { previewSectionLabels } from './previewSections'
import type { PreviewSection } from './previewSections'
import './DashboardInteractions.css'
import './ExampleInteractions.css'

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

function DashboardPreview({
  section,
  onNavigate,
}: {
  section: PreviewSection
  onNavigate: (section: PreviewSection) => void
}) {
  const [period, setPeriod] = useState(0)
  const [noticesOpen, setNoticesOpen] = useState(false)
  const reports = [
    {
      label: 'Este mês',
      revenue: 'R$ 48.750',
      conversion: '8,4%',
      clients: '128',
      growth: ['+12,8%', '+2,1%', '+18,4%'],
      trend:
        'M0 80 C20 80 22 66 42 68 S70 83 90 57 S125 68 145 40 S180 55 202 32 S239 47 260 22 S300 30 340 7',
      months: ['MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT'],
    },
    {
      label: 'Mês anterior',
      revenue: 'R$ 43.218',
      conversion: '6,3%',
      clients: '108',
      growth: ['+9,2%', '+1,4%', '+12,5%'],
      trend:
        'M0 90 C20 90 22 82 42 76 S70 72 90 65 S125 79 145 53 S180 62 202 43 S239 58 260 35 S300 40 340 24',
      months: ['ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET'],
    },
    {
      label: 'Últimos 3 meses',
      revenue: 'R$ 131.568',
      conversion: '7,6%',
      clients: '332',
      growth: ['+24,6%', '+3,2%', '+26,1%'],
      trend:
        'M0 94 C20 92 22 70 42 76 S70 48 90 52 S125 62 145 32 S180 51 202 25 S239 34 260 15 S300 25 340 4',
      months: ['AGO', 'SET', 'OUT'],
    },
  ]
  const report = reports[period]
  return (
    <div
      className="concept-dashboard concept-canvas"
      role="region"
      aria-label={`Dashboard Workspace: ${previewSectionLabels[section]}. Dados ilustrativos.`}
    >
      <nav className="dash-sidebar" aria-label="Menu do Workspace">
        <div className="dash-brand">
          <span>
            <Layers />
          </span>
          workspace<b>.</b>
        </div>
        <span className="dash-menu-label">MEU ESPAÇO</span>
        {(
          [
            { id: 'overview', icon: LayoutDashboard },
            { id: 'projects', icon: Layers },
            { id: 'flows', icon: Workflow },
            { id: 'team', icon: Users },
            { id: 'clients', icon: Users },
            { id: 'finance', icon: CreditCard },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            className={`dash-menu ${section === item.id ? 'active' : ''}`}
            aria-current={section === item.id ? 'page' : undefined}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon aria-hidden="true" />
            {previewSectionLabels[item.id]}
          </button>
        ))}
        <div className="dash-sidebar-bottom">
          <button
            type="button"
            className={`dash-menu ${section === 'settings' ? 'active' : ''}`}
            onClick={() => onNavigate('settings')}
            aria-current={section === 'settings' ? 'page' : undefined}
          >
            <Settings2 aria-hidden="true" />
            Configurações
          </button>
          <div className="dash-person">
            <span>AC</span>
            <div>
              Ana Costa<small>Administradora</small>
            </div>
            <ChevronDown />
          </div>
        </div>
      </nav>
      <div className="dash-main">
        <div className="dash-topbar">
          <span>
            Meu espaço <span>/</span> {previewSectionLabels[section]}
          </span>
          <div>
            <button
              type="button"
              aria-label="Buscar projetos"
              onClick={() => onNavigate('projects')}
            >
              <Search aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Notificações do Workspace"
              aria-expanded={noticesOpen}
              onClick={() => setNoticesOpen(!noticesOpen)}
            >
              <Bell aria-hidden="true" />
            </button>
            <span>AC</span>
          </div>
        </div>
        {noticesOpen && (
          <div className="dash-notifications" role="status">
            <strong>Atualizações do workspace</strong>
            <p>Portal do cliente concluído.</p>
            <p>Equipe com 14 entregas em andamento.</p>
          </div>
        )}
        <div className="dash-page">
          {section === 'overview' ? (
            <>
              <div className="dash-heading">
                <div>
                  <span>WORKSPACE / VISÃO EXECUTIVA</span>
                  <strong>Seu negócio. Uma visão completa.</strong>
                  <small>Resultados, clientes e entregas na mesma direção.</small>
                </div>
                <select
                  className="dash-period"
                  value={period}
                  aria-label="Período dos indicadores"
                  onChange={(event) => setPeriod(Number(event.target.value))}
                >
                  {reports.map((item, index) => (
                    <option value={index} key={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dash-metrics" key={period}>
                {[
                  {
                    label: period === 2 ? 'Receita do período' : 'Receita do mês',
                    value: report.revenue,
                    change: report.growth[0],
                    target: 'finance' as const,
                    bars: [3, 5, 4, 7, 6, 8],
                  },
                  {
                    label: 'Taxa de conversão',
                    value: report.conversion,
                    change: report.growth[1],
                    target: 'projects' as const,
                    bars: [3, 4, 3, 5, 7, 8],
                  },
                  {
                    label: 'Novos clientes',
                    value: report.clients,
                    change: report.growth[2],
                    bars: [2, 4, 5, 4, 6, 9],
                    target: 'clients' as const,
                  },
                ].map((metric) => (
                  <button
                    type="button"
                    className="dash-metric"
                    key={metric.label}
                    onClick={() => onNavigate(metric.target)}
                    aria-label={`${metric.label}: ${metric.value}. Ver ${previewSectionLabels[metric.target]}`}
                  >
                    <span>
                      {metric.label}
                      <MoreHorizontal />
                    </span>
                    <strong>{metric.value}</strong>
                    <div>
                      <small>
                        {metric.change}{' '}
                        <span>{period === 2 ? 'vs. período anterior' : 'vs. mês anterior'}</span>
                      </small>
                      <span className="metric-spark">
                        {metric.bars.map((height, index) => (
                          <i key={index} style={{ height: `${height * 2}px` }} />
                        ))}
                      </span>
                    </div>
                  </button>
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
                  <div className="dash-chart-body" key={period}>
                    <div className="chart-y">
                      <span>{period === 2 ? '150 mil' : '60 mil'}</span>
                      <span>{period === 2 ? '100 mil' : '40 mil'}</span>
                      <span>{period === 2 ? '50 mil' : '20 mil'}</span>
                      <span>0</span>
                    </div>
                    <div className="dash-chart-plot">
                      <svg
                        viewBox="0 0 340 100"
                        preserveAspectRatio="none"
                        role="img"
                        aria-label={`Evolução da receita — ${report.label}: ${report.revenue}`}
                      >
                        <title>
                          {report.label}: {report.revenue}
                        </title>
                        <defs>
                          <linearGradient id="dashboard-area" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2d8cff" stopOpacity=".24" />
                            <stop offset="100%" stopColor="#2d8cff" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={`${report.trend} L340 100 L0 100Z`} fill="url(#dashboard-area)" />
                        <path
                          d={report.trend}
                          className="dash-trend-line"
                          pathLength={100}
                          fill="none"
                          stroke="#287ce1"
                          strokeWidth="2.4"
                        />
                      </svg>
                      <div className="chart-months">
                        {report.months.map((month) => (
                          <span key={month}>{month}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="dash-chart-insight">
                    <span>
                      <Sparkles />
                      Leitura do período
                    </span>
                    <strong>Receita em alta, com crescimento consistente.</strong>
                    <small>Compare os meses para planejar o próximo passo.</small>
                  </div>
                </div>
                <div className="dash-sources">
                  <div className="mock-card-title">
                    <strong>Origem dos clientes</strong>
                    <MoreHorizontal />
                  </div>
                  <div className="source-ring">
                    <span>
                      {report.clients}
                      <small>clientes</small>
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
                    <button type="button" onClick={() => onNavigate('projects')}>
                      Ver todos <ArrowUpRight />
                    </button>
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
            </>
          ) : (
            <PreviewSectionContent key={section} section={section} />
          )}
        </div>
      </div>
    </div>
  )
}

function SaasPreview({
  section,
  onNavigate,
}: {
  section: PreviewSection
  onNavigate: (section: PreviewSection) => void
}) {
  const templates = [
    {
      name: 'Qualificação de novos leads',
      steps: ['Novo lead', 'Qualificar com IA', 'Atualizar CRM'],
    },
    {
      name: 'Acompanhamento de pedidos',
      steps: ['Novo pedido', 'Conferir dados', 'Avisar equipe'],
    },
    {
      name: 'Retorno ao cliente',
      steps: ['Novo contato', 'Organizar retorno', 'Agendar atendimento'],
    },
  ]
  const [tab, setTab] = useState('automations')
  const [flows, setFlows] = useState([templates[0]])
  const [flowIndex, setFlowIndex] = useState(0)
  const [active, setActive] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [templateIndex, setTemplateIndex] = useState(0)
  const [node, setNode] = useState<number | null>(null)
  const [simulating, setSimulating] = useState(false)
  const [runs, setRuns] = useState([
    { name: 'Lead #0428', time: 'Há 2 minutos', duration: '1,2 s' },
    { name: 'Lead #0427', time: 'Há 8 minutos', duration: '0,9 s' },
  ])
  const [connections, setConnections] = useState(['CRM', 'Formulários'])
  const [notice, setNotice] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const flow = flows[flowIndex]
  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current)
    },
    [],
  )
  function simulate() {
    if (!active || simulating) return
    setSimulating(true)
    setNotice('Executando as três etapas do fluxo...')
    timer.current = setTimeout(() => {
      setRuns((previous) => [
        { name: `Simulação #${429 + previous.length - 2}`, time: 'Agora', duration: '0,9 s' },
        ...previous,
      ])
      setSimulating(false)
      setNotice('Execução concluída. As três etapas foram processadas na demonstração.')
      timer.current = null
    }, 900)
  }
  return (
    <div
      className="concept-saas concept-canvas"
      role="region"
      aria-label="SaaS Orbit: demonstração interativa com dados ilustrativos."
    >
      <div className="orbit-nav">
        <span className="orbit-brand">
          <span>
            <Command />
          </span>
          orbit<span className="orbit-pro">PRO</span>
        </span>
        <span className="orbit-workspace">Meu workspace</span>
        <div className="orbit-nav-right">
          <button
            type="button"
            aria-label="Notificações do Orbit"
            onClick={() =>
              setNotice(notice ? '' : 'Todas as execuções estão em dia. Não há pendências.')
            }
          >
            <Bell aria-hidden="true" />
          </button>
          <span>AC</span>
        </div>
      </div>
      <nav className="orbit-subnav" aria-label="Menu do Orbit">
        <button
          type="button"
          className={section === 'flows' && tab === 'automations' ? 'active' : ''}
          aria-current={section === 'flows' && tab === 'automations' ? 'page' : undefined}
          onClick={() => {
            onNavigate('flows')
            setTab('automations')
          }}
        >
          <Workflow aria-hidden="true" />
          Automações
        </button>
        <button
          type="button"
          className={section === 'flows' && tab === 'library' ? 'active' : ''}
          aria-current={section === 'flows' && tab === 'library' ? 'page' : undefined}
          onClick={() => {
            onNavigate('flows')
            setTab('library')
          }}
        >
          <Layers aria-hidden="true" />
          Biblioteca
        </button>
        <button
          type="button"
          className={section === 'flows' && tab === 'integrations' ? 'active' : ''}
          aria-current={section === 'flows' && tab === 'integrations' ? 'page' : undefined}
          onClick={() => {
            onNavigate('flows')
            setTab('integrations')
          }}
        >
          <Link2 aria-hidden="true" />
          Integrações
        </button>
        <span className="orbit-usage">
          <i />
          Seu workspace está conectado
        </span>
      </nav>
      <div className="orbit-page">
        {section === 'overview' || section === 'team' ? (
          <PreviewSectionContent key={section} section={section} brand="Orbit" />
        ) : (
          <>
            {notice && (
              <p className="orbit-demo-notice" role="status">
                {notice}
              </p>
            )}
            {tab === 'library' ? (
              <section className="orbit-demo-panel" aria-label="Biblioteca de automações">
                <h3>Biblioteca de automações</h3>
                <p>Escolha um modelo para começar.</p>
                {templates.map((item, index) => (
                  <article key={item.name}>
                    <h4>{item.name}</h4>
                    <p>{item.steps.join(' → ')}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setTemplateIndex(index)
                        setNewName(item.name)
                        setCreating(true)
                        setTab('automations')
                      }}
                    >
                      Usar modelo
                    </button>
                  </article>
                ))}
              </section>
            ) : tab === 'integrations' ? (
              <section className="orbit-demo-panel" aria-label="Integrações do workspace">
                <h3>Integrações do workspace</h3>
                <p>Experimente as conexões ilustrativas.</p>
                {['CRM', 'Formulários', 'Calendário'].map((name) => (
                  <article key={name}>
                    <h4>{name}</h4>
                    <p>
                      {connections.includes(name)
                        ? 'Conectado ao workspace'
                        : 'Disponível para conectar'}
                    </p>
                    <button
                      type="button"
                      aria-pressed={connections.includes(name)}
                      onClick={() =>
                        setConnections((previous) =>
                          previous.includes(name)
                            ? previous.filter((item) => item !== name)
                            : [...previous, name],
                        )
                      }
                    >
                      {connections.includes(name) ? `Desconectar ${name}` : `Conectar ${name}`}
                    </button>
                  </article>
                ))}
              </section>
            ) : tab === 'history' ? (
              <section className="orbit-demo-panel" aria-label="Histórico de execuções">
                <h3>Histórico de execuções</h3>
                {runs.map((run) => (
                  <article key={run.name}>
                    <h4>{run.name}</h4>
                    <p>
                      {run.time} · Concluída em {run.duration}
                    </p>
                  </article>
                ))}
                <button type="button" onClick={() => setTab('automations')}>
                  Voltar às automações
                </button>
              </section>
            ) : (
              <>
                <div className="orbit-heading">
                  <div>
                    <span>ORBIT / CENTRAL DE AUTOMAÇÕES</span>
                    <strong>O fluxo avança. Você acompanha.</strong>
                    <small>Da entrada do contato ao próximo atendimento.</small>
                  </div>
                  <button
                    type="button"
                    className="orbit-new"
                    onClick={() => {
                      setCreating(!creating)
                      setNewName('')
                    }}
                  >
                    <Plus />
                    Nova automação
                  </button>
                </div>
                {creating && (
                  <form
                    className="orbit-create-form"
                    onSubmit={(event) => {
                      event.preventDefault()
                      if (!newName.trim()) return
                      setFlows((previous) => [
                        ...previous,
                        { ...templates[templateIndex], name: newName.trim() },
                      ])
                      setFlowIndex(flows.length)
                      setCreating(false)
                      setNode(null)
                      setNotice('Automação adicionada à demonstração.')
                    }}
                  >
                    <label>
                      Nome da automação
                      <input
                        required
                        minLength={3}
                        value={newName}
                        onChange={(event) => setNewName(event.target.value)}
                      />
                    </label>
                    <label>
                      Modelo
                      <select
                        value={templateIndex}
                        onChange={(event) => setTemplateIndex(Number(event.target.value))}
                      >
                        {templates.map((item, index) => (
                          <option key={item.name} value={index}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button type="submit">Criar automação</button>
                    <button type="button" onClick={() => setCreating(false)}>
                      Cancelar
                    </button>
                  </form>
                )}
                <div className="orbit-overview">
                  <div>
                    <span>Fluxos ativos</span>
                    <strong>
                      {String(7 + flows.length).padStart(2, '0')}
                      <small>conectados</small>
                    </strong>
                  </div>
                  <div>
                    <span>Execuções no mês</span>
                    <strong>
                      {(1284 + runs.length - 2).toLocaleString('pt-BR')}
                      <small>processadas</small>
                    </strong>
                  </div>
                  <div>
                    <span>Conclusão dos fluxos</span>
                    <strong>
                      98,6%<small>no período</small>
                    </strong>
                  </div>
                </div>
                {flows.length > 1 && (
                  <label className="orbit-flow-picker">
                    Fluxo em exibição
                    <select
                      value={flowIndex}
                      onChange={(event) => {
                        setFlowIndex(Number(event.target.value))
                        setNode(null)
                      }}
                    >
                      {flows.map((item, index) => (
                        <option value={index} key={`${item.name}-${index}`}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <div className="orbit-flow">
                  <div className="orbit-flow-heading">
                    <span>
                      <span className="workflow-icon">
                        <Zap />
                      </span>
                      <span>
                        {flow.name}
                        <small>Seu fluxo de aquisição, conectado.</small>
                      </span>
                    </span>
                    <button
                      type="button"
                      className="orbit-live"
                      aria-pressed={active}
                      disabled={simulating}
                      onClick={() => setActive(!active)}
                    >
                      <i />
                      {active ? 'Ativa' : 'Pausada'}
                    </button>
                  </div>
                  <div className={`orbit-flow-canvas ${simulating ? 'is-simulating' : ''}`}>
                    <svg
                      className="orbit-connectors"
                      viewBox="0 0 600 160"
                      preserveAspectRatio="none"
                    >
                      <path d="M100 80 H500" />
                      <path d="M100 80 H500" className="orbit-connector-glow" />
                    </svg>
                    <button
                      type="button"
                      className="orbit-flow-node"
                      aria-label={`Detalhes: ${flow.steps[0]}`}
                      aria-expanded={node === 0}
                      onClick={() => setNode(node === 0 ? null : 0)}
                    >
                      <span className="orbit-node-icon node-green">
                        <Globe />
                      </span>
                      <strong>{flow.steps[0]}</strong>
                      <small>Formulário recebido</small>
                      <span className="node-event">GATILHO</span>
                    </button>
                    <span className="flow-connector-arrow">
                      <ArrowRight />
                    </span>
                    <button
                      type="button"
                      className="orbit-flow-node orbit-ai"
                      aria-label={`Detalhes: ${flow.steps[1]}`}
                      aria-expanded={node === 1}
                      onClick={() => setNode(node === 1 ? null : 1)}
                    >
                      <span className="orbit-node-icon node-purple">
                        <Sparkles />
                      </span>
                      <strong>{flow.steps[1]}</strong>
                      <small>Entender e organizar</small>
                      <span className="node-event">INTELIGÊNCIA</span>
                    </button>
                    <span className="flow-connector-arrow">
                      <ArrowRight />
                    </span>
                    <button
                      type="button"
                      className="orbit-flow-node"
                      aria-label={`Detalhes: ${flow.steps[2]}`}
                      aria-expanded={node === 2}
                      onClick={() => setNode(node === 2 ? null : 2)}
                    >
                      <span className="orbit-node-icon node-blue">
                        <Users />
                      </span>
                      <strong>{flow.steps[2]}</strong>
                      <small>Contato sincronizado</small>
                      <span className="node-event">AÇÃO</span>
                    </button>
                  </div>
                  {node !== null && (
                    <div className="orbit-step-detail">
                      <strong>{flow.steps[node]}</strong>
                      <p>
                        {
                          [
                            'O fluxo começa quando um novo registro chega ao workspace.',
                            'As informações são conferidas e organizadas para o próximo passo.',
                            'A equipe recebe o registro pronto para continuar o atendimento.',
                          ][node]
                        }
                      </p>
                    </div>
                  )}
                  <div className="orbit-flow-footer">
                    <span>
                      <CheckCircle2 />
                      Todas as etapas configuradas
                    </span>
                    <button type="button" disabled={!active || simulating} onClick={simulate}>
                      {simulating ? 'Executando...' : 'Simular execução'}
                    </button>
                  </div>
                </div>
                <div className="orbit-bottom">
                  <div className="orbit-runs">
                    <div className="mock-card-title">
                      <strong>Últimas execuções</strong>
                      <button type="button" onClick={() => setTab('history')}>
                        Ver histórico <ArrowUpRight />
                      </button>
                    </div>
                    {runs.slice(0, 2).map((run) => (
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function WebsitePreview() {
  const studio = useRef<HTMLElement>(null)
  const portfolio = useRef<HTMLDivElement>(null)
  const contact = useRef<HTMLElement>(null)
  const projectDetails = useRef<HTMLDivElement>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  function reveal(element: HTMLElement | null) {
    const scroll = element?.closest<HTMLElement>('.device-content')
    if (element && scroll)
      scroll.scrollTo({
        top: element.offsetTop,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      })
  }
  function openContact() {
    setContactOpen(true)
    if (contactOpen) reveal(contact.current)
  }
  useEffect(() => {
    if (contactOpen) {
      reveal(contact.current)
      contact.current?.querySelector('input')?.focus({ preventScroll: true })
    }
  }, [contactOpen])
  useEffect(() => {
    if (selectedProject !== null) reveal(projectDetails.current)
  }, [selectedProject])
  return (
    <div
      className="concept-website concept-canvas"
      role="region"
      aria-label="Website Forma: demonstração interativa de um estúdio criativo."
    >
      <div className="forma-nav">
        <span className="forma-brand">
          forma<span>®</span>
        </span>
        <div>
          <button type="button" onClick={() => reveal(studio.current)}>
            O estúdio
          </button>
          <button type="button" onClick={() => reveal(portfolio.current)}>
            Projetos
          </button>
          <button type="button" onClick={openContact}>
            Contato <ArrowUpRight />
          </button>
        </div>
      </div>
      <div className="forma-hero">
        <div className="forma-copy">
          <span className="forma-eyebrow">
            <i />
            ESTÚDIO INDEPENDENTE DE DESIGN
          </span>
          <strong>
            Essência que <br />
            ganha <em>forma.</em>
          </strong>
          <p>
            Estratégia e design para marcas <br />
            que querem ser reconhecidas.
          </p>
          <button type="button" className="forma-cta" onClick={openContact}>
            Vamos criar algo novo <ArrowUpRight />
          </button>
          <button type="button" className="forma-scroll" onClick={() => reveal(portfolio.current)}>
            <ArrowDown />
            ESTRATÉGIA. IDENTIDADE. EXPERIÊNCIA.
          </button>
        </div>
        <div className="forma-art">
          <span className="forma-art-caption">
            EXPLORAÇÃO Nº 003 <br />
            <b>Equilíbrio em movimento.</b>
          </span>
          <div className="forma-architecture">
            <span className="forma-art-grid" />
            <span className="forma-arch arch-back" />
            <span className="forma-arch arch-front" />
            <span className="forma-art-orb" />
            <span className="forma-art-line" />
          </div>
          <span className="forma-art-index">F / 03</span>
        </div>
      </div>
      <section className="forma-about" ref={studio} aria-label="O estúdio Forma">
        <span>O ESTÚDIO</span>
        <h3>Ideias com intenção. Design com presença.</h3>
        <p>
          Somos um estúdio criativo que conecta estratégia, identidade e experiência digital. Cada
          projeto parte da essência da marca para criar uma presença própria.
        </p>
        <button type="button" onClick={openContact}>
          Vamos conversar <ArrowUpRight />
        </button>
      </section>
      <div className="forma-work" ref={portfolio}>
        <div>
          <span>IDEIAS COM INTENÇÃO.</span>
          <strong>
            Design para ser sentido. <br />E lembrado.
          </strong>
        </div>
        <button
          type="button"
          className="forma-project forma-project-one"
          aria-label="Ver projeto Aura Studio"
          aria-expanded={selectedProject === 0}
          onClick={() => setSelectedProject(selectedProject === 0 ? null : 0)}
        >
          <span className="forma-project-art">
            a<span>u</span>ra.
          </span>
          <div>
            <span>
              Aura Studio<small>Identidade & posicionamento</small>
            </span>
            <ArrowUpRight />
          </div>
        </button>
        <button
          type="button"
          className="forma-project forma-project-two"
          aria-label="Ver projeto Norte Digital"
          aria-expanded={selectedProject === 1}
          onClick={() => setSelectedProject(selectedProject === 1 ? null : 1)}
        >
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
        </button>
        {selectedProject !== null && (
          <div className="forma-project-details" ref={projectDetails}>
            <h3>
              {selectedProject === 0
                ? 'Aura Studio — identidade que ganha vida.'
                : 'Norte Digital — uma presença com direção.'}
            </h3>
            <p>
              {selectedProject === 0
                ? 'Estratégia de marca, sistema visual e aplicações para apresentar um estúdio com personalidade.'
                : 'Website, narrativa e experiência digital para conectar serviços às pessoas certas.'}
            </p>
            <button type="button" onClick={openContact}>
              Quero um projeto assim <ArrowUpRight />
            </button>
          </div>
        )}
      </div>
      {contactOpen && (
        <section className="forma-contact" ref={contact} aria-label="Contato com o estúdio Forma">
          <span>VAMOS CRIAR ALGO NOVO</span>
          <h3>Conte o que você imagina.</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <label>
              Nome
              <input name="nome" required autoComplete="off" onChange={() => setSubmitted(false)} />
            </label>
            <label>
              E-mail
              <input
                name="email"
                required
                type="email"
                autoComplete="off"
                onChange={() => setSubmitted(false)}
              />
            </label>
            <label>
              Sua ideia
              <textarea name="ideia" required rows={3} onChange={() => setSubmitted(false)} />
            </label>
            <button type="submit">
              Preparar conversa <ArrowUpRight />
            </button>
          </form>
          {submitted && (
            <p role="status">
              Sua ideia está pronta para uma primeira conversa. Nesta demonstração, nenhuma mensagem
              é enviada.
            </p>
          )}
          <small>Formulário ilustrativo. Os dados ficam apenas nesta prévia.</small>
        </section>
      )}
    </div>
  )
}

const previews = [DashboardPreview, SaasPreview, WebsitePreview]

const screenChoices = [
  { id: 'pc', label: 'PC', preposition: 'no PC' },
  { id: 'tablet', label: 'Tablet', preposition: 'no tablet' },
  { id: 'ios', label: 'Celular', preposition: 'no celular' },
] as const

function ScreenSketch({ project }: { project: string }) {
  return (
    <svg viewBox="0 0 120 80" className="screen-sketch" aria-hidden="true">
      <path d="M8 10H112" stroke="#476782" strokeWidth="2" />
      {project === 'dashboard' ? (
        <>
          <rect x="8" y="20" width="31" height="19" rx="2" fill="#284764" />
          <rect x="45" y="20" width="31" height="19" rx="2" fill="#1b3045" />
          <rect x="82" y="20" width="30" height="19" rx="2" fill="#1b3045" />
          <path
            d="M8 69L26 60L42 63L64 50L82 54L112 43"
            fill="none"
            stroke="#82baff"
            strokeWidth="2"
          />
        </>
      ) : project === 'saas' ? (
        <>
          <path d="M25 47H95" stroke="#73a9db" strokeWidth="2" />
          {[12, 48, 84].map((x) => (
            <rect
              key={x}
              x={x}
              y="34"
              width="24"
              height="25"
              rx="4"
              fill="#1c344e"
              stroke="#537da4"
            />
          ))}
        </>
      ) : (
        <>
          <path d="M8 28H60M8 35H48M8 49H38" stroke="#9fbdd8" strokeWidth="3" />
          <rect x="77" y="23" width="30" height="45" rx="15" fill="#2c5582" />
          <path d="M8 65H60" stroke="#476782" strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

export function ProjectShowcase() {
  const [selected, setSelected] = useState(0)
  const [device, setDevice] = useState<PreviewDevice>('ios')
  const [previewOpen, setPreviewOpen] = useState(false)
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
            Ideias diferentes. <br />
            <span>O mesmo cuidado ao construir.</span>
          </h2>
          <p>
            Explore três possibilidades para o seu negócio. Troque a tela e veja como cada
            experiência se adapta à sua rotina.
          </p>
        </div>
        <div className={`showroom-card showroom-compact showroom-${project.id}`}>
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
                </button>
              ))}
            </div>
            <span className="showroom-explore-hint">Uma ideia. Cada tela.</span>
          </div>
          <div
            key={project.id}
            className="showroom-launch-scene"
            id={`project-panel-${project.id}`}
            role="tabpanel"
            aria-labelledby={`project-tab-${project.id}`}
            tabIndex={0}
          >
            <div className="showroom-copy">
              <span className="showroom-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <details className="showroom-specs">
                <summary>
                  O que este projeto oferece <ChevronDown size={13} />
                </summary>
                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <Check size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </details>
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
            <div className="showroom-screen-selector">
              <span className="showroom-screen-label">ESCOLHA COMO QUER VER</span>
              <div
                className="showroom-screen-choices"
                role="group"
                aria-label="Abrir demonstração em um dispositivo"
              >
                {screenChoices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`screen-choice screen-choice-${item.id}`}
                    aria-label={`Ver ${project.label} ${item.preposition}`}
                    aria-haspopup="dialog"
                    onClick={() => {
                      setDevice(item.id)
                      setPreviewOpen(true)
                    }}
                  >
                    <span className="screen-choice-art" aria-hidden="true">
                      <span className="screen-choice-frame">
                        <ScreenSketch project={project.id} />
                      </span>
                    </span>
                    <span className="screen-choice-label">
                      {item.label} <ArrowUpRight size={13} />
                    </span>
                  </button>
                ))}
              </div>
              <p>Clique em uma tela para explorar.</p>
            </div>
          </div>
        </div>
        <span className="showroom-announcement" role="status">
          {project.label}: {project.title} Escolha PC, tablet ou celular para explorar.
        </span>
        {previewOpen && (
          <Modal
            className="showroom-preview-modal"
            title={`${project.label} · ${previewDevices.find((item) => item.id === device)?.label}`}
            description="Explore a interface. Troque de tela para ver como a experiência se adapta."
            onClose={() => setPreviewOpen(false)}
          >
            <div className="showroom-preview-controls">
              <div className="device-options" role="group" aria-label="Dispositivo da prévia">
                {previewDevices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={device === item.id}
                    aria-label={item.label}
                    onClick={() => setDevice(item.id)}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    <span>{item.id === 'ios' ? 'iPhone' : item.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className={`showroom-preview-body showroom-card showroom-${project.id}`}>
              <DevicePreview
                key={project.id}
                device={device}
                address={project.address}
                label={project.label}
              >
                {(section, onNavigate) =>
                  project.id === 'dashboard' ? (
                    <DashboardPreview section={section} onNavigate={onNavigate} />
                  ) : (
                    <Preview section={section} onNavigate={onNavigate} />
                  )
                }
              </DevicePreview>
            </div>
            <p className="showroom-preview-note">
              Role dentro da tela para explorar · Interface conceitual com dados ilustrativos.
            </p>
          </Modal>
        )}
      </div>
    </section>
  )
}
