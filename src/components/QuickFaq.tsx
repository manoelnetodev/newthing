import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Code2,
  Compass,
  Lightbulb,
  MessageSquare,
  Plug,
  Route,
  ShieldCheck,
  Wallet,
  Layers,
} from 'lucide-react'
import './QuickFaq.css'
import { BrandMark } from './BrandMark'

const topics = [
  {
    label: 'Só tenho uma ideia',
    icon: Lightbulb,
    summary:
      'Você não precisa chegar com tudo definido. Entendemos o que deseja conquistar, organizamos as prioridades e desenhamos um primeiro escopo. Sua visão vira um ponto de partida concreto.',
    next: 'Conte o objetivo e o principal desafio que quer resolver.',
  },
  {
    label: 'Posso começar pequeno?',
    icon: Layers,
    summary:
      'Sim. Uma primeira versão pode resolver a necessidade mais importante, com espaço para evoluir. Por exemplo: começar com clientes e pedidos, validar o uso e só depois integrar o estoque.',
    next: 'Escolhemos juntos o que precisa funcionar primeiro.',
  },
  {
    label: 'O que vocês desenvolvem?',
    icon: Code2,
    summary:
      'Sites, landing pages, sistemas web, portais e automações. A escolha parte da sua necessidade: apresentar a marca, organizar a operação ou conectar ferramentas. Explicamos o que faz sentido para o seu momento.',
    next: 'O objetivo orienta a solução e as funcionalidades.',
  },
  {
    label: 'Prazo e investimento',
    icon: Wallet,
    summary:
      'Dependem das entregas, integrações e complexidade. Antes da construção, alinhamos escopo, etapas, investimento e responsabilidades. Novas necessidades são avaliadas com você antes de ampliar o projeto.',
    next: 'Você entende o que está incluído para decidir com clareza.',
  },
  {
    label: 'Como vou acompanhar?',
    icon: MessageSquare,
    summary:
      'Com explicações claras, protótipos e demonstrações nas etapas combinadas. Você experimenta, pergunta e valida. Nós traduzimos as decisões técnicas para que sua experiência participe da construção.',
    next: 'Você conhece o negócio. Nossa equipe cuida da tecnologia.',
  },
  {
    label: 'E depois da entrega?',
    icon: ShieldCheck,
    summary:
      'Preparamos a entrada em uso e alinhamos a continuidade: orientações, suporte, manutenção ou melhorias, conforme o escopo contratado. Você sabe como pedir ajuda e planejar o próximo avanço.',
    next: 'Acompanhamento com canais, período e cobertura definidos.',
  },
  {
    label: 'Já uso outras ferramentas',
    icon: Plug,
    summary:
      'Podemos avaliar integrações com o que sua empresa já utiliza. Verificamos acessos, dados e limitações de cada serviço antes de propor mudanças. Conectar uma etapa pode ser mais adequado do que substituir toda a operação.',
    next: 'A proposta considera o que já funciona na sua rotina.',
  },
  {
    label: 'Quero dar o primeiro passo',
    icon: Compass,
    summary:
      'Conte seu objetivo no briefing. Você recebe uma direção preliminar com prioridades para revisar, copiar ou baixar. Depois, pode abrir o WhatsApp com o resumo pronto e iniciar uma conversa com a equipe.',
    next: 'Escreva com suas palavras. Não é preciso usar termos técnicos.',
  },
]

type Faq = { question: string; answer: string[]; outcome: string }

export function QuickFaq({ faqs, onBrief }: { faqs: Faq[]; onBrief: () => void }) {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const id = useId()
  const topic = topics[active]
  function select(index: number) {
    setActive(index)
    setExpanded(false)
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % topics.length
        : event.key === 'ArrowLeft'
          ? (index + topics.length - 1) % topics.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? topics.length - 1
              : null
    if (next === null) return
    event.preventDefault()
    select(next)
    tabs.current[next]?.focus()
  }
  return (
    <section
      id="duvidas"
      className="section faq-section quick-faq-section"
      aria-labelledby={`${id}-title`}
    >
      <div className="container quick-faq-grid">
        <div className="quick-faq-intro">
          <div className="section-heading">
            <span className="eyebrow">
              <span />
              CLAREZA PARA COMEÇAR
            </span>
            <h2 id={`${id}-title`}>
              Uma dúvida a menos. <br />
              <span>Uma ideia mais possível.</span>
            </h2>
            <p>
              Escolha o que falta esclarecer. A Newthing ajuda você a entender o caminho antes de
              construir.
            </p>
          </div>
          <div
            className="quick-faq-bridge"
            role="img"
            aria-label="A Newthing conecta sua ideia a um caminho possível."
          >
            <div>
              <span>
                <Lightbulb size={17} />
              </span>
              <small>Sua ideia</small>
            </div>
            <i />
            <div className="quick-faq-brand">
              <strong>
                <BrandMark />
              </strong>
              <small>NEWTHING</small>
            </div>
            <i />
            <div>
              <span>
                <Route size={17} />
              </span>
              <small>Caminho possível</small>
            </div>
          </div>
          <p className="quick-faq-caption">O que você almeja orienta o próximo passo.</p>
        </div>
        <div className="quick-faq-console">
          <header>
            <span>
              <i />
              ESCOLHA UMA DÚVIDA
            </span>
            <small>RESPOSTAS DIRETAS</small>
          </header>
          <div className="quick-faq-tabs" role="tablist" aria-label="O que você quer esclarecer?">
            {topics.map(({ label, icon: Icon }, index) => (
              <button
                key={label}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={active === index}
                aria-controls={`${id}-answer`}
                tabIndex={active === index ? 0 : -1}
                ref={(node) => {
                  tabs.current[index] = node
                }}
                onClick={() => select(index)}
                onKeyDown={(event) => navigate(event, index)}
              >
                <Icon size={13} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div
            className="quick-faq-answer"
            role="tabpanel"
            id={`${id}-answer`}
            aria-labelledby={`${id}-tab-${active}`}
            tabIndex={0}
          >
            <div className="quick-faq-answer-copy" key={active}>
              <span className="quick-faq-answer-label">
                NEWTHING ESCLARECE <ArrowRight size={10} />
              </span>
              <h3>{faqs[active].question}</h3>
              <p>{topic.summary}</p>
              <div className="quick-faq-next">
                <span />
                <p>{topic.next}</p>
              </div>
            </div>
            <div className="quick-faq-details" id={`${id}-details`} hidden={!expanded}>
              {faqs[active].answer.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <div className="quick-faq-actions">
              <button
                type="button"
                className="quick-faq-expand"
                aria-expanded={expanded}
                aria-controls={`${id}-details`}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Mostrar menos' : 'Aprofundar resposta'}
                <ChevronDown size={12} />
              </button>
              <button type="button" className="quick-faq-start" onClick={onBrief}>
                Preparar meu briefing
                <ArrowUpRight size={13} />
              </button>
            </div>
            <small className="quick-faq-note">
              Seu resumo pode ser revisado e baixado antes de compartilhar.
            </small>
          </div>
        </div>
      </div>
    </section>
  )
}
