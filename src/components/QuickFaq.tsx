import { useId, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import './QuickFaq.css'

const topics = [
  {
    label: 'Só tenho uma ideia',
    summary:
      'Você não precisa chegar com tudo definido. Entendemos o que deseja conquistar, organizamos as prioridades e desenhamos um primeiro escopo. Sua visão vira um ponto de partida concreto.',
    next: 'Conte o objetivo e o principal desafio que quer resolver.',
  },
  {
    label: 'Posso começar pequeno?',
    summary:
      'Sim. Uma primeira versão pode resolver a necessidade mais importante, com espaço para evoluir. Por exemplo: começar com clientes e pedidos, validar o uso e só depois integrar o estoque.',
    next: 'Escolhemos juntos o que precisa funcionar primeiro.',
  },
  {
    label: 'O que vocês desenvolvem?',
    summary:
      'Sites, landing pages, sistemas web, portais e automações. A escolha parte da sua necessidade: apresentar a marca, organizar a operação ou conectar ferramentas. Explicamos o que faz sentido para o seu momento.',
    next: 'O objetivo orienta a solução e as funcionalidades.',
  },
  {
    label: 'Prazo e investimento',
    summary:
      'Dependem das entregas, integrações e complexidade. Antes da construção, alinhamos escopo, etapas, investimento e responsabilidades. Novas necessidades são avaliadas com você antes de ampliar o projeto.',
    next: 'Você entende o que está incluído para decidir com clareza.',
  },
  {
    label: 'Como vou acompanhar?',
    summary:
      'Com explicações claras, protótipos e demonstrações nas etapas combinadas. Você experimenta, pergunta e valida. Nós traduzimos as decisões técnicas para que sua experiência participe da construção.',
    next: 'Você conhece o negócio. Nossa equipe cuida da tecnologia.',
  },
  {
    label: 'E depois da entrega?',
    summary:
      'Preparamos a entrada em uso e alinhamos a continuidade: orientações, suporte, manutenção ou melhorias, conforme o escopo contratado. Você sabe como pedir ajuda e planejar o próximo avanço.',
    next: 'Acompanhamento com canais, período e cobertura definidos.',
  },
  {
    label: 'Já uso outras ferramentas',
    summary:
      'Podemos avaliar integrações com o que sua empresa já utiliza. Verificamos acessos, dados e limitações de cada serviço antes de propor mudanças. Conectar uma etapa pode ser mais adequado do que substituir toda a operação.',
    next: 'A proposta considera o que já funciona na sua rotina.',
  },
  {
    label: 'Quero dar o primeiro passo',
    summary:
      'Conte seu objetivo no briefing. Você recebe uma direção preliminar com prioridades para revisar, copiar ou baixar. Depois, pode abrir o WhatsApp com o resumo pronto e iniciar uma conversa com a equipe.',
    next: 'Escreva com suas palavras. Não é preciso usar termos técnicos.',
  },
]

type Faq = { question: string; answer: string[]; outcome: string }

export function QuickFaq({ faqs, onBrief }: { faqs: Faq[]; onBrief: () => void }) {
  const [active, setActive] = useState<number | null>(0)
  const id = useId()
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
              Boas conversas começam com clareza. Encontre o que falta para dar o próximo passo.
            </p>
          </div>
          <button type="button" className="faq-contact" onClick={onBrief}>
            Vamos falar sobre a sua ideia <ArrowUpRight size={19} />
          </button>
          <p className="quick-faq-caption">Escreva com suas palavras. A gente pensa junto.</p>
        </div>
        <div className="faq-list">
          {topics.map((topic, index) => (
            <article className="faq-item" key={topic.label} data-open={active === index}>
              <h3>
                <button
                  type="button"
                  id={`${id}-question-${index}`}
                  aria-expanded={active === index}
                  aria-controls={`${id}-answer-${index}`}
                  onClick={() => setActive(active === index ? null : index)}
                >
                  <span className="faq-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span>{faqs[index].question}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </button>
              </h3>
              <div
                className="faq-response"
                id={`${id}-answer-${index}`}
                role="region"
                aria-labelledby={`${id}-question-${index}`}
                hidden={active !== index}
              >
                <p>{topic.summary}</p>
                <p className="faq-next">{topic.next}</p>
                <details className="faq-further" key={`${index}-${active === index}`}>
                  <summary>
                    Mais detalhes <ChevronDown size={13} />
                  </summary>
                  {faqs[index].answer.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
