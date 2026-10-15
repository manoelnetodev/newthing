import type { ReactNode } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Clock3,
  FileText,
  Globe,
  Layers,
  LayoutDashboard,
  Mail,
  MessageSquare,
  MousePointer2,
  Package,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Target,
  Users,
  Workflow,
} from 'lucide-react'
import { FluxoMonitor, NexoEvolution } from './OperationalPreviews'
import './JourneyDemo.css'
import './JourneyAutomation.css'

export type JourneyDemoKind = 'system' | 'website' | 'automation'

const names = {
  system: 'Nexo · gestão empresarial',
  website: 'Aurora · presença digital',
  automation: 'Fluxo · operação conectada',
}
const stages = ['Plano do projeto', 'Solução em uso', 'Próxima evolução']
const descriptions = {
  system: [
    'Mapa do sistema com pedidos, estoque e financeiro conectados e escopo da primeira versão.',
    'Sistema de gestão com indicadores, pedidos, responsáveis e acompanhamento das entregas.',
    'Evolução do sistema com análise por unidade, permissões de acesso e novas funcionalidades.',
  ],
  website: [
    'Planejamento visual de um site com proposta de valor, serviços e caminho até o contato.',
    'Site de uma consultoria com identidade visual, apresentação de serviços e chamada para uma conversa.',
    'Evolução do site com página de serviço, formulário de diagnóstico e acompanhamento da jornada de contato.',
  ],
  automation: [
    'Mapeamento do atendimento manual e do fluxo planejado, com regras e revisão humana.',
    'Fluxo automatizado que recebe uma solicitação, organiza os dados e direciona o atendimento.',
    'Monitoramento da automação com histórico de execuções, tratamento de exceções e revisão pela equipe.',
  ],
}

function Window({
  kind,
  phase,
  children,
}: {
  kind: JourneyDemoKind
  phase: number
  children: ReactNode
}) {
  return (
    <figure className={`journey-demo journey-demo--${kind}`}>
      <div
        className="journey-mock-window"
        role={phase === 2 && kind !== 'website' ? 'group' : 'img'}
        aria-label={`${names[kind]}. ${stages[phase]}. ${descriptions[kind][phase]}`}
      >
        <div className="journey-mock-window-bar">
          <span className="journey-mock-window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>{names[kind]}</span>
          <ShieldCheck size={13} />
        </div>
        {children}
      </div>
      <figcaption>
        <span>
          <CircleDot size={11} />
          {stages[phase]}
        </span>
        <span>Conceito ilustrativo · dados fictícios</span>
      </figcaption>
    </figure>
  )
}

function PlanningHeader({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <header className="journey-mock-planning-header">
      <span>{label}</span>
      <h4>{title}</h4>
      <p>{text}</p>
    </header>
  )
}

function SystemPlan() {
  return (
    <div className="journey-mock-system-plan">
      <PlanningHeader
        label="NEXO / PLANO DE PROJETO"
        title="Uma operação. Todas as peças conectadas."
        text="Da informação espalhada a uma visão compartilhada da empresa."
      />
      <div className="journey-mock-plan-objective">
        <Target size={17} />
        <div>
          <small>OBJETIVO CENTRAL</small>
          <strong>Organizar pedidos e acompanhar a operação</strong>
        </div>
        <span>01</span>
      </div>
      <div className="journey-mock-module-map">
        {[
          { icon: ShoppingBag, title: 'Pedidos', text: 'Entrada e acompanhamento' },
          { icon: Package, title: 'Estoque', text: 'Produtos e movimentações' },
          { icon: BarChart3, title: 'Financeiro', text: 'Contas e visão de caixa' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <Icon size={20} />
            <strong>{title}</strong>
            <small>{text}</small>
          </div>
        ))}
      </div>
      <div className="journey-mock-scope">
        <span>PRIMEIRA VERSÃO</span>
        <p>
          <Check size={12} />
          Cadastro de clientes <Check size={12} />
          Gestão de pedidos <Check size={12} />
          Painel da operação
        </p>
      </div>
      <div className="journey-mock-plan-footer">
        <span>
          <MousePointer2 size={12} />
          Fluxos e telas validados com a equipe
        </span>
        <span>
          Escopo definido
          <CheckCircle2 size={12} />
        </span>
      </div>
    </div>
  )
}

