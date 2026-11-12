import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  Clock,
  Layers,
  MessageSquare,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react'
import { BrandMark } from './BrandMark'
import './ProcessPresentation.css'

const moments = [
  {
    code: '01',
    name: 'Escopo claro',
    deliverable: 'Prioridades definidas',
    description:
      'Definimos juntos o que entra agora e o que fica planejado para a próxima evolução.',
    artifact: 'O ponto de partida organizado',
    subtitle: 'Escopo da Primeira Versão (v1.0)',
    caption: 'Primeiro, o essencial para operar. A evolução já nasce com direção.',
    status: 'Prioridades alinhadas com você',
  },
  {
    code: '02',
    name: 'Você vê e valida',
    deliverable: 'Prévia navegável',
    description: 'Você experimenta telas e fluxos reais antes de avançarmos para a próxima etapa.',
    artifact: 'Uma solução que você já consegue testar',
    subtitle: 'Ambiente de Validação Compartilhada',
    caption: 'Nada de caixa-preta: cada avanço passa pelo olhar de quem conhece o negócio.',
    status: 'Fluxo validado em conjunto',
  },
  {
    code: '03',
    name: 'Decisões em conjunto',
    deliverable: 'Impacto transparente',
    description:
      'Surgiu uma nova ideia? Avaliamos juntos escopo, prazo e investimento sem surpresas.',
    artifact: 'Cada escolha tem contexto claro',
    subtitle: 'Análise de Nova Demanda',
    caption: 'Qualquer ajuste é combinado com transparência antes de ser construído.',
    status: 'Aprovado pelas duas pontas',
  },
  {
    code: '04',
    name: 'Próximos passos definidos',
    deliverable: 'Operação & evolução',
    description:
      'Na entrega, sua equipe recebe orientação prática e um plano claro de continuidade.',
    artifact: 'Pronto para fazer parte da rotina',
    subtitle: 'Roteiro de Entrada em Operação',
    caption: 'Orientação para usar hoje e estrutura pronta para crescer amanhã.',
    status: 'Entrega acompanhada e ativa',
  },
] as const

