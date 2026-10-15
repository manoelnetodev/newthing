import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Headphones,
  Layers,
  MessageSquare,
  Package,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Users,
  Workflow,
} from 'lucide-react'
import './PartnershipPillars.css'

const pillars = [
  {
    title: 'Software com propósito.',
    short: 'Software',
    icon: Code2,
    teaser: 'Uma solução construída a partir da sua rotina e dos seus objetivos.',
    heading: 'Seu negócio define o que o sistema precisa fazer.',
    intro:
      'Antes de escolher ferramentas ou escrever código, entendemos como sua empresa trabalha, quem usará a solução e qual problema precisa ser resolvido. Essa compreensão orienta as telas, os recursos e as prioridades.',
    steps: [
      [
        'Entender e priorizar',
        'Mapeamos a rotina, os usuários e as funcionalidades essenciais. O escopo deixa claro o que a primeira versão precisa entregar.',
      ],
      [
        'Visualizar antes de construir',
        'Desenhamos fluxos e protótipos para você conferir se a experiência faz sentido, antes de avançar no desenvolvimento.',
      ],
      [
        'Construir e validar',
        'Desenvolvemos as funcionalidades e verificamos os cenários de uso, as permissões de acesso e os critérios de entrega combinados.',
      ],
    ],
    outcomes: [
      ['Você acompanha', 'Telas, fluxos e funcionalidades nas etapas de validação.'],
      ['Nós organizamos', 'Escopo, regras do sistema e prioridades de construção.'],
      ['Valor na rotina', 'Informação organizada e uma experiência adequada a quem vai usar.'],
    ],
    scenario: 'Do pedido recebido à entrega acompanhada.',
    example:
      'Uma empresa precisa parar de procurar pedidos em conversas e planilhas. O sistema reúne clientes, responsáveis e andamento em uma mesma visão.',
    result: 'Cada pessoa entende o que precisa fazer e onde encontrar a informação.',
    goal: 'construir um sistema sob medida para organizar a operação da minha empresa',
    stage: 'Quero construir um sistema',
  },
  {
    title: 'Operações mais conectadas.',
    short: 'Integrações',
    icon: Workflow,
    teaser: 'Ferramentas que conversam e processos com menos esforço manual.',
    heading: 'A informação chega aonde precisa, com um fluxo claro.',
    intro:
      'O trabalho começa pelas etapas que consomem tempo: copiar dados, conferir mensagens ou atualizar várias ferramentas. Avaliamos o que pode ser conectado, quais regras precisam ser respeitadas e onde uma pessoa continua essencial.',
    steps: [
      [
        'Mapear o processo real',
        'Identificamos entradas, responsáveis, ferramentas e pontos de retrabalho. A automação parte de uma rotina compreendida.',
      ],
      [
        'Conectar com critério',
        'Verificamos a viabilidade das integrações, os acessos necessários e como os dados serão organizados entre os serviços.',
      ],
      [
        'Tratar as exceções',
        'Prevemos o que acontece quando falta informação ou uma etapa falha, incluindo registros e encaminhamento para revisão humana.',
      ],
    ],
    outcomes: [
      ['Você acompanha', 'O percurso dos dados e as situações que pedem uma pessoa.'],
      ['Nós organizamos', 'Regras, conexões viáveis e tratamento de exceções.'],
      ['Valor na rotina', 'Menos digitação repetida e mais clareza sobre os responsáveis.'],
    ],
    scenario: 'Uma solicitação percorre o caminho certo.',
    example:
      'Uma mensagem recebida pelo site pode virar um registro organizado e ser direcionada à equipe certa. Dados incompletos seguem para conferência.',
    result: 'A equipe encontra a solicitação com contexto e sabe qual é o próximo passo.',
    goal: 'conectar ferramentas e automatizar processos da minha empresa',
    stage: 'Quero construir um sistema',
  },
  {
    title: 'Atendimento de verdade.',
    short: 'Proximidade',
    icon: Headphones,
    teaser: 'Você participa das decisões e entende o que está sendo construído.',
    heading: 'Sua experiência orienta. Nossa equipe traduz em tecnologia.',
    intro:
      'Você não precisa dominar termos técnicos para participar do projeto. Queremos entender sua realidade e explicar as alternativas de forma que você consiga avaliar, perguntar e decidir com segurança.',
    steps: [
      [
        'Escutar com contexto',
        'Conversamos sobre os desafios, as expectativas e as particularidades do seu negócio. As perguntas ajudam a descobrir o que realmente importa.',
      ],
      [
        'Explicar as decisões',
        'Apresentamos possibilidades, limitações e impactos em uma linguagem clara, com referências e demonstrações quando necessário.',
      ],
      [
        'Validar com você',
        'Combinamos os momentos de acompanhamento e registramos ajustes e prioridades. Seu retorno participa da construção.',
      ],
    ],
    outcomes: [
      ['Você acompanha', 'O andamento, os pontos de decisão e os ajustes discutidos.'],
      ['Nós organizamos', 'Uma comunicação clara e momentos de validação definidos.'],
      ['Valor na rotina', 'Uma solução mais próxima de como sua empresa realmente trabalha.'],
    ],
    scenario: 'Uma conversa que melhora a solução.',
    example:
      'Ao visualizar um protótipo, você percebe que um pedido precisa de aprovação antes de avançar. Esse detalhe da rotina vira uma regra discutida no projeto.',
    result: 'O conhecimento de quem usa o sistema participa das decisões de quem o constrói.',
    goal: 'organizar minha ideia com uma equipe que acompanhe as decisões do projeto',
    stage: 'Tenho uma ideia',
  },
  {
    title: 'Uma parceria que continua.',
    short: 'Evolução',
    icon: RefreshCw,
    teaser: 'Uma entrega preparada para o uso e um próximo passo planejado.',
    heading: 'A entrega tem um destino: funcionar na sua realidade.',
    intro:
      'Lançar uma solução exige mais do que disponibilizar telas. Planejamos a validação, as orientações de uso e os cuidados necessários para começar a operação. A continuidade é alinhada às necessidades da empresa e ao escopo contratado.',
    steps: [
      [
        'Preparar a entrada em uso',
        'Conferimos os fluxos acordados, alinhamos acessos e orientamos os responsáveis para que a equipe conheça a solução.',
      ],
      [
        'Definir o acompanhamento',
        'Combinamos o período, os canais e o que está coberto em suporte e manutenção, distinguindo correções de novas funcionalidades.',
      ],
      [
        'Planejar a evolução',
        'Reunimos o retorno de quem usa, avaliamos novas necessidades e priorizamos melhorias com base no impacto e na viabilidade.',
      ],
    ],
    outcomes: [
      ['Você acompanha', 'O que foi entregue e como solicitar ajuda ou melhorias.'],
      ['Nós organizamos', 'Orientações, responsabilidades e prioridades de evolução.'],
      ['Valor na rotina', 'Continuidade com clareza para decidir o próximo investimento.'],
    ],
    scenario: 'O uso real revela o próximo avanço.',
    example:
      'Depois de organizar os pedidos, a empresa identifica a necessidade de integrar o estoque. A melhoria entra em avaliação e recebe prioridade conforme seu impacto.',
    result:
      'O projeto evolui por uma necessidade observada, com escopo e próximos passos definidos.',
    goal: 'planejar o acompanhamento e a evolução de um sistema existente',
    stage: 'Quero evoluir um produto',
  },
]

