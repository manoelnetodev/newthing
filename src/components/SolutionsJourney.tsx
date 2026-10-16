import { useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Globe,
  Pause,
  Play,
  Rocket,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react'
import { BriefModal } from './BriefModal'
import { JourneyDemo } from './JourneyDemo'
import { JourneyPath } from './JourneyPath'
import { Modal } from './ui'
import './SolutionsJourney.css'
import './JourneyExplorer.css'

const phases = [
  {
    label: 'IDEALIZAÇÃO',
    title: 'Um caminho claro para começar.',
    icon: Compass,
    text: 'Escutamos o que você deseja conquistar, entendemos os desafios e organizamos prioridades. A ideia ganha direção, escopo e próximos passos.',
    items: [
      'Objetivos e desafios do seu negócio',
      'Escopo, prioridades e próximos passos',
      'Protótipo para visualizar sua ideia',
    ],
    action: 'Explorar o planejamento',
    detail: 'Uma direção clara antes de construir.',
    description:
      'Conectamos sua ambição às necessidades de quem vai usar a solução. Juntos, definimos o que construir primeiro e como avaliar o avanço.',
    delivery: 'Plano de projeto com escopo, prioridades e critérios de sucesso.',
    cta: 'Começar pelo meu objetivo',
    stage: 'Tenho uma ideia',
  },
  {
    label: 'CONSTRUÇÃO',
    title: 'Uma solução pronta para usar.',
    icon: Code2,
    text: 'Sites, sistemas e automações feitos para a sua realidade. O planejamento ganha forma em uma solução que você acompanha construir.',
    items: [
      'Sites, lojas e portais de atendimento',
      'Sistemas de gestão e plataformas SaaS',
      'Automações e integração de ferramentas',
    ],
    action: 'Explorar a construção',
    detail: 'Da visão à primeira versão em uso.',
    description:
      'Design, desenvolvimento e testes seguem o mesmo plano. Você acompanha as entregas e participa das decisões ao longo da construção.',
    delivery: 'Solução validada, publicada e acompanhada na entrada em operação.',
    cta: 'Planejar a construção',
    stage: 'Quero construir um sistema',
  },
  {
    label: 'REALIZAÇÃO & CONTINUIDADE',
    title: 'Sua visão realizada na prática.',
    icon: Rocket,
    text: 'A conquista aparece quando a tecnologia faz sentido na rotina. Validamos a solução com você, orientamos o uso e planejamos o acompanhamento para apoiar os objetivos que deram início à ideia.',
    items: [
      'Validação com quem vai usar a solução',
      'Orientações para começar com confiança',
      'Acompanhamento e melhorias planejados',
    ],
    action: 'Explorar a realização',
    detail: 'A conquista se revela no dia a dia.',
    description:
      'Conferimos a experiência com quem vai usar, orientamos a entrada em operação e alinhamos a continuidade. O retorno da equipe mostra o que já funciona e onde uma melhoria pode aproximar a empresa dos seus objetivos.',
    delivery: 'Solução validada em uso, orientações e próximos passos de acompanhamento definidos.',
    cta: 'Planejar entrega e continuidade',
    stage: 'Quero evoluir um produto',
  },
]

const examples = [
  {
    kind: 'system' as const,
    label: 'Sistema de gestão',
    summary: 'Pedidos, equipes e indicadores conectados.',
    name: 'NEXO',
    icon: Code2,
    dream: 'Quero ter mais controle da minha empresa.',
    stories: [
      {
        title: 'Sua empresa organizada começa com um plano.',
        text: 'Imagine pedidos, estoque e financeiro seguindo o mesmo caminho. Primeiro, mapeamos sua rotina e desenhamos um sistema que faça sentido para a sua equipe.',
        delivery: 'Mapa dos processos, protótipo das telas e escopo da primeira versão.',
        benefit: 'Você enxerga o que será construído antes de investir na execução.',
      },
      {
        title: 'Pedidos, equipe e operação no mesmo lugar.',
        text: 'Um sistema sob medida para acompanhar pedidos, consultar clientes e organizar a rotina. O exemplo ao lado mostra como essas informações podem se encontrar em uma interface clara.',
        delivery: 'Sistema com cadastros, pedidos, permissões e painel de acompanhamento.',
        benefit: 'Mais clareza para a equipe acompanhar o trabalho e tomar decisões.',
      },
      {
        title: 'Controle para decidir e crescer.',
        text: 'Pedidos, unidades e responsabilidades ficam visíveis para a equipe. Os relatórios apoiam as decisões, e a experiência de uso orienta os próximos ajustes e integrações.',
        delivery: 'Plano de melhorias, visão por unidade e controle de acesso por equipe.',
        benefit: 'Uma base organizada para crescer com continuidade e controle.',
      },
    ],
    steps: [
      [
        'Entender a rotina',
        'Mapeamos tarefas, pessoas e informações que precisam estar conectadas.',
      ],
      [
        'Definir a primeira versão',
        'Priorizamos cadastros, fluxo de trabalho e indicadores essenciais.',
      ],
      [
        'Combinar o que é sucesso',
        'Definimos como acompanhar a organização e a visibilidade da operação.',
      ],
    ],
    build: [
      ['Desenhar a experiência', 'Validamos telas e fluxos com quem vai usar o sistema.'],
      [
        'Desenvolver e testar',
        'Construímos os módulos, permissões e integrações previstos no projeto.',
      ],
      ['Colocar em operação', 'Apoiamos a configuração inicial e a adaptação da equipe.'],
    ],
    grow: [
      ['Ouvir a equipe', 'Reunimos dificuldades e oportunidades percebidas na rotina.'],
      [
        'Priorizar melhorias',
        'Planejamos novos relatórios, módulos e integrações conforme a necessidade.',
      ],
      [
        'Acompanhar a evolução',
        'Revisamos o desempenho e o impacto das mudanças nos objetivos definidos.',
      ],
    ],
  },
  {
    kind: 'website' as const,
    label: 'Site e presença digital',
    summary: 'Sua marca com presença e um caminho até o contato.',
    name: 'AURORA',
    icon: Globe,
    dream: 'Quero apresentar meu negócio e abrir novas oportunidades.',
    stories: [
      {
        title: 'Sua marca com uma mensagem e um destino claros.',
        text: 'Antes de desenhar páginas, entendemos quem precisa encontrar você e por quê. Organizamos seus serviços, seus diferenciais e o caminho até a primeira conversa.',
        delivery: 'Estrutura do site, direção visual e protótipo da jornada de contato.',
        benefit: 'Cada página tem um propósito dentro da apresentação do seu negócio.',
      },
      {
        title: 'Uma presença à altura do que você entrega.',
        text: 'Neste exemplo de consultoria, identidade, conteúdo e navegação trabalham juntos. Um site responsivo apresenta a empresa e conduz o visitante à próxima conversa.',
        delivery: 'Site com apresentação de serviços, versão para celular e canais de contato.',
        benefit: 'Uma experiência profissional para apresentar sua marca com confiança.',
      },
      {
        title: 'Uma presença que abre caminho para novas conversas.',
        text: 'O site ganha páginas de serviço e uma jornada de diagnóstico mais direta. Acompanhamos como as pessoas navegam para aprimorar a experiência e os pontos de contato.',
        delivery: 'Novas páginas, formulário de diagnóstico e plano de acompanhamento.',
        benefit: 'Um caminho mais claro para transformar interesse em oportunidade.',
      },
    ],
    steps: [
      [
        'Conhecer seu público',
        'Entendemos sua proposta de valor e as pessoas que você quer alcançar.',
      ],
      ['Planejar a experiência', 'Organizamos serviços, conteúdo e o caminho até o contato.'],
      ['Dar forma à ideia', 'Criamos um protótipo para validar a apresentação da sua marca.'],
    ],
    build: [
      ['Criar o visual', 'Desenvolvemos uma identidade digital alinhada ao seu posicionamento.'],
      [
        'Construir o site',
        'Implementamos páginas responsivas, formulários e integrações do escopo.',
      ],
      [
        'Preparar o lançamento',
        'Testamos navegação, acessibilidade e desempenho antes da publicação.',
      ],
    ],
    grow: [
      ['Entender a navegação', 'Analisamos os caminhos de visita e as dúvidas dos clientes.'],
      [
        'Aprimorar a experiência',
        'Ajustamos conteúdo, páginas e pontos de contato com base nas evidências.',
      ],
      [
        'Expandir com direção',
        'Planejamos novas áreas, serviços ou integrações conforme o negócio cresce.',
      ],
    ],
  },
  {
    kind: 'automation' as const,
    label: 'Automação de processos',
    summary: 'Ferramentas conectadas. Pessoas no controle.',
    name: 'FLUXO',
    icon: Workflow,
    dream: 'Quero que minha equipe tenha tempo para o que importa.',
    stories: [
      {
        title: 'Uma rotina mais fluida começa pelo caminho certo.',
        text: 'Uma solicitação chega, alguém copia os dados e repassa à equipe. Mapeamos esse percurso para conectar as ferramentas, com regras claras e revisão humana onde ela importa.',
        delivery: 'Mapa do fluxo, regras de integração e pontos de revisão definidos.',
        benefit: 'Você identifica o que pode automatizar sem perder o controle da operação.',
      },
      {
        title: 'O atendimento segue. A equipe ganha contexto.',
        text: 'O exemplo conecta a entrada de uma solicitação ao responsável pelo atendimento. Dados organizados, direcionamento e confirmação seguem um fluxo, com revisão para exceções.',
        delivery: 'Fluxo integrado, validação de dados, notificações e histórico de ações.',
        benefit: 'Menos repasses manuais e mais continuidade no atendimento ao cliente.',
      },
      {
        title: 'Mais fluidez, com a equipe no controle.',
        text: 'O histórico mostra o que foi concluído e o que precisa da equipe. Usamos essa visibilidade para ajustar regras e planejar novas automações com segurança.',
        delivery: 'Monitoramento, tratamento de exceções e prioridades de melhoria.',
        benefit: 'Mais visibilidade para manter a operação confiável e evoluir o processo.',
      },
    ],
    steps: [
      [
        'Encontrar os gargalos',
        'Identificamos tarefas repetitivas e etapas que dependem de trabalho manual.',
      ],
      [
        'Conectar as ferramentas',
        'Avaliamos os sistemas existentes e as possibilidades de integração.',
      ],
      ['Planejar com controle', 'Definimos regras, exceções e pontos de revisão pela equipe.'],
    ],
    build: [
      ['Desenhar o fluxo', 'Organizamos gatilhos, ações e validações de cada processo.'],
      [
        'Integrar e testar',
        'Conectamos as ferramentas e verificamos cenários de sucesso e de falha.',
      ],
      [
        'Ativar com acompanhamento',
        'Colocamos o fluxo em uso com registros e orientações para a equipe.',
      ],
    ],
    grow: [
      [
        'Acompanhar a execução',
        'Revisamos falhas, exceções e etapas que ainda exigem esforço manual.',
      ],
      ['Refinar as regras', 'Ajustamos os fluxos às mudanças de rotina e às novas necessidades.'],
      [
        'Ampliar a automação',
        'Priorizamos novos processos com base no ganho observado e na viabilidade.',
      ],
    ],
  },
]

export function SolutionsJourney({
  initialExample = 0,
  initialPhase = 0,
  initialOpen = false,
}: {
  initialExample?: number
  initialPhase?: number
  initialOpen?: boolean
}) {
  const [selected, setSelected] = useState(initialPhase)
  const [exampleIndex, setExampleIndex] = useState(initialExample)
  const [previewOpen, setPreviewOpen] = useState(initialOpen)
  const [briefOpen, setBriefOpen] = useState(false)
  const [lightsPlaying, setLightsPlaying] = useState(true)
  const previewOpener = useRef<HTMLElement | null>(null)
  const previewScroll = useRef<HTMLDivElement>(null)
  const phase = phases[selected]
  const example = examples[exampleIndex]
  const story = example.stories[selected]
  const steps = selected === 0 ? example.steps : selected === 1 ? example.build : example.grow

  function openPreview(index: number, phaseIndex: number) {
    previewOpener.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    setExampleIndex(index)
    setSelected(phaseIndex)
    setPreviewOpen(true)
  }

  function restorePreviewFocus() {
    requestAnimationFrame(() => {
      const opener = previewOpener.current
      const target = opener?.isConnected
        ? opener
        : document.getElementById(`journey-launch-${example.kind}`)
      target?.focus({ preventScroll: true })
    })
  }

  function closePreview() {
    setPreviewOpen(false)
    restorePreviewFocus()
  }

  function changePreview(index: number, phaseIndex: number) {
    setExampleIndex(index)
    setSelected(phaseIndex)
    previewScroll.current?.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <section id="solucoes" className="section journey-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">
            <span />
            VISÃO, EXECUÇÃO E CONQUISTA
          </span>
          <h2>
            O que você imagina merece acontecer.
            <br />
            <span>Vamos construir esse caminho juntos.</span>
          </h2>
          <p>
            Unimos visão, planejamento e tecnologia para transformar o que você imagina em um
            projeto real. Com clareza em cada decisão e parceria em cada etapa.
          </p>
        </div>

        <div className="journey-motion-controls">
          <span>
            VISÃO <ArrowRight size={11} /> PLANO <ArrowRight size={11} /> SOLUÇÃO{' '}
            <ArrowRight size={11} /> REALIZAÇÃO
          </span>
          <button
            type="button"
            aria-label={
              lightsPlaying ? 'Pausar animação do percurso' : 'Continuar animação do percurso'
            }
            aria-pressed={!lightsPlaying}
            onClick={() => setLightsPlaying((playing) => !playing)}
          >
            {lightsPlaying ? <Pause size={12} /> : <Play size={12} />}
            {lightsPlaying ? 'Pausar luzes' : 'Continuar luzes'}
          </button>
        </div>
        <div
          className="journey-cards"
          aria-label="Etapas do seu projeto"
          data-light-motion={lightsPlaying ? 'running' : 'paused'}
        >
          {phases.map(({ label, title, text, icon: Icon, items, action }, index) => (
            <article
              className={`journey-card ${selected === index ? 'is-selected' : ''}`}
              key={label}
            >
              <div className="journey-card-top">
                <span className="journey-icon">
                  <Icon size={24} strokeWidth={1.5} />
                </span>
                <span className="journey-number">
                  0{index + 1}
                  <span> / 03</span>
                </span>
              </div>
              <span className="journey-label">{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <JourneyPath
                phase={index}
                active={selected === index}
                onExplore={() => openPreview(exampleIndex, index)}
              />
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    <Check size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={action}
                onClick={() => openPreview(exampleIndex, index)}
              >
                {action}
                <ArrowUpRight size={16} />
              </button>
            </article>
          ))}
        </div>

        <div id="journey-practice" className="journey-practice journey-launcher">
          <div className="journey-example-heading">
            <span className="journey-label">VEJA COMO ACONTECE NA PRÁTICA</span>
            <span>Escolha uma possibilidade para explorar.</span>
          </div>
          <div className="journey-launch-grid">
            {examples.map(({ kind, label, icon: Icon, summary, name }, index) => (
              <button
                type="button"
                id={`journey-launch-${kind}`}
                className="journey-launch-card"
                key={kind}
                aria-haspopup="dialog"
                onClick={() => openPreview(index, 1)}
              >
                <span className="journey-launch-top">
                  <span className="journey-launch-icon">
                    <Icon size={19} />
                  </span>
                  <small>
                    {name} / 0{index + 1}
                  </small>
                </span>
                <span className="journey-launch-copy">
                  <strong>{label}</strong>
                  <span>{summary}</span>
                </span>
                <span className="journey-launch-action">
                  Explorar exemplo <ArrowUpRight size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>
        {previewOpen && (
          <Modal
            title={example.label}
            description="Explore a solução e as etapas de construção."
            className="journey-preview-modal"
            onClose={closePreview}
          >
            <div className="journey-preview-controls">
              <div className="journey-examples" role="tablist" aria-label="Exemplo de projeto">
                {examples.map(({ kind, label, icon: Icon }, index) => (
                  <button
                    type="button"
                    key={label}
                    role="tab"
                    aria-label={label}
                    id={`journey-example-${kind}-${index}`}
                    aria-selected={exampleIndex === index}
                    aria-controls="journey-detail-content"
                    tabIndex={exampleIndex === index ? 0 : -1}
                    onKeyDown={(event) => {
                      const nextIndex =
                        event.key === 'ArrowRight'
                          ? (index + 1) % examples.length
                          : event.key === 'ArrowLeft'
                            ? (index + examples.length - 1) % examples.length
                            : event.key === 'Home'
                              ? 0
                              : event.key === 'End'
                                ? examples.length - 1
                                : null
                      if (nextIndex === null) return
                      event.preventDefault()
                      changePreview(nextIndex, selected)
                      const tabs =
                        event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                          '[role="tab"]',
                        )
                      tabs?.[nextIndex]?.focus()
                    }}
                    onClick={() => changePreview(index, selected)}
                  >
                    <Icon size={15} />
                    <span className="journey-tab-label">{label}</span>
                    <span className="journey-tab-short" aria-hidden="true">
                      {['Gestão', 'Website', 'Automação'][index]}
                    </span>
                  </button>
                ))}
              </div>
              <div className="journey-phase-nav" role="group" aria-label="Etapa do exemplo">
                {['Idealizar', 'Construir', 'Realizar'].map((label, index) => (
                  <button
                    type="button"
                    key={label}
                    aria-pressed={selected === index}
                    aria-controls="journey-detail-content"
                    onClick={() => changePreview(exampleIndex, index)}
                  >
                    <span>0{index + 1}</span>
                    {label}
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
            <div className="journey-preview-scroll" ref={previewScroll}>
              <div
                id="journey-detail-content"
                className="journey-detail"
                role="tabpanel"
                aria-labelledby={`journey-example-${example.kind}-${exampleIndex}`}
                tabIndex={0}
              >
                <div className="journey-demo-reveal" key={`demo-${selected}-${exampleIndex}`}>
                  <JourneyDemo kind={example.kind} phase={selected} />
                </div>
                <div className="journey-detail-copy" key={`copy-${selected}-${exampleIndex}`}>
                  <div className="journey-detail-intro">
                    <span className="journey-detail-stage">
                      0{selected + 1} <span>/ {phase.label}</span>
                    </span>
                    <h3>{story.title}</h3>
                    <p>{story.text}</p>
                    <div className="journey-dream">
                      <Target size={18} />
                      <div>
                        <span>O OBJETIVO DO CLIENTE</span>
                        <p>“{example.dream}”</p>
                      </div>
                    </div>
                  </div>
                  <ol className="journey-deliverables">
                    {steps.map(([title, text], index) => (
                      <li key={title}>
                        <span className="journey-step-number">{index + 1}</span>
                        <div>
                          <h4>{title}</h4>
                          <p>{text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="journey-benefit">
                    <Sparkles size={15} />
                    <span>{story.benefit}</span>
                  </p>
                  <div className="journey-preview-delivery">
                    <Check size={15} />
                    <p>
                      <strong>O que você leva desta etapa</strong>
                      {story.delivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="journey-preview-footer">
              <span>Uma ideia parecida com a sua?</span>
              <button
                type="button"
                onClick={() => {
                  setPreviewOpen(false)
                  setBriefOpen(true)
                }}
              >
                {phase.cta}
                <ArrowUpRight size={17} />
              </button>
            </div>
            <p className="journey-announcement" role="status">
              Exibindo {example.label}:{' '}
              {['idealização e plano', 'solução em uso', 'realização e continuidade'][selected]}.
            </p>
          </Modal>
        )}
        <p className="journey-footnote">
          <span className="journey-footnote-dot" />
          Uma visão compartilhada. Um plano possível. Evolução com propósito.
          <ArrowRight size={14} aria-hidden="true" />
        </p>
      </div>
      {briefOpen && (
        <BriefModal
          onClose={() => {
            setBriefOpen(false)
            restorePreviewFocus()
          }}
          initialStage={
            selected === 1 && exampleIndex === 1
              ? 'Preciso de um site ou landing page'
              : selected === 1 && exampleIndex === 2
                ? 'Quero automatizar processos'
                : phase.stage
          }
          initialProject={`Meu objetivo: ${example.dream}\nProjeto: ${example.label}.\nEtapa que quero explorar: ${phase.label.toLowerCase()}.\n\nSobre o meu negócio: `}
        />
      )}
    </section>
  )
}