function ProjectArtifact({ moment }: { moment: number }) {
  if (moment === 0) {
    const scopeItems = [
      { label: 'Cadastro unificado de clientes', tag: 'Essencial · v1' },
      { label: 'Controle central de pedidos e status', tag: 'Essencial · v1' },
      { label: 'Painel de visão diária da operação', tag: 'Essencial · v1' },
    ]
    return (
      <div className="nt-proc-stage nt-proc-scope">
        <div className="nt-proc-subhead">
          <span>INCLUÍDO NA PRIMEIRA ENTREGA</span>
          <span>3 MÓDULOS BASE</span>
        </div>
        <div className="nt-proc-list">
          {scopeItems.map((item) => (
            <div className="nt-proc-row" key={item.label}>
              <span className="nt-proc-check" aria-hidden="true">
                <Check size={13} />
              </span>
              <span className="nt-proc-row-title">{item.label}</span>
              <span className="nt-proc-pill">{item.tag}</span>
            </div>
          ))}
        </div>
        <div className="nt-proc-deferred">
          <Plus size={14} aria-hidden="true" />
          <div>
            <strong>Integrações externas e automação financeira</strong>
            <span>Mapeado e reservado para a Fase 02, sem travar sua estreia</span>
          </div>
          <small>Fase 02</small>
        </div>
      </div>
    )
  }

  if (moment === 1) {
    return (
      <div className="nt-proc-stage nt-proc-proto">
        <div className="nt-proc-proto-bar">
          <span>Visão de Pedidos · Homologação</span>
          <span className="nt-proc-proto-cta">
            <Plus size={11} aria-hidden="true" /> Novo pedido
          </span>
        </div>
        <div className="nt-proc-metrics">
          <div className="nt-proc-metric">
            <small>Em produção</small>
            <strong>12</strong>
            <span>Atualizado agora</span>
          </div>
          <div className="nt-proc-metric">
            <small>Concluídos na semana</small>
            <strong>28</strong>
            <span>Fluxo validado</span>
          </div>
        </div>
        <div className="nt-proc-orders">
          <div className="nt-proc-order-item">
            <span className="nt-proc-dot is-live" aria-hidden="true" />
            <strong>Pedido #024</strong>
            <span>Cliente corporativo</span>
            <small>Em andamento</small>
          </div>
          <div className="nt-proc-order-item">
            <span className="nt-proc-dot" aria-hidden="true" />
            <strong>Pedido #023</strong>
            <span>Entrega confirmada</span>
            <small>Finalizado</small>
          </div>
        </div>
        <div className="nt-proc-feedback">
          <MessageSquare size={14} aria-hidden="true" />
          <span>“Ficou direto para nossa equipe usar no balcão e no celular.”</span>
          <span className="nt-proc-verified">
            <CheckCheck size={13} aria-hidden="true" /> Validado
          </span>
        </div>
      </div>
    )
  }

  if (moment === 2) {
    return (
      <div className="nt-proc-stage nt-proc-decision">
        <div className="nt-proc-request">
          <MessageSquare size={15} aria-hidden="true" />
          <div>
            <small>NOVA IDEIA DURANTE O PROJETO</small>
            <strong>“E se o cliente receber aviso automático no WhatsApp a cada etapa?”</strong>
          </div>
        </div>

        <div className="nt-proc-subhead">
          <span>AVALIAÇÃO TRANSPARENTE ANTES DE CONSTRUIR</span>
          <SlidersHorizontal size={12} aria-hidden="true" />
        </div>

        <div className="nt-proc-impact-grid">
          <div className="nt-proc-impact-card">
            <Layers size={13} aria-hidden="true" />
            <small>Escopo</small>
            <strong>+1 gatilho</strong>
            <span>Integrado ao status</span>
          </div>
          <div className="nt-proc-impact-card">
            <Clock size={13} aria-hidden="true" />
            <small>Prazo</small>
            <strong>Alinhado</strong>
            <span>Sem surpresa na entrega</span>
          </div>
          <div className="nt-proc-impact-card">
            <ShieldCheck size={13} aria-hidden="true" />
            <small>Decisão</small>
            <strong>Conjunta</strong>
            <span>Você aprova antes</span>
          </div>
        </div>

        <div className="nt-proc-joint">
          <div className="nt-proc-avatars" aria-hidden="true">
            <span className="nt-proc-avatar-client">Você</span>
            <span className="nt-proc-avatar-nt">
              <BrandMark />
            </span>
          </div>
          <span>Você decide se entra agora ou na próxima fase, com total visibilidade.</span>
        </div>
      </div>
    )
  }

  return (
    <div className="nt-proc-stage nt-proc-handover">
      <div className="nt-proc-subhead">
        <span>CHECKLIST DE ENTRADA EM OPERAÇÃO</span>
        <span>100% PRONTO</span>
      </div>
      <div className="nt-proc-timeline">
        <div className="nt-proc-timeline-step">
          <span className="nt-proc-step-badge" aria-hidden="true">
            <Check size={12} />
          </span>
          <div>
            <strong>Solução publicada e revisada</strong>
            <span>Ambiente seguro, rápido e testado em computadores e celulares.</span>
          </div>
        </div>
        <div className="nt-proc-timeline-step">
          <span className="nt-proc-step-badge" aria-hidden="true">
            <Check size={12} />
          </span>
          <div>
            <strong>Orientações práticas de uso</strong>
            <span>Sua equipe entende cada fluxo sem depender de linguagem técnica.</span>
          </div>
        </div>
        <div className="nt-proc-timeline-step">
          <span className="nt-proc-step-badge is-next" aria-hidden="true">
            <ArrowRight size={12} />
          </span>
          <div>
            <strong>Continuidade e evolução combinadas</strong>
            <span>Canais de suporte, acompanhamento e próximos avanços alinhados.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProcessPresentation() {
  const [active, setActive] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const moment = moments[active]

  function selectStep(index: number, focusTab = false) {
    const normalized = ((index % moments.length) + moments.length) % moments.length
    setActive(normalized)
    if (focusTab) {
      tabs.current[normalized]?.focus()
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      selectStep(index + 1, true)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      selectStep(index - 1, true)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectStep(0, true)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectStep(moments.length - 1, true)
    }
  }

  return (
    <section
      id="processo"
      className="section process-section nt-process-section"
      aria-labelledby="work-title"
    >
      <div className="container">
        <header className="nt-proc-header">
          <div className="section-heading">
            <span className="eyebrow">
              <span />
              COMO TRABALHAMOS NA PRÁTICA
            </span>
            <h2 id="work-title">
              Você faz parte. <br />
              <span>Do primeiro plano ao próximo passo.</span>
            </h2>
          </div>
          <p className="nt-proc-lead">
            Sem etapas confusas nem termos distantes: você acompanha cada decisão em quatro momentos
            claros, sabendo sempre o que está sendo feito e por quê.
          </p>
        </header>

        <div className="nt-proc-grid">
          {/* Coluna Esquerda: Trilha Executiva de 4 Momentos */}
          <div className="nt-proc-nav">
            <div
              role="tablist"
              aria-label="Etapas de como trabalhamos"
              aria-orientation="vertical"
              className="nt-proc-tablist"
            >
              {moments.map((item, index) => {
                const isSelected = active === index
                return (
                  <button
                    key={item.code}
                    type="button"
                    role="tab"
                    id={`work-tab-${index}`}
                    aria-controls="work-example"
                    aria-selected={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    ref={(el) => {
                      tabs.current[index] = el
                    }}
                    className="nt-proc-tab"
                    onClick={() => selectStep(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                    <span className="nt-proc-tab-rail" aria-hidden="true">
                      <span className="nt-proc-tab-num">{item.code}</span>
                    </span>
                    <span className="nt-proc-tab-content">
                      <span className="nt-proc-tab-head">
                        <strong>{item.name}</strong>
                        <small>{item.deliverable}</small>
                      </span>
                      <span className="nt-proc-tab-desc">{item.description}</span>
                    </span>
                    <ArrowRight size={15} className="nt-proc-tab-arrow" aria-hidden="true" />
                  </button>
                )
              })}
            </div>
            <p className="nt-proc-note">
              Quatro momentos conectados · Clique em cada etapa para ver como funciona na prática.
            </p>
          </div>

          {/* Coluna Direita: Console Arquitetônico de Co-Criação */}
          <div
            id="work-example"
            role="tabpanel"
            aria-labelledby={`work-tab-${active}`}
            aria-live="polite"
            className="nt-proc-console-wrap"
          >
            <div className="nt-proc-console" key={moment.code}>
              <div className="nt-proc-console-topbar">
                <div className="nt-proc-console-brand">
                  <span className="nt-proc-console-emblem" aria-hidden="true">
                    <BrandMark />
                  </span>
                  <div>
                    <strong>PORTAL DE PEDIDOS</strong>
                    <span>Exemplo prático · {moment.subtitle}</span>
                  </div>
                </div>
                <div className="nt-proc-console-progress" aria-label={`Etapa ${active + 1} de 4`}>
                  <span className="nt-proc-edition">{moment.code} / 04</span>
                  <div className="nt-proc-bars" aria-hidden="true">
                    {moments.map((step, i) => (
                      <span key={step.code} data-filled={i <= active ? 'true' : 'false'} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="nt-proc-console-body">
                <h3>{moment.artifact}</h3>
                <ProjectArtifact moment={active} />
              </div>

              <div className="nt-proc-console-footer">
                <div className="nt-proc-status">
                  <span className="nt-proc-status-dot" aria-hidden="true" />
                  <span>{moment.status}</span>
                </div>
                <div className="nt-proc-step-controls">
                  <button
                    type="button"
                    className="nt-proc-step-btn"
                    onClick={() => selectStep(active - 1)}
                    aria-label="Ver momento anterior"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    type="button"
                    className="nt-proc-step-btn"
                    onClick={() => selectStep(active + 1)}
                    aria-label="Ver próximo momento"
                  >
                    <span>Próximo</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            <p className="nt-proc-caption">
              <span className="nt-proc-caption-line" aria-hidden="true" />
              {moment.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