function PillarPreview({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="pillar-system">
        <div className="pillar-system-header">
          <Layers size={15} />
          <strong>Pedidos</strong>
          <span>VISÃO DA OPERAÇÃO</span>
        </div>
        <div className="pillar-system-modules">
          {[
            { icon: Users, label: 'Clientes' },
            { icon: ShoppingBag, label: 'Pedidos' },
            { icon: Package, label: 'Entregas' },
          ].map(({ icon: Icon, label }) => (
            <span key={label}>
              <Icon size={14} />
              {label}
            </span>
          ))}
        </div>
        <div className="pillar-system-labels">
          <span>PEDIDO / RESPONSÁVEL</span>
          <span>ANDAMENTO</span>
        </div>
        {[
          ['#1042', 'Ana · Equipe comercial', 'Em produção'],
          ['#1041', 'Lucas · Operações', 'Em aprovação'],
          ['#1040', 'Marina · Atendimento', 'Concluído'],
        ].map(([id, name, status], i) => (
          <div className="pillar-order" key={id}>
            <span className="pillar-order-symbol">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{id}</strong>
              <small>{name}</small>
            </div>
            <b className={`status-${i}`}>{status}</b>
          </div>
        ))}
        <footer>
          <ShieldCheck size={11} />
          Acessos de acordo com a função da equipe.
        </footer>
      </div>
    )
  if (index === 1)
    return (
      <div className="pillar-connections">
        <div className="pillar-connections-head">
          <Workflow size={16} />
          <strong>Atendimento conectado</strong>
          <span>FLUXO DEFINIDO</span>
        </div>
        {[
          {
            icon: MessageSquare,
            label: 'Receber solicitação',
            detail: 'Formulário do site',
            state: 'Entrada',
          },
          {
            icon: ShieldCheck,
            label: 'Organizar informações',
            detail: 'Verificar dados e identificar o assunto',
            state: 'Regra',
          },
          {
            icon: Users,
            label: 'Direcionar para a equipe',
            detail: 'Registro com contexto e responsável',
            state: 'Ação',
          },
        ].map(({ icon: Icon, label, detail, state }, i) => (
          <div className="pillar-flow-step" key={label}>
            <span>
              <Icon size={16} />
            </span>
            <div>
              <small>
                {`0${i + 1}`} / {state}
              </small>
              <strong>{label}</strong>
              <p>{detail}</p>
            </div>
            <Check size={12} />
          </div>
        ))}
        <footer>
          <ShieldCheck size={13} />
          <span>
            <strong>Faltou algum dado?</strong>A solicitação segue para revisão humana.
          </span>
        </footer>
      </div>
    )
  if (index === 2)
    return (
      <div className="pillar-conversation">
        <header>
          <span>
            <Headphones size={15} />
          </span>
          <div>
            <strong>Construção em conjunto</strong>
            <small>EXEMPLO DE VALIDAÇÃO</small>
          </div>
          <span className="pillar-conversation-status">Protótipo</span>
        </header>
        <div className="pillar-chat team">
          <small>NEWTHING</small>
          <p>Este fluxo representa como os pedidos avançam na sua empresa?</p>
        </div>
        <div className="pillar-chat client">
          <small>VOCÊ</small>
          <p>Antes de concluir, preciso que a pessoa responsável aprove o pedido.</p>
        </div>
        <div className="pillar-feedback">
          <CheckCircle2 size={17} />
          <div>
            <strong>O seu contexto vira uma decisão.</strong>
            <p>Etapa de aprovação incluída no fluxo para validação.</p>
          </div>
        </div>
        <footer>
          <span>Escuta</span>
          <ArrowRight size={10} />
          <span>Decisão clara</span>
          <ArrowRight size={10} />
          <span>Próxima entrega</span>
        </footer>
      </div>
    )
  return (
    <div className="pillar-roadmap">
      <header>
        <RefreshCw size={16} />
        <strong>Plano de evolução</strong>
        <span>PRIORIDADES VISÍVEIS</span>
      </header>
      {[
        {
          title: 'Primeira versão validada',
          text: 'Pedidos organizados e orientações de uso.',
          tag: 'Entrega',
          state: 'done',
        },
        {
          title: 'Retorno da equipe',
          text: 'Necessidades identificadas na rotina.',
          tag: 'Escuta',
          state: 'current',
        },
        {
          title: 'Integração com estoque',
          text: 'Impacto e escopo em avaliação.',
          tag: 'Próximo passo',
          state: 'next',
        },
      ].map(({ title, text, tag, state }, i) => (
        <div className={`pillar-roadmap-step ${state}`} key={title}>
          <span>{i === 0 ? <Check size={13} /> : `0${i + 1}`}</span>
          <div>
            <small>{tag}</small>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        </div>
      ))}
      <footer>
        <ShieldCheck size={11} />
        Acompanhamento definido no escopo do projeto.
      </footer>
    </div>
  )
}

