import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Headphones,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  UserRound,
  Workflow,
} from 'lucide-react'
import './ClientVision.css'

const intentions = [
  {
    id: 'ideia',
    label: 'Tenho uma ideia',
    icon: Lightbulb,
    resultIcon: Code2,
    result: 'Primeira versão',
    quote: 'Tenho uma ideia e quero entender como torná-la real.',
    title: 'Primeiro, entendemos o que você quer transformar.',
    text: 'Ouvimos sua visão, conhecemos seu público e identificamos o que precisa funcionar primeiro. Depois, desenhamos juntos uma primeira versão viável.',
    outputs: ['Objetivos e prioridades', 'Protótipo para validar'],
    commitment: 'Você participa das decisões antes da construção.',
    stage: 'Tenho uma ideia',
  },
  {
    id: 'operacao',
    label: 'Quero organizar minha empresa',
    icon: Code2,
    resultIcon: Workflow,
    result: 'Sistema sob medida',
    quote: 'Quero organizar minha empresa e ter clareza da operação.',
    title: 'Seu jeito de trabalhar orienta o sistema.',
    text: 'Escutamos quem vive a rotina, mapeamos os processos e entendemos onde as informações precisam se conectar. O sistema é planejado para a sua realidade.',
    outputs: ['Processos mapeados', 'Informações conectadas'],
    commitment: 'Você e sua equipe acompanham e validam a construção.',
    stage: 'Quero construir um sistema',
  },
  {
    id: 'atendimento',
    label: 'Quero atender melhor',
    icon: MessageSquare,
    resultIcon: Headphones,
    result: 'Atendimento conectado',
    quote: 'Quero atender melhor sem perder a proximidade com meu cliente.',
    title: 'Tecnologia para apoiar o cuidado com as pessoas.',
    text: 'Entendemos seus canais, as dúvidas recorrentes e os momentos que pedem uma pessoa. Planejamos automações que organizam solicitações e mantêm a equipe presente.',
    outputs: ['Jornada de atendimento', 'Automações com revisão'],
    commitment: 'O acompanhamento humano faz parte da solução.',
    stage: 'Quero construir um sistema',
  },
]

export function ClientVision({
  onStartProject,
}: {
  onStartProject: (goal: string, stage: string) => void
}) {
  const [selected, setSelected] = useState(0)
  const intention = intentions[selected]
  const ResultIcon = intention.resultIcon
  return (
    <div className="client-vision">
      <div className="client-vision-top">
        <span>
          <span className="client-vision-dot" />
          SEU PROJETO COMEÇA NA ESCUTA
        </span>
        <Headphones size={16} />
      </div>
      <div className="client-vision-question">
        <h3>O que você quer conquistar?</h3>
        <p>Escolha uma intenção e veja como construímos esse caminho com você.</p>
      </div>
      <div className="client-vision-tabs" role="tablist" aria-label="Seu objetivo com a Newthing">
        {intentions.map(({ id, label, icon: Icon }, index) => (
          <button
            type="button"
            role="tab"
            key={id}
            id={`vision-tab-${id}`}
            aria-selected={selected === index}
            aria-controls="client-vision-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              const next =
                event.key === 'ArrowRight'
                  ? (index + 1) % intentions.length
                  : event.key === 'ArrowLeft'
                    ? (index + intentions.length - 1) % intentions.length
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? intentions.length - 1
                        : null
              if (next === null) return
              event.preventDefault()
              setSelected(next)
              const tabs =
                event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                  '[role="tab"]',
                )
              tabs?.[next]?.focus()
            }}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>
      <div
        id="client-vision-panel"
        role="tabpanel"
        aria-labelledby={`vision-tab-${intention.id}`}
        tabIndex={0}
      >
        <div className="client-vision-content" key={intention.id}>
          <div className="client-vision-quote">
            <span>
              <UserRound size={14} />
              SUA VISÃO
            </span>
            <p>“{intention.quote}”</p>
          </div>
          <div className="client-vision-connection" aria-hidden="true">
            <span>
              <UserRound size={17} />
              <small>Você</small>
            </span>
            <i />
            <div>
              <strong>n.</strong>
              <small>NEWTHING</small>
            </div>
            <i />
            <span>
              <ResultIcon size={17} />
              <small>{intention.result}</small>
            </span>
          </div>
          <div className="client-vision-answer">
            <span>
              <Headphones size={13} />
              COMO CUIDAMOS DO SEU PROJETO
            </span>
            <h4>{intention.title}</h4>
            <p>{intention.text}</p>
            <ul>
              {intention.outputs.map((output) => (
                <li key={output}>
                  <Check size={12} />
                  {output}
                </li>
              ))}
            </ul>
          </div>
          <p className="client-vision-commitment">
            <ShieldCheck size={14} />
            {intention.commitment}
          </p>
        </div>
        <button
          className="client-vision-cta"
          type="button"
          onClick={() => onStartProject(intention.quote, intention.stage)}
        >
          <span>Vamos conversar sobre esse objetivo</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
      <p className="client-vision-note">
        <ArrowRight size={11} />
        Um exemplo de como começamos. A solução é definida com você.
      </p>
      <span className="client-vision-announcement" role="status">
        Objetivo selecionado: {intention.label}. {intention.title}
      </span>
    </div>
  )
}
