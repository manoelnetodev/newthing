import { useId, useState } from 'react'
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  GitBranch,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Package,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import './OperationalPreviews.css'
import { AutomationConnections, OperationTable } from './JourneyPreviewDetails'

const periods = {
  month: {
    label: 'Este mês',
    revenue: 'R$ 84.600',
    growth: '+12,4%',
    orders: '148',
    completed: '136',
    ticks: ['01', '05', '10', '15', '20', '25', '30'],
    points: '0,115 30,110 60,105 90,94 120,89 150,74 180,70 210,55 240,49 270,38 300,30 330,16.3',
    axis: ['90 mil', '60 mil', '30 mil', '0'],
    lastY: 16.3,
    units: ['R$ 38.070', 'R$ 29.610', 'R$ 16.920'],
  },
  quarter: {
    label: 'Trimestre',
    revenue: 'R$ 238.400',
    growth: '+18,6%',
    orders: '426',
    completed: '392',
    ticks: ['JUL', '', 'AGO', '', 'SET', '', '30'],
    points: '0,115 30,108 60,102 90,91 120,88 150,79 180,66 210,61 240,49 270,42 300,33 330,22.3',
    axis: ['270 mil', '180 mil', '90 mil', '0'],
    lastY: 22.3,
    units: ['R$ 107.280', 'R$ 83.440', 'R$ 47.680'],
  },
}