function SystemBuild({ evolve = false }: { evolve?: boolean }) {
  return (
    <div className="journey-mock-system-app">
      <aside className="journey-mock-app-sidebar">
        <strong>
          <Layers size={18} />
          nexo<span>.</span>
        </strong>
        {[
          { icon: LayoutDashboard, text: evolve ? 'Inteligência' : 'Visão geral' },
          { icon: ShoppingBag, text: 'Pedidos' },
          { icon: Users, text: 'Clientes' },
          { icon: Package, text: 'Estoque' },
        ].map(({ icon: Icon, text }, index) => (
          <span className={index === 0 ? 'active' : ''} key={text}>
            <Icon size={13} />
            <small>{text}</small>
          </span>
        ))}
        <span className="journey-mock-sidebar-bottom">
          <Settings2 size={13} />
          <small>Configurações</small>
        </span>
      </aside>
      <div className="journey-mock-app-main">
        <div className="journey-mock-app-toolbar">
          <span>EMPRESA / {evolve ? 'INTELIGÊNCIA' : 'VISÃO GERAL'}</span>
          <Search size={12} />
          <Bell size={12} />
          <b>AC</b>
        </div>
        <div className="journey-mock-app-heading">
          <div>
            <small>{evolve ? 'DECISÕES COM CONTEXTO' : 'SUA OPERAÇÃO, ORGANIZADA'}</small>
            <h4>{evolve ? 'Uma visão que acompanha o crescimento.' : 'Bom dia, Ana.'}</h4>
          </div>
          <span>
            {evolve ? 'Todas as unidades' : 'Este mês'}
            <ChevronDown size={10} />
          </span>
        </div>
        <div className="journey-mock-kpis">
          {(evolve
            ? [
                ['3', 'Unidades conectadas'],
                ['4', 'Perfis de acesso'],
                ['12', 'Relatórios disponíveis'],
              ]
            : [
                ['24', 'Pedidos em andamento'],
                ['18', 'Entregas concluídas'],
                ['06', 'Aguardando aprovação'],
              ]
          ).map(([value, label]) => (
            <div key={label}>
              <small>{label}</small>
              <strong>
                {value}
                <ArrowUpRight size={12} />
              </strong>
            </div>
          ))}
        </div>
        <div className="journey-mock-app-chart">
          <div>
            <strong>{evolve ? 'Comparativo entre unidades' : 'Movimentação de pedidos'}</strong>
            <small>Exemplo de visualização</small>
          </div>
          <div className={`journey-mock-chart-bars ${evolve ? 'is-comparison' : ''}`}>
            {[35, 57, 46, 72, 62, 88, 70, 94, 80, 99, 86, 110].map((height, index) => (
              <i key={index} style={{ height: `${height * 0.65}px` }} />
            ))}
          </div>
          <footer>
            {(evolve
              ? ['Centro', 'Zona Sul', 'Online']
              : ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']
            ).map((label) => (
              <span key={label}>{label}</span>
            ))}
          </footer>
        </div>
        <div className="journey-mock-orders">
          <div>
            <strong>{evolve ? 'Próximas melhorias priorizadas' : 'Acompanhe os pedidos'}</strong>
            <span>{evolve ? 'Plano de evolução' : 'Status atualizado'}</span>
          </div>
          {(evolve
            ? [
                ['Permissões por equipe', 'Planejado'],
                ['Integração com estoque', 'Em validação'],
              ]
            : [
                ['#1042 · Estúdio Horizonte', 'Em produção'],
                ['#1041 · Casa Oliveira', 'Concluído'],
              ]
          ).map(([title, status]) => (
            <p key={title}>
              <span>
                <i />
                {title}
              </span>
              <em>{status}</em>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

function WebsitePlan() {
  return (
    <div className="journey-mock-site-plan">
      <PlanningHeader
        label="AURORA / DIREÇÃO DA EXPERIÊNCIA"
        title="Antes do site, uma mensagem clara."
        text="O que sua empresa faz, para quem e qual é o próximo passo."
      />
      <div className="journey-mock-wireframe">
        <div className="journey-mock-wire-nav">
          <strong>MARCA</strong>
          <span>Serviços</span>
          <span>Sobre</span>
          <b>
            Contato
            <ArrowUpRight size={9} />
          </b>
        </div>
        <div className="journey-mock-wire-hero">
          <div>
            <small>01 / PROPOSTA DE VALOR</small>
            <h4>A razão para escolher a sua empresa.</h4>
            <span className="journey-mock-wire-line" />
            <span className="journey-mock-wire-line short" />
            <b>
              Iniciar uma conversa
              <ArrowRight size={10} />
            </b>
          </div>
          <div className="journey-mock-wire-image">
            <Globe size={30} strokeWidth={1} />
            <span>IDENTIDADE VISUAL</span>
          </div>
        </div>
        <div className="journey-mock-wire-sections">
          {['02 / Serviços', '03 / Diferenciais', '04 / Contato'].map((label) => (
            <span key={label}>
              {label}
              <ArrowDown size={12} />
            </span>
          ))}
        </div>
      </div>
      <div className="journey-mock-site-plan-note">
        <CheckCircle2 size={13} />
        Conteúdo, estrutura e navegação antes do desenvolvimento.
      </div>
    </div>
  )
}

function WebsiteBuild({ evolve = false }: { evolve?: boolean }) {
  return (
    <div className={`journey-mock-website ${evolve ? 'journey-mock-website-evolved' : ''}`}>
      <div className="journey-mock-site-nav">
        <strong>
          aurora<span>®</span>
        </strong>
        <span>Consultoria</span>
        <span>Sobre nós</span>
        <b>
          Vamos conversar
          <ArrowUpRight size={10} />
        </b>
      </div>
      {evolve ? (
        <>
          <div className="journey-mock-site-evolve-title">
            <span>ESTRATÉGIA PARA O SEU MOMENTO</span>
            <h4>
              Seu próximo passo
              <br />
              <i>começa com clareza.</i>
            </h4>
            <p>Um diagnóstico para conectar o seu desafio a um caminho possível.</p>
          </div>
          <div className="journey-mock-site-contact">
            <div>
              <small>UM CAMINHO MAIS DIRETO</small>
              <h5>
                Do interesse
                <br />à conversa certa.
              </h5>
              <p>Serviço → Diagnóstico → Atendimento</p>
              <span>
                <Check size={11} />
                Experiência pensada para o contato
              </span>
            </div>
            <div className="journey-mock-form-preview">
              <strong>Vamos conhecer seu negócio.</strong>
              <span>Seu nome</span>
              <span>E-mail profissional</span>
              <span>Qual é o seu desafio?</span>
              <b>
                Solicitar diagnóstico
                <ArrowUpRight size={11} />
              </b>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="journey-mock-site-hero">
            <div>
              <span>CONSULTORIA & ESTRATÉGIA</span>
              <h4>
                Clareza para
                <br />
                decidir.
                <br />
                <i>
                  Direção para
                  <br />
                  crescer.
                </i>
              </h4>
              <p>Transformamos desafios de negócio em caminhos que fazem sentido.</p>
              <b>
                Conheça nossa abordagem
                <ArrowUpRight size={12} />
              </b>
            </div>
            <div className="journey-mock-architecture" aria-hidden="true">
              <span className="journey-mock-arch-block back" />
              <span className="journey-mock-arch-block front" />
              <i />
              <small>
                VISÃO.
                <br />
                DIREÇÃO.
                <br />
                MOVIMENTO.
              </small>
            </div>
          </div>
          <div className="journey-mock-site-services">
            <span>ESTRATÉGIA QUE SAI DO PAPEL</span>
            <strong>
              Planejamento
              <ArrowUpRight size={12} />
            </strong>
            <strong>
              Gestão & processos
              <ArrowUpRight size={12} />
            </strong>
          </div>
        </>
      )}
      <div className="journey-mock-site-bottom">
        <span>
          {evolve
            ? 'Uma experiência que evolui com o negócio.'
            : 'Uma presença digital à altura da sua empresa.'}
        </span>
        <span>aurora / {evolve ? '02' : '01'}</span>
      </div>
    </div>
  )
}

function AutomationPlan() {
  return (
    <div className="journey-mock-automation-plan">
      <PlanningHeader
        label="FLUXO / MAPA DA OPERAÇÃO"
        title="Menos tarefas soltas. Mais continuidade."
        text="Exemplo: organizar a entrada de solicitações de clientes."
      />
      <div className="journey-mock-manual-flow">
        <span>HOJE / PROCESSO MANUAL</span>
        <div>
          <span>
            <MessageSquare size={15} />
            Mensagem
          </span>
          <ArrowRight size={13} />
          <span>
            <FileText size={15} />
            Planilha
          </span>
          <ArrowRight size={13} />
          <span>
            <Users size={15} />
            Equipe
          </span>
        </div>
        <p>
          <Clock3 size={12} />
          Conferência e repasse em cada etapa
        </p>
      </div>
      <div className="journey-mock-planned-flow">
        <span>PROPOSTA / FLUXO CONECTADO</span>
        <div>
          <Workflow size={21} />
          <strong>Receber → Organizar → Direcionar</strong>
          <CheckCircle2 size={16} />
        </div>
        <p>Informações seguem o mesmo caminho, com regras definidas.</p>
      </div>
      <div className="journey-mock-flow-guardrails">
        <span>
          <ShieldCheck size={13} />
          Regras e permissões
        </span>
        <span>
          <Users size={13} />
          Revisão humana
        </span>
        <span>
          <FileText size={13} />
          Histórico de ações
        </span>
      </div>
    </div>
  )
}

function AutomationBuild() {
  return (
    <div className="journey-flow-studio">
      <div className="journey-flow-brand">
        <strong>
          <Workflow size={18} />
          fluxo<span>.</span>
        </strong>
        <span>ATENDIMENTO CONECTADO</span>
        <small>
          <i />
          Simulação
        </small>
      </div>
      <header className="journey-flow-intro">
        <span>FERRAMENTAS CONECTADAS. PESSOAS NO CENTRO.</span>
        <h4>
          Uma solicitação.
          <br />
          <em>O caminho certo.</em>
        </h4>
        <p>Da primeira mensagem ao atendimento, cada etapa tem uma direção.</p>
      </header>
      <div className="journey-flow-workspace">
        <div className="journey-flow-diagram">
          <span className="journey-flow-section-label">O FLUXO DO ATENDIMENTO</span>
          <div className="journey-flow-step entry">
            <span>
              <MessageSquare size={16} />
            </span>
            <div>
              <small>01 / ENTRADA</small>
              <strong>Nova solicitação</strong>
              <p>Mensagem recebida pelo site</p>
            </div>
            <CheckCircle2 size={11} />
          </div>
          <div className="journey-flow-link first">
            <i />
          </div>
          <div className="journey-flow-step validation">
            <span>
              <ShieldCheck size={16} />
            </span>
            <div>
              <small>02 / VALIDAÇÃO</small>
              <strong>Organizar os dados</strong>
              <p>Identificar assunto e responsável</p>
            </div>
            <CheckCircle2 size={11} />
          </div>
          <div className="journey-flow-link second">
            <i />
          </div>
          <div className="journey-flow-branches">
            <div className="journey-flow-route approved">
              <span>Dados completos</span>
              <div>
                <Users size={15} />
                <strong>Equipe certa</strong>
                <small>Atendimento direcionado</small>
              </div>
            </div>
            <div className="journey-flow-route review">
              <span>Precisa de ajuste</span>
              <div>
                <Search size={15} />
                <strong>Revisão humana</strong>
                <small>Equipe verifica os dados</small>
              </div>
            </div>
          </div>
          <div className="journey-flow-confirmation">
            <Mail size={13} />
            <span>Cliente informado sobre o próximo passo</span>
            <Check size={12} />
          </div>
        </div>
        <div className="journey-flow-conversation">
          <span className="journey-flow-section-label">NA PRÁTICA</span>
          <div className="journey-flow-contact">
            <span>AO</span>
            <div>
              <strong>Ana Oliveira</strong>
              <small>Nova oportunidade</small>
            </div>
            <MessageSquare size={13} />
          </div>
          <div className="journey-flow-message customer">
            <small>CLIENTE</small>
            <p>Olá! Gostaria de conhecer as soluções para minha empresa.</p>
          </div>
          <div className="journey-flow-message reply">
            <small>CONFIRMAÇÃO AUTOMÁTICA</small>
            <p>Olá, Ana! Recebemos sua solicitação. Nossa equipe vai acompanhar seu atendimento.</p>
            <span>
              <Check size={10} />
              Recebimento confirmado
            </span>
          </div>
          <div className="journey-flow-assignment">
            <span>RESPONSÁVEL</span>
            <strong>
              <Users size={12} />
              Equipe comercial
            </strong>
            <small>
              <i />
              Solicitação encaminhada
            </small>
          </div>
        </div>
      </div>
      <div className="journey-flow-bottom">
        <span>
          <ShieldCheck size={12} />
          Automação com acompanhamento humano.
        </span>
        <span>
          Receber <ArrowRight size={9} /> Organizar <ArrowRight size={9} /> Conectar
        </span>
      </div>
    </div>
  )
}

export function JourneyDemo({ kind, phase }: { kind: JourneyDemoKind; phase: number }) {
  return (
    <Window kind={kind} phase={phase}>
      {kind === 'system' ? (
        phase === 0 ? (
          <SystemPlan />
        ) : phase === 2 ? (
          <NexoEvolution />
        ) : (
          <SystemBuild />
        )
      ) : kind === 'website' ? (
        phase === 0 ? (
          <WebsitePlan />
        ) : (
          <WebsiteBuild evolve={phase === 2} />
        )
      ) : phase === 0 ? (
        <AutomationPlan />
      ) : phase === 1 ? (
        <AutomationBuild />
      ) : (
        <FluxoMonitor />
      )}
    </Window>
  )
}
