import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowDown, ArrowRight, Check, CheckCheck, MessageSquare, Plus } from 'lucide-react'
import './ProcessPresentation.css'

const moments = [
  {
    name: 'Escopo claro',
    description: 'Definimos juntos o que entra agora e o que pode ficar para depois.',
    artifact: 'O ponto de partida',
    caption: 'Primeiro, o essencial. A evolução vem com direção.',
    status: 'Prioridades alinhadas',
  },
  {
    name: 'Você vê e valida',
    description: 'Você experimenta a solução e participa das decisões antes de avançarmos.',
    artifact: 'Uma ideia que você já pode tocar',
    caption: 'Uma prévia concreta abre espaço para o seu olhar.',
    status: 'Uma entrega, uma conversa',
  },
  {
    name: 'Decisões em conjunto',
    description: 'Uma nova ideia? Alinhamos o impacto no escopo, no prazo e no investimento.',
    artifact: 'Cada escolha tem contexto',
    caption: 'O próximo passo é uma decisão compartilhada.',
    status: 'Combinado antes de construir',
  },
  {
    name: 'Próximos passos definidos',
    description: 'Na entrega, você sabe como começar e qual continuidade foi combinada.',
    artifact: 'Pronto para fazer parte da rotina',
    caption: 'Orientação para usar. Um caminho para evoluir.',
    status: 'Continuidade alinhada',
  },
] as const

function ProjectArtifact({ moment }: { moment: number }) {
  if (moment === 0) {
    return (
      <div className="work-artifact-body work-scope">
        <span className="work-artifact-label">PRIMEIRA VERSÃO</span>
        {['Cadastro de clientes', 'Controle de pedidos', 'Visão da operação'].map((item) => (
          <div className="work-scope-item" key={item}>
            <Check size={15} />
            <span>{item}</span>
          </div>
        ))}
        <div className="work-later">
          <Plus size={13} />
          <span>Integrações</span>
          <small>Próxima etapa</small>
        </div>
      </div>
    )
  }
  if (moment === 1) {
    return (
      <div className="work-artifact-body work-prototype">
        <div className="work-prototype-toolbar">
          <span>Pedidos</span>
          <span className="work-new-order">
            <Plus size={10} /> Novo pedido
          </span>
        </div>
        <div className="work-prototype-metrics">
          <span>
            <small>Em andamento</small>
            <strong>12</strong>
          </span>
          <span>
            <small>Entregues</small>
            <strong>28</strong>
          </span>
        </div>
        <div className="work-prototype-row">
          <i />
          <span>Pedido #024</span>
          <small>Em produção</small>
        </div>
        <div className="work-prototype-row">
          <i />
          <span>Pedido #023</span>
          <small>Concluído</small>
        </div>
        <div className="work-feedback">
          <MessageSquare size={14} />
          <span>É assim que nossa equipe trabalha.</span>
          <CheckCheck size={13} />
        </div>
      </div>
    )
  }
  if (moment === 2) {
    return (
      <div className="work-artifact-body work-decision">
        <div className="work-request">
          <MessageSquare size={15} />
          <span>E se enviarmos avisos automáticos?</span>
        </div>
        <div className="work-decision-connector">
          <ArrowDown size={17} />
        </div>
        <span className="work-artifact-label">ANTES DE AVANÇAR</span>
        <div className="work-impact">
          <span>
            Escopo <Check size={12} />
          </span>
          <span>
            Prazo <Check size={12} />
          </span>
          <span>
            Investimento <Check size={12} />
          </span>
        </div>
        <div className="work-shared-choice">
          <span className="work-person">V</span>
          <span className="work-person work-person-brand">N</span>
          <span>Uma escolha feita em conjunto.</span>
        </div>
      </div>
    )
  }
  return (
    <div className="work-artifact-body work-handover">
      <span className="work-artifact-label">DA ENTREGA AO USO</span>
      <div className="work-handover-path">
        <div>
          <span className="work-path-marker">
            <Check size={12} />
          </span>
          <span>
            Solução validada<small>Pronta para começar</small>
          </span>
        </div>
        <div>
          <span className="work-path-marker">
            <Check size={12} />
          </span>
          <span>
            Orientações de uso<small>Sua equipe no controle</small>
          </span>
        </div>
        <div>
          <span className="work-path-marker work-path-next">
            <ArrowRight size={12} />
          </span>
          <span>
            Continuidade combinada<small>Suporte e evolução alinhados</small>
          </span>
        </div>
      </div>
    </div>
  )
}

export function ProcessPresentation() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const moment = moments[active]

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % moments.length
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
      next = (index + moments.length - 1) % moments.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = moments.length - 1
    else return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section
      id="processo"
      className="section process-section work-presentation"
      aria-labelledby="work-title"
    >
      <div className="container">
        <header className="work-heading">
          <span className="eyebrow">
            <span />
            COMO TRABALHAMOS NA PRÁTICA
          </span>
          <h2 id="work-title">
            Você faz parte.
            <br />
            <span>Do primeiro plano ao próximo passo.</span>
          </h2>
        </header>
        <div className="work-composition">
          <div className="work-navigation">
            <div
              role="tablist"
              aria-label="Explore como trabalhamos"
              aria-orientation="vertical"
              className="work-tabs"
            >
              {moments.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  id={`work-tab-${index}`}
                  aria-controls="work-example"
                  aria-selected={active === index}
                  tabIndex={active === index ? 0 : -1}
                  ref={(element) => {
                    tabs.current[index] = element
                  }}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => navigate(event, index)}
                >
                  <span className="work-tab-index">0{index + 1}</span>
                  <span className="work-tab-text">
                    <span>{item.name}</span>
                    {active === index && (
                      <span className="work-tab-description">{item.description}</span>
                    )}
                  </span>
                  <ArrowRight size={16} className="work-tab-arrow" />
                </button>
              ))}
            </div>
            <span className="work-explore-note">Quatro momentos. Uma construção com você.</span>
          </div>
          <div
            id="work-example"
            role="tabpanel"
            aria-labelledby={`work-tab-${active}`}
            tabIndex={0}
            className="work-example"
          >
            <div className="work-scene" key={active}>
              <span className="work-scene-number" aria-hidden="true">
                0{active + 1}
              </span>
              <div className="work-document">
                <div className="work-document-top">
                  <span className="work-document-mark">
                    N<span>.</span>
                  </span>
                  <span>
                    PORTAL DE PEDIDOS<small>Exemplo de projeto</small>
                  </span>
                  <span className="work-document-edition">0{active + 1} / 04</span>
                </div>
                <h3>{moment.artifact}</h3>
                <ProjectArtifact moment={active} />
                <div className="work-document-status">
                  <span />
                  <span>{moment.status}</span>
                  <Check size={13} />
                </div>
              </div>
              <div className="work-scene-caption">
                <span className="work-caption-line" />
                {moment.caption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
