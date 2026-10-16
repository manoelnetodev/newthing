import {
  BadgeCheck,
  Code2,
  Compass,
  HeartHandshake,
  Lightbulb,
  Route,
  Sparkles,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import './JourneyPath.css'
import './JourneyPathMotion.css'
import { BrandMark } from './BrandMark'

const paths = [
  {
    start: 'Visão inicial',
    end: 'Plano definido',
    startIcon: Lightbulb,
    endIcon: Route,
    top: 'Escuta & direção',
    bottom: 'Um caminho possível',
    summary: 'A Newthing conecta seu sonho a objetivos, prioridades e um plano de projeto.',
    action: 'Entenda o caminho do seu sonho ao plano',
  },
  {
    start: 'Planejamento',
    end: 'Solução em uso',
    startIcon: Compass,
    endIcon: Code2,
    top: 'Design & tecnologia',
    bottom: 'Construção com você',
    summary:
      'A Newthing coordena design, desenvolvimento e validação para transformar o plano em uma solução real.',
    action: 'Veja o caminho do plano ao projeto real',
  },
  {
    start: 'Entrega validada',
    end: 'Objetivo realizado',
    startIcon: Code2,
    endIcon: HeartHandshake,
    top: 'Uso, conquista & continuidade',
    bottom: 'Uma conquista que faz parte da rotina',
    summary:
      'A Newthing acompanha o uso e a evolução do projeto para aproximar você da realização dos seus objetivos.',
    action: 'Explore o caminho do projeto à realização',
  },
]

export function JourneyPath({
  phase,
  active,
  onExplore,
}: {
  phase: number
  active: boolean
  onExplore: () => void
}) {
  const path = paths[phase]
  const StartIcon = path.startIcon
  const EndIcon = path.endIcon
  return (
    <div
      className={`journey-path journey-path-phase-${phase} ${active ? 'is-active' : ''}`}
      style={{ '--journey-delay': `${phase * 4.2}s` } as CSSProperties}
    >
      <span className="journey-path-context">
        <Sparkles size={10} />
        {path.top}
      </span>
      <div className="journey-path-map">
        <svg viewBox="0 0 320 115" preserveAspectRatio="none" aria-hidden="true">
          <path className="journey-path-track" d="M46 62 C90 62 95 48 160 48 S230 62 274 62" />
          <path
            data-light
            className="journey-path-charge incoming"
            pathLength={100}
            d="M46 62 C90 62 95 48 160 48"
          />
          <path
            data-light
            className="journey-path-packet incoming"
            pathLength={100}
            d="M46 62 C90 62 95 48 160 48"
          />
          <path
            data-light
            className="journey-path-halo outgoing"
            pathLength={100}
            d="M160 48 C225 48 230 62 274 62"
          />
          <path
            data-light
            className="journey-path-charge outgoing"
            pathLength={100}
            d="M160 48 C225 48 230 62 274 62"
          />
          <path
            data-light
            className="journey-path-packet outgoing"
            pathLength={100}
            d="M160 48 C225 48 230 62 274 62"
          />
          <ellipse cx="160" cy="48" rx="44" ry="36" />
          <ellipse cx="160" cy="48" rx="61" ry="50" />
        </svg>
        <span className="journey-path-node start">
          <StartIcon size={19} strokeWidth={1.5} />
          <span>{path.start}</span>
        </span>
        <button
          type="button"
          className="journey-path-hub"
          aria-label={path.action}
          onClick={onExplore}
        >
          <span>
            <BrandMark />
          </span>
          <small>NEWTHING</small>
        </button>
        <span className="journey-path-node end">
          <EndIcon size={19} strokeWidth={1.5} />
          <span>{path.end}</span>
          {phase === 2 && <BadgeCheck size={10} className="journey-path-complete" />}
        </span>
      </div>
      <span className="journey-path-caption">
        <CheckRoute phase={phase} />
        {path.bottom}
      </span>
      <span className="journey-path-accessible">{path.summary}</span>
    </div>
  )
}

function CheckRoute({ phase }: { phase: number }) {
  return phase === 2 ? <HeartHandshake size={11} /> : <Route size={11} />
}