export function PartnershipPillars({
  onStartProject,
}: {
  onStartProject: (goal: string, stage: string) => void
}) {
  const [active, setActive] = useState(0)
  const id = useId()
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const pillar = pillars[active]
  const Icon = pillar.icon
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % pillars.length
        : event.key === 'ArrowLeft'
          ? (index + pillars.length - 1) % pillars.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? pillars.length - 1
              : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }
  return (
    <section className="partnership-pillars" aria-labelledby={`${id}-title`}>
      <div className="pillars-heading">
        <div>
          <span className="eyebrow">
            <span />O CUIDADO POR TRÁS DA SOLUÇÃO
          </span>
          <h3 id={`${id}-title`}>
            O que construímos importa.
            <br />
            <span>Como cuidamos também.</span>
          </h3>
        </div>
        <p>
          Da primeira conversa à evolução do projeto, quatro frentes conectam tecnologia,
          proximidade e a realidade da sua empresa. Explore o que cada uma significa na prática.
        </p>
      </div>
      <div className="pillars-tabs" role="tablist" aria-label="Frentes da nossa parceria">
        {pillars.map((item, index) => (
          <button
            type="button"
            role="tab"
            key={item.title}
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel`}
            aria-selected={active === index}
            aria-label={item.title}
            tabIndex={active === index ? 0 : -1}
            ref={(node) => {
              tabs.current[index] = node
            }}
            onKeyDown={(event) => navigate(event, index)}
            onClick={() => setActive(index)}
          >
            <span className="pillar-tab-top">
              <item.icon size={21} strokeWidth={1.5} />
              <small>{`0${index + 1}`}</small>
            </span>
            <strong>{item.title}</strong>
            <span className="pillar-tab-teaser">{item.teaser}</span>
            <span className="pillar-tab-action">
              {active === index ? 'Em detalhe' : 'Entenda como'}
              <ArrowRight size={12} />
            </span>
          </button>
        ))}
      </div>
      <div
        className="pillar-panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <div className="pillar-panel-top">
          <span>
            <Icon size={13} />
            {`0${active + 1}`} / {pillar.short}
          </span>
          <span>DA PROMESSA À PRÁTICA</span>
        </div>
        <div className="pillar-panel-main">
          <div className="pillar-explanation">
            <h4>{pillar.heading}</h4>
            <p>{pillar.intro}</p>
            <ol>
              {pillar.steps.map(([title, text], index) => (
                <li key={title}>
                  <span>{`0${index + 1}`}</span>
                  <div>
                    <h5>{title}</h5>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="pillar-example">
            <span className="pillar-example-label">COMO ISSO APARECE NA SUA EMPRESA</span>
            <h5>{pillar.scenario}</h5>
            <p>{pillar.example}</p>
            <figure>
              <div className="pillar-example-browser">
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <span>newthing / {pillar.short.toLowerCase()}</span>
                <ShieldCheck size={11} />
              </div>
              <PillarPreview index={active} />
              <figcaption>Exemplo ilustrativo · não representa um cliente real</figcaption>
            </figure>
            <div className="pillar-example-result">
              <CheckCircle2 size={15} />
              <p>{pillar.result}</p>
            </div>
          </div>
        </div>
        <div className="pillar-outcomes">
          {pillar.outcomes.map(([title, text]) => (
            <div key={title}>
              <span>
                <Check size={11} />
                {title}
              </span>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <footer className="pillar-panel-footer">
          <p>
            O seu contexto define as entregas.
            <br />
            <span>Escopo, responsabilidades e acompanhamento são alinhados em cada projeto.</span>
          </p>
          <button type="button" onClick={() => onStartProject(pillar.goal, pillar.stage)}>
            Incluir no meu projeto
            <ArrowUpRight size={15} />
          </button>
        </footer>
      </div>
    </section>
  )
}
