import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Globe,
  Layers,
  Mail,
  MessageSquare,
  Package,
  ShieldCheck,
  ShoppingBag,
  Target,
  Users,
  Workflow,
} from 'lucide-react'

const orders = [
  {
    id: '1042',
    initials: 'EH',
    name: 'Estúdio Horizonte',
    item: 'Identidade da marca',
    owner: 'Marina',
    date: '18 out',
    progress: 72,
    status: 'Em produção',
  },
  {
    id: '1041',
    initials: 'CO',
    name: 'Casa Oliveira',
    item: 'Portal de atendimento',
    owner: 'Lucas',
    date: '16 out',
    progress: 100,
    status: 'Concluído',
  },
  {
    id: '1040',
    initials: 'VN',
    name: 'Vértice Negócios',
    item: 'Integração comercial',
    owner: 'Ana',
    date: '21 out',
    progress: 35,
    status: 'Em análise',
  },
]

export function OperationTable() {
  return (
    <section className="preview-orders">
      <header>
        <div>
          <strong>Pedidos em destaque</strong>
          <small>Clientes, entregas e responsáveis no mesmo lugar.</small>
        </div>
        <span>
          03 pedidos <ChevronRight size={10} />
        </span>
      </header>
      <div className="preview-order-labels">
        <span>CLIENTE / PEDIDO</span>
        <span>RESPONSÁVEL</span>
        <span>ANDAMENTO</span>
      </div>
      {orders.map((order) => (
        <div className="preview-order-row" key={order.id}>
          <span className="preview-order-client">
            <b>{order.initials}</b>
            <span>
              <strong>{order.name}</strong>
              <small>
                #{order.id} · {order.item}
              </small>
            </span>
          </span>
          <span className="preview-order-owner">
            <i>{order.owner[0]}</i>
            <span>
              {order.owner}
              <small>{order.date}</small>
            </span>
          </span>
          <span className="preview-order-progress">
            <span>
              {order.status}
              <small>{order.progress}%</small>
            </span>
            <i>
              <b style={{ width: `${order.progress}%` }} />
            </i>
          </span>
        </div>
      ))}
      <footer>
        <ShieldCheck size={10} /> Acesso por perfil · histórico de alterações preservado
      </footer>
    </section>
  )
}