export function NexoEvolution() {
  const [period, setPeriod] = useState<'month' | 'quarter'>('month')
  const data = periods[period]
  const gradientId = useId()
  return (
    <div className="ops-preview nexo-preview">
      <div className="nexo-layout">
        <aside className="nexo-sidebar" aria-label="Navegação ilustrativa do sistema">
          <strong className="nexo-brand">
            <Layers size={20} />
            nexo<span>.</span>
          </strong>
          <small>WORKSPACE</small>
          {[
            { icon: LayoutDashboard, text: 'Inteligência' },
            { icon: ShoppingBag, text: 'Pedidos' },
            { icon: Users, text: 'Clientes' },
            { icon: Package, text: 'Estoque' },
          ].map(({ icon: Icon, text }, index) => (
            <span className={`nexo-menu-item ${index === 0 ? 'selected' : ''}`} key={text}>
              <Icon size={13} />
              <span>{text}</span>
              {index === 0 && <i />}
            </span>
          ))}
          <div className="nexo-sidebar-note">
            <ShieldCheck size={17} />
            <strong>Acesso protegido</strong>
            <span>Permissões por equipe</span>
          </div>
          <span className="nexo-menu-item nexo-settings">
            <Settings2 size={13} />
            <span>Configurações</span>
          </span>
          <div className="nexo-user">
            <b>AC</b>
            <span>
              Ana Costa<small>Administradora</small>
            </span>
          </div>
        </aside>
        <div className="nexo-main">
          <div className="ops-toolbar">
            <span>
              Workspace <ChevronRight size={9} /> <b>Visão executiva</b>
            </span>
            <span>
              <Search size={12} />
              <Bell size={12} />
              <b className="ops-avatar">AC</b>
            </span>
          </div>
          <header className="nexo-heading">
            <div>
              <span className="ops-eyebrow">INTELIGÊNCIA DO NEGÓCIO</span>
              <h4>Clareza para o próximo passo.</h4>
              <p>Sua operação conectada. Suas decisões com contexto.</p>
            </div>
            <span className="ops-live">
              <i />3 unidades
            </span>
          </header>
          <div className="nexo-controls">
            <span>
              <Layers size={11} />
              Todas as unidades
            </span>
            <div aria-label="Período dos indicadores">
              {(['month', 'quarter'] as const).map((key) => (
                <button
                  type="button"
                  key={key}
                  aria-pressed={period === key}
                  onClick={() => setPeriod(key)}
                >
                  {periods[key].label}
                </button>
              ))}
            </div>
          </div>
          <div className="nexo-kpis" aria-live="polite">
            <div className="featured">
              <small>
                Receita consolidada
                <ArrowUpRight size={12} />
              </small>
              <strong>{data.revenue}</strong>
              <span>
                <b>{data.growth}</b> vs. período anterior
              </span>
              <svg viewBox="0 0 100 30" aria-hidden="true">
                <path d="M0 27 15 20 30 23 45 11 60 15 78 7 100 2" />
              </svg>
            </div>
            <div>
              <small>
                Pedidos recebidos
                <ShoppingBag size={12} />
              </small>
              <strong>{data.orders}</strong>
              <span>
                <b>{data.completed}</b> já concluídos
              </span>
            </div>
            <div>
              <small>
                Equipes conectadas
                <Users size={12} />
              </small>
              <strong>
                04<em>perfis</em>
              </strong>
              <span>Permissões por função</span>
            </div>
          </div>
          <div className="nexo-analytics">
            <section className="nexo-chart ops-card">
              <header>
                <div>
                  <strong>Evolução da receita</strong>
                  <small>Receita acumulada no período</small>
                </div>
                <span className="nexo-chart-key">
                  <i />
                  Receita
                </span>
              </header>
              <div className="nexo-plot">
                <div className="nexo-axis">
                  {data.axis.map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
                <div>
                  <svg
                    key={period}
                    viewBox="0 0 330 120"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label={`Tendência ilustrativa de receita em alta. Total: ${data.revenue}.`}
                  >
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2d8cff" stopOpacity=".24" />
                        <stop offset="100%" stopColor="#2d8cff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[10, 45, 80, 115].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        x2="330"
                        y1={y}
                        y2={y}
                        stroke="#29425e"
                        strokeDasharray="3 4"
                      />
                    ))}
                    <polygon points={`0,120 ${data.points} 330,120`} fill={`url(#${gradientId})`} />
                    <polyline
                      className="nexo-revenue-line"
                      points={data.points}
                      fill="none"
                      stroke="#287ce1"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="330"
                      cy={data.lastY}
                      r="4"
                      fill="#287ce1"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="nexo-ticks">
                    {data.ticks.map((tick, index) => (
                      <span key={index}>{tick}</span>
                    ))}
                  </div>
                </div>
              </div>
              <footer>
                <span>
                  <ArrowUpRight size={11} />
                  {data.growth} no período
                </span>
                <small>Valores ilustrativos em R$</small>
              </footer>
            </section>
            <section className="nexo-units ops-card">
              <header>
                <strong>Por unidade</strong>
                <small>Participação na receita</small>
              </header>
              <div className="nexo-donut">
                <span>
                  <strong>3</strong>
                  <small>unidades</small>
                </span>
              </div>
              <div className="nexo-unit-list">
                {['Centro', 'Zona Sul', 'Online'].map((name, index) => (
                  <div key={name}>
                    <i />
                    <span>{name}</span>
                    <b>{data.units[index]}</b>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="nexo-insight">
            <Sparkles size={15} />
            <div>
              <strong>Uma leitura que ajuda a decidir.</strong>
              <p>
                {period === 'month'
                  ? 'A unidade Centro reúne 45% da receita. Compare as unidades e acompanhe a distribuição das entregas.'
                  : 'A receita cresceu 18,6% no trimestre. Acompanhe a operação junto com os resultados de cada unidade.'}
              </p>
            </div>
            <ArrowUpRight size={14} />
          </div>
          <OperationTable />
          <section className="nexo-roadmap ops-card">
            <header>
              <strong>
                <Sparkles size={12} />
                Próximas evoluções
              </strong>
              <span>Construídas com sua equipe</span>
            </header>
            <div>
              <span className="nexo-roadmap-icon">
                <ShieldCheck size={13} />
              </span>
              <p>
                <strong>Permissões por equipe</strong>
                <small>Mais autonomia, com controle de acesso.</small>
              </p>
              <b className="ops-badge blue">Planejado</b>
            </div>
            <div>
              <span className="nexo-roadmap-icon">
                <Workflow size={13} />
              </span>
              <p>
                <strong>Estoque integrado aos pedidos</strong>
                <small>Informações conectadas, menos retrabalho.</small>
              </p>
              <b className="ops-badge green">Em validação</b>
            </div>
          </section>
          <footer className="nexo-footer">
            <span>
              <CheckCircle2 size={10} />
              Dados de demonstração
            </span>
            <span>Uma visão. Toda a operação.</span>
          </footer>
        </div>
      </div>
    </div>
  )
}

const runs = [
  {
    id: 'EX-1042',
    time: '09:42',
    name: 'Ana Oliveira',
    initials: 'AO',
    title: 'Solicitação direcionada',
    review: false,
    duration: '1,2 s',
    detail:
      'Dados validados. A solicitação chegou à equipe comercial e a cliente recebeu a confirmação.',
  },
  {
    id: 'EX-1041',
    time: '09:38',
    name: 'Pedro Santos',
    initials: 'PS',
    title: 'Informação incompleta',
    review: true,
    duration: '0,8 s',
    detail:
      'O contato está incompleto. O fluxo foi pausado e encaminhado para conferência da equipe.',
  },
  {
    id: 'EX-1040',
    time: '09:31',
    name: 'Clara Lima',
    initials: 'CL',
    title: 'Confirmação enviada',
    review: false,
    duration: '1,4 s',
    detail:
      'Solicitação organizada e encaminhada. A confirmação foi enviada com o próximo passo do atendimento.',
  },
]

export function FluxoMonitor() {
  const [selectedId, setSelectedId] = useState(runs[0].id)
  const [filter, setFilter] = useState<'all' | 'review'>('all')
  const selected = runs.find((run) => run.id === selectedId) ?? runs[0]
  function changeFilter(next: 'all' | 'review') {
    setFilter(next)
    if (next === 'review') setSelectedId(runs[1].id)
  }
  return (
    <div className="ops-preview fluxo-preview">
      <header className="fluxo-top">
        <strong>
          <Workflow size={19} />
          fluxo<span>.</span>
        </strong>
        <span>Central de automações</span>
        <b className="ops-live">
          <i />
          Ambiente de demonstração
        </b>
      </header>
      <div className="fluxo-content">
        <div className="fluxo-heading">
          <div>
            <span className="ops-eyebrow">VISIBILIDADE EM CADA ETAPA</span>
            <h4>Automatizar. Acompanhar. Evoluir.</h4>
            <p>Tecnologia em movimento, com pessoas no controle.</p>
          </div>
          <span className="fluxo-heading-icon">
            <Activity size={23} />
          </span>
        </div>
        <AutomationConnections />
        <div className="fluxo-kpis">
          <div>
            <span>
              <CheckCircle2 size={14} />
              Concluídas hoje
            </span>
            <strong>
              18<small>de 20 solicitações</small>
            </strong>
            <div className="fluxo-mini-bars">
              {[35, 52, 43, 67, 55, 82, 70, 100, 88, 95].map((height, index) => (
                <i key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div>
            <span>
              <Users size={14} />
              Revisão humana
            </span>
            <strong>
              02<small>aguardando conferência</small>
            </strong>
            <b className="ops-badge amber">A equipe acompanha</b>
          </div>
          <div>
            <span>
              <Zap size={14} />
              Tempo médio do fluxo
            </span>
            <strong>
              1,2<em>s</em>
              <small>nas execuções concluídas</small>
            </strong>
            <span className="fluxo-kpi-note">
              <Check size={10} />4 etapas conectadas
            </span>
          </div>
        </div>
        <section className="fluxo-pipeline">
          <header>
            <strong>Do primeiro contato à equipe certa</strong>
            <span>FLUXO DE ATENDIMENTO</span>
          </header>
          <div>
            {[
              { icon: MessageSquare, title: 'Receber', text: 'Nova solicitação' },
              { icon: ShieldCheck, title: 'Validar', text: 'Conferir os dados' },
              { icon: GitBranch, title: 'Direcionar', text: 'Definir equipe' },
              { icon: CheckCircle2, title: 'Confirmar', text: 'Informar o cliente' },
            ].map(({ icon: Icon, title, text }, index) => (
              <div
                className={
                  selected.review && index > 0 ? `needs-review ${index > 1 ? 'pending' : ''}` : ''
                }
                key={title}
              >
                <span className="fluxo-pipeline-node">
                  <Icon size={17} />
                  <i />
                </span>
                <strong>{title}</strong>
                <small>
                  {selected.review && index > 0
                    ? index === 1
                      ? 'Revisão necessária'
                      : 'Aguardando validação'
                    : text}
                </small>
                {index < 3 && (
                  <span className="fluxo-pipeline-wire">
                    <i />
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
        <div className="fluxo-workspace">
          <section className="fluxo-history">
            <header>
              <div>
                <strong>Últimas execuções</strong>
                <small>Selecione para acompanhar o percurso.</small>
              </div>
              <div className="fluxo-filters" aria-label="Filtrar execuções">
                <button
                  type="button"
                  aria-pressed={filter === 'all'}
                  onClick={() => changeFilter('all')}
                >
                  Todas
                </button>
                <button
                  type="button"
                  aria-pressed={filter === 'review'}
                  onClick={() => changeFilter('review')}
                >
                  Em revisão
                </button>
              </div>
            </header>
            <div className="fluxo-table-head">
              <span>SOLICITAÇÃO</span>
              <span>STATUS</span>
            </div>
            {runs
              .filter((run) => filter === 'all' || run.review)
              .map((run) => (
                <button
                  type="button"
                  key={run.id}
                  className="fluxo-run"
                  aria-pressed={selectedId === run.id}
                  onClick={() => setSelectedId(run.id)}
                >
                  <span className="fluxo-contact-avatar">{run.initials}</span>
                  <span>
                    <strong>{run.name}</strong>
                    <small>
                      {run.time} · {run.id}
                    </small>
                  </span>
                  <b className={`ops-badge ${run.review ? 'amber' : 'green'}`}>
                    {run.review ? 'Em revisão' : 'Concluída'}
                  </b>
                  <ChevronRight size={11} />
                </button>
              ))}
            <footer>
              <ShieldCheck size={11} />
              Exceções encaminhadas para revisão humana.
            </footer>
          </section>
          <section
            className={`fluxo-run-detail ${selected.review ? 'review' : ''}`}
            aria-live="polite"
          >
            <header>
              <span>DETALHE DA EXECUÇÃO</span>
              <span>{selected.id}</span>
            </header>
            <div className="fluxo-detail-icon">
              {selected.review ? <CircleHelp size={21} /> : <CheckCircle2 size={21} />}
            </div>
            <h5>{selected.title}</h5>
            <p>{selected.detail}</p>
            <dl>
              <div>
                <dt>Responsável</dt>
                <dd>{selected.review ? 'Equipe de atendimento' : 'Equipe comercial'}</dd>
              </div>
              <div>
                <dt>Tempo de execução</dt>
                <dd>
                  <Clock3 size={10} />
                  {selected.duration}
                </dd>
              </div>
            </dl>
            <div className="fluxo-detail-result">
              {selected.review ? <Users size={13} /> : <Check size={13} />}
              <span>
                {selected.review
                  ? 'Aguardando uma pessoa da equipe'
                  : 'Cliente informado sobre o próximo passo'}
              </span>
            </div>
          </section>
        </div>
        <footer className="fluxo-next">
          <span>
            <Sparkles size={16} />
          </span>
          <div>
            <strong>O próximo passo também é acompanhado.</strong>
            <small>Novas regras e melhorias, a partir da rotina da sua empresa.</small>
          </div>
          <ArrowRight size={14} />
        </footer>
      </div>
    </div>
  )
}