export function SystemWorkspace() {
  return (
    <div className="workspace-preview">
      <aside className="workspace-preview-sidebar">
        <strong>
          <Layers size={22} /> nexo<span>.</span>
        </strong>
        <small>SEU WORKSPACE</small>
        {[
          { icon: Target, label: 'Visão geral' },
          { icon: ShoppingBag, label: 'Pedidos' },
          { icon: Users, label: 'Clientes' },
          { icon: Package, label: 'Estoque' },
        ].map(({ icon: Icon, label }, index) => (
          <span className={index === 0 ? 'selected' : ''} key={label}>
            <Icon size={13} />
            {label}
            {index === 1 && <b>24</b>}
          </span>
        ))}
        <div className="workspace-team">
          <span>MC</span>
          <span>LC</span>
          <span>AC</span>
          <small>Sua equipe conectada</small>
        </div>
      </aside>
      <div className="workspace-preview-main">
        <header className="workspace-preview-toolbar">
          <span>
            Workspace <ChevronRight size={10} /> Visão geral
          </span>
          <span>
            <ShieldCheck size={11} /> Acesso seguro <b>AC</b>
          </span>
        </header>
        <div className="workspace-preview-title">
          <div>
            <small>QUARTA-FEIRA, 14 DE OUTUBRO</small>
            <h4>
              Bom dia, Ana<span>.</span>
            </h4>
            <p>Sua operação organizada. Seu próximo passo à vista.</p>
          </div>
          <span>
            <Clock3 size={11} /> Esta semana
          </span>
        </div>
        <div className="workspace-preview-metrics">
          {[
            {
              icon: ShoppingBag,
              value: '24',
              label: 'Pedidos em andamento',
              note: '06 aguardam aprovação',
              bars: [22, 38, 30, 48, 42, 58],
            },
            {
              icon: Check,
              value: '18',
              label: 'Entregas concluídas',
              note: '75% da meta semanal',
              bars: [20, 29, 40, 34, 49, 62],
            },
            {
              icon: Users,
              value: '06',
              label: 'Pessoas conectadas',
              note: '03 equipes em colaboração',
              bars: [28, 28, 37, 37, 51, 51],
            },
          ].map(({ icon: Icon, value, label, note, bars }) => (
            <div key={label}>
              <small>
                {label}
                <Icon size={12} />
              </small>
              <strong>
                {value}
                <ArrowUpRight size={14} />
              </strong>
              <span>{note}</span>
              <div className="workspace-spark" aria-hidden="true">
                {bars.map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="workspace-preview-analytics">
          <section className="workspace-volume">
            <header>
              <strong>Ritmo da operação</strong>
              <span>
                <i />
                Recebidos <i />
                Concluídos
              </span>
            </header>
            <div className="workspace-volume-bars">
              {[
                [48, 32],
                [65, 50],
                [58, 46],
                [85, 66],
                [70, 61],
                [96, 80],
              ].map(([received, done], index) => (
                <div key={index}>
                  <div>
                    <i style={{ height: `${received}%` }} />
                    <b style={{ height: `${done}%` }} />
                  </div>
                  <span>{['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'][index]}</span>
                </div>
              ))}
            </div>
            <footer>
              <ArrowUpRight size={10} />
              18 entregas acompanhadas nesta semana
            </footer>
          </section>
          <section className="workspace-delivery">
            <small>ENTREGAS DA SEMANA</small>
            <div className="workspace-progress-ring">
              <span>
                <strong>
                  75<small>%</small>
                </strong>
                <small>da meta</small>
              </span>
            </div>
            <p>
              <Check size={10} />
              18 concluídas <span>06 em andamento</span>
            </p>
          </section>
        </div>
        <OperationTable />
        <div className="workspace-notice">
          <MessageSquare size={13} />
          <span>
            <strong>A equipe acompanha cada mudança.</strong> Atualizações reunidas no histórico de
            cada pedido.
          </span>
          <Check size={12} />
        </div>
      </div>
    </div>
  )
}

export function PlanDecisions({ kind }: { kind: 'system' | 'website' | 'automation' }) {
  const data = {
    system: [
      ['01', 'Quem usa', 'Comercial, operação e gestão'],
      ['02', 'O que conecta', 'Pedidos, clientes e financeiro'],
      ['03', 'Como validar', 'Protótipo e teste com a equipe'],
    ],
    website: [
      ['01', 'Mensagem', 'Proposta de valor e conteúdo'],
      ['02', 'Experiência', 'Navegação simples em cada tela'],
      ['03', 'Conversão', 'Um caminho claro até o contato'],
    ],
    automation: [
      ['01', 'Gatilho', 'Formulário enviado pelo cliente'],
      ['02', 'Condição', 'Conferir os campos obrigatórios'],
      ['03', 'Exceção', 'Encaminhar à revisão humana'],
    ],
  }
  return (
    <div className="preview-plan-decisions">
      {data[kind].map(([n, title, text]) => (
        <div key={n}>
          <span>{n}</span>
          <strong>{title}</strong>
          <p>{text}</p>
        </div>
      ))}
    </div>
  )
}

export function WebsiteServices({ evolve }: { evolve: boolean }) {
  return (
    <section className="aurora-services">
      <header>
        <span>CLAREZA QUE SE TRANSFORMA EM AÇÃO</span>
        <strong>Seu desafio encontra uma direção.</strong>
      </header>
      <div>
        {[
          {
            icon: Target,
            title: 'Estratégia de negócio',
            text: 'Prioridades claras para orientar suas decisões.',
          },
          {
            icon: Workflow,
            title: 'Gestão & processos',
            text: 'Uma operação preparada para dar o próximo passo.',
          },
          {
            icon: Users,
            title: 'Parceria próxima',
            text: 'Escuta, contexto e acompanhamento na execução.',
          },
        ].map(({ icon: Icon, title, text }, index) => (
          <article key={title}>
            <div>
              <Icon size={16} />
              <span>0{index + 1}</span>
            </div>
            <h5>{title}</h5>
            <p>{text}</p>
            <span>
              Conhecer abordagem <ArrowUpRight size={10} />
            </span>
          </article>
        ))}
      </div>
      {evolve && (
        <div className="aurora-contact-path">
          <span>
            <Globe size={12} />
            Encontre a solução
          </span>
          <ChevronRight size={11} />
          <span>
            <MessageSquare size={12} />
            Conte seu momento
          </span>
          <ChevronRight size={11} />
          <span>
            <Users size={12} />
            Converse com a equipe
          </span>
        </div>
      )}
    </section>
  )
}

export function AutomationConnections() {
  return (
    <div className="preview-integrations">
      <span>INTEGRAÇÕES DO EXEMPLO</span>
      <div>
        {[
          { icon: Globe, label: 'Site', text: 'Origem do contato' },
          { icon: Layers, label: 'CRM', text: 'Dados organizados' },
          { icon: Mail, label: 'E-mail', text: 'Cliente informado' },
        ].map(({ icon: Icon, label, text }) => (
          <div key={label}>
            <span>
              <Icon size={14} />
            </span>
            <strong>
              {label}
              <small>{text}</small>
            </strong>
            <Check size={10} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function AutomationTrace() {
  return (
    <section className="preview-trace">
      <header>
        <strong>
          <Workflow size={12} /> Rastro da execução
        </strong>
        <span>EX-1042 · 1,2 s</span>
      </header>
      <div>
        {[
          ['09:42:00', 'Solicitação recebida', 'Site → Fluxo'],
          ['+ 0,3 s', 'Dados validados', 'Nome, contato e assunto'],
          ['+ 0,8 s', 'Responsável definido', 'Equipe comercial'],
          ['+ 1,2 s', 'Confirmação enviada', 'Cliente informado'],
        ].map(([time, title, text]) => (
          <div key={title}>
            <Check size={10} />
            <span>{time}</span>
            <strong>{title}</strong>
            <small>{text}</small>
          </div>
        ))}
      </div>
    </section>
  )
}
