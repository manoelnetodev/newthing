import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent, TouchEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChartNoAxesCombined,
  Code2,
  Workflow,
} from 'lucide-react'
import { teamPhotos } from '../data/teamPhotos'
import { BrandMark } from './BrandMark'
import { InstagramGlyph } from './InstagramPresence'
import { TeamPortrait } from './TeamPortrait'
import type { OrbitalSlot, PortraitImage } from './TeamPortrait'
import './TeamSpatial.css'

type TeamMember = {
  id: 'yuri' | 'maksuel' | 'manoel' | 'ronan'
  indexNumber: string
  name: string
  role: string
  roleCode: string
  fullRole: string
  areaId: 'parcerias' | 'desenvolvimento'
  areaTitle: string
  telemetryTag: string
  responsibility: string
  description: string
  synergy: string
  focus: string[]
  image: PortraitImage
  instagram?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 'yuri',
    indexNumber: '01',
    name: 'Yuri Gabriel',
    role: 'Founder & CEO',
    roleCode: 'CEO',
    fullRole: 'Chief Executive Officer',
    areaId: 'parcerias',
    areaTitle: 'Frente 01 · Estratégia e Operações',
    telemetryTag: 'ESTRATÉGIA & FINANÇAS',
    responsibility: 'Direção estratégica e visão de negócio',
    description:
      'Conecta a visão do cliente à estratégia do projeto. Sua experiência em contabilidade e gestão financeira contribui para alinhar objetivos, prioridades e decisões de negócio.',
    synergy:
      'Traduz metas comerciais e financeiras em prioridades claras antes da arquitetura e do código.',
    focus: ['Gestão financeira', 'Visão de negócio', 'Priorização estratégica'],
    image: teamPhotos.yuri,
    instagram: 'https://www.instagram.com/yurig_contador/',
  },
  {
    id: 'maksuel',
    indexNumber: '02',
    name: 'Maksuel Silva',
    role: 'COO',
    roleCode: 'COO',
    fullRole: 'Chief Operating Officer',
    areaId: 'parcerias',
    areaTitle: 'Frente 01 · Estratégia e Operações',
    telemetryTag: 'OPERAÇÕES & PARCERIAS',
    responsibility: 'Operações, parcerias e relacionamento',
    description:
      'Aproxima pessoas, parcerias e operação. Contribui para organizar o relacionamento com as empresas e alinhar as necessidades do cliente ao andamento do projeto.',
    synergy: 'Mantém a rotina real da sua empresa sincronizada com cada entrega da engenharia.',
    focus: ['Operações', 'Parcerias', 'Visão empreendedora'],
    image: teamPhotos.maksuel,
    instagram: 'https://www.instagram.com/maksueel/',
  },
  {
    id: 'manoel',
    indexNumber: '03',
    name: 'Manoel Neto',
    role: 'Co-Founder & CTO',
    roleCode: 'CTO',
    fullRole: 'Chief Technology Officer',
    areaId: 'desenvolvimento',
    areaTitle: 'Frente 02 · Tecnologia e Desenvolvimento',
    telemetryTag: 'ARQUITETURA & AUTOMAÇÃO',
    responsibility: 'Direção de tecnologia e arquitetura de sistemas',
    description:
      'Conecta desenvolvimento de sistemas, infraestrutura e automações para criar soluções integradas, com atenção à operação da empresa e à evolução de cada projeto.',
    synergy: 'Desenha a base técnica, infraestrutura e automações que dão sustentação ao projeto.',
    focus: ['Arquitetura de sistemas', 'Sistemas sob medida', 'Automações'],
    image: teamPhotos.manoel,
    instagram: 'https://www.instagram.com/manoel_io/',
  },
  {
    id: 'ronan',
    indexNumber: '04',
    name: 'Ronan Severo',
    role: 'SDE',
    roleCode: 'SDE',
    fullRole: 'Software Development Engineer',
    areaId: 'desenvolvimento',
    areaTitle: 'Frente 02 · Tecnologia e Desenvolvimento',
    telemetryTag: 'ENGENHARIA & INTEGRAÇÕES',
    responsibility: 'Desenvolvimento de software e integrações',
    description:
      'Transforma o planejamento em software: desenvolve funcionalidades, conecta processos e integra sistemas para apoiar a rotina de cada cliente.',
    synergy:
      'Materializa a arquitetura em interfaces fluidas, APIs conectadas e fluxos sem atrito.',
    focus: ['Desenvolvimento de sistemas', 'Integrações', 'Interfaces & APIs'],
    image: teamPhotos.ronan,
  },
]

function getOrbitalSlot(index: number, activeIndex: number): OrbitalSlot {
  const total = teamMembers.length
  const diff = (((index - activeIndex) % total) + total) % total
  if (diff === 0) return 0
  if (diff === 1) return 1
  if (diff === 3) return -1
  return 2
}

export function WhoWeAre({ onContact }: { onContact: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const motionOkRef = useRef(false)
  const pointerPosRef = useRef({ x: 0, y: 0 })
  const swipeStartXRef = useRef<number | null>(null)
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([])

  const activePerson = teamMembers[activeIndex]
  const nextIndex = (activeIndex + 1) % teamMembers.length
  const nextPerson = teamMembers[nextIndex]
  const AreaIcon = activePerson.areaId === 'parcerias' ? ChartNoAxesCombined : Code2

  useEffect(() => {
    const media = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    const stageEl = stageRef.current
    const syncPreference = () => {
      motionOkRef.current = media.matches
      if (!media.matches) {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        rafRef.current = null
        stageEl?.removeAttribute('data-tracking')
        stageEl?.removeAttribute('style')
      }
    }
    syncPreference()
    media.addEventListener('change', syncPreference)
    return () => {
      media.removeEventListener('change', syncPreference)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  function selectSpecialist(index: number, focusTab = false) {
    const normalized = ((index % teamMembers.length) + teamMembers.length) % teamMembers.length
    setActiveIndex(normalized)
    if (focusTab) {
      nodeRefs.current[normalized]?.focus()
    }
  }

  function handleStagePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!motionOkRef.current || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerPosRef.current = {
      x: Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.45) * 2.1)),
      y: Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.48) * 2.1)),
    }
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const el = stageRef.current
      if (!el) return
      const { x, y } = pointerPosRef.current
      el.dataset.tracking = 'true'
      el.style.setProperty('--stage-rx', `${(-y * 5.5).toFixed(2)}deg`)
      el.style.setProperty('--stage-ry', `${(x * 7.5).toFixed(2)}deg`)
      el.style.setProperty('--stage-px', `${(x * 9).toFixed(1)}px`)
      el.style.setProperty('--stage-py', `${(y * 6).toFixed(1)}px`)
      el.style.setProperty('--stage-lx', `${(50 + x * 26).toFixed(1)}%`)
      el.style.setProperty('--stage-ly', `${(34 + y * 18).toFixed(1)}%`)
    })
  }

  function resetStageTilt() {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    stageRef.current?.removeAttribute('data-tracking')
    stageRef.current?.removeAttribute('style')
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    swipeStartXRef.current = event.touches[0]?.clientX ?? null
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = swipeStartXRef.current
    swipeStartXRef.current = null
    if (startX === null) return
    const endX = event.changedTouches[0]?.clientX ?? startX
    const deltaX = endX - startX
    if (Math.abs(deltaX) > 42) {
      selectSpecialist(deltaX < 0 ? activeIndex + 1 : activeIndex - 1)
    }
  }

  function handleCircuitKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectSpecialist(activeIndex + 1, true)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectSpecialist(activeIndex - 1, true)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectSpecialist(0, true)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectSpecialist(teamMembers.length - 1, true)
    }
  }

  const strategyNodes = teamMembers.slice(0, 2)
  const engineeringNodes = teamMembers.slice(2, 4)

  return (
    <section
      id="quem-somos"
      className="section identity-section nt-team-spatial"
      aria-labelledby="identity-title"
    >
      <span id="sobre" className="nt-team-anchor" aria-hidden="true" />
      <div className="container">
        <div className="nt-spatial-intro">
          <div className="section-heading">
            <span className="eyebrow">
              <span />
              QUEM SOMOS
            </span>
            <h2 id="identity-title">
              Quem pensa junto. <br />
              <span>Quem faz acontecer.</span>
            </h2>
          </div>
          <div className="nt-spatial-intro-copy">
            <p>
              Somos a Newthing. Unimos experiência contábil, financeira e operacional ao
              desenvolvimento de sites, sistemas e automações.
            </p>
            <p>
              Explore o núcleo da equipe em perspectiva: cada especialista atua conectado da
              estratégia inicial à arquitetura e entrega em produção.
            </p>
          </div>
        </div>

        {/* Circuito Operacional Conectado */}
        <div
          id="equipe"
          className="nt-circuit"
          role="tablist"
          aria-label="Especialistas da equipe Newthing"
          onKeyDown={handleCircuitKeyDown}
        >
          <div
            className={`nt-circuit-domain ${activePerson.areaId === 'parcerias' ? 'is-domain-active' : ''}`}
          >
            <div className="nt-circuit-domain-head">
              <span className="nt-circuit-domain-label">
                <ChartNoAxesCombined size={13} aria-hidden="true" />
                Estratégia &amp; Operações
              </span>
              <span className="nt-circuit-domain-num">01</span>
            </div>
            <div className="nt-circuit-nodes">
              {strategyNodes.map((person, idx) => {
                const selected = activeIndex === idx
                return (
                  <button
                    key={person.id}
                    ref={(el) => {
                      nodeRefs.current[idx] = el
                    }}
                    type="button"
                    role="tab"
                    id={`nt-team-tab-${person.id}`}
                    aria-selected={selected}
                    aria-controls="nt-team-dossier-panel"
                    tabIndex={selected ? 0 : -1}
                    className="nt-circuit-node"
                    onClick={() => selectSpecialist(idx)}
                  >
                    <span className="nt-circuit-node-main">
                      <span className="nt-circuit-node-dot" aria-hidden="true" />
                      <span className="nt-circuit-node-text">
                        <strong>{person.name}</strong>
                        <span>{person.responsibility}</span>
                      </span>
                    </span>
                    <span className="nt-circuit-node-code">{person.roleCode}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="nt-circuit-bridge" aria-hidden="true">
            <div
              className="nt-circuit-hub"
              data-side={activePerson.areaId === 'parcerias' ? 'left' : 'right'}
            >
              <span className="nt-circuit-beam nt-circuit-beam-left" />
              <span className="nt-circuit-emblem">
                <BrandMark />
              </span>
              <span className="nt-circuit-beam nt-circuit-beam-right" />
            </div>
            <small>CORE</small>
          </div>

          <div
            className={`nt-circuit-domain ${activePerson.areaId === 'desenvolvimento' ? 'is-domain-active' : ''}`}
          >
            <div className="nt-circuit-domain-head">
              <span className="nt-circuit-domain-label">
                <Code2 size={13} aria-hidden="true" />
                Tecnologia &amp; Desenvolvimento
              </span>
              <span className="nt-circuit-domain-num">02</span>
            </div>
            <div className="nt-circuit-nodes">
              {engineeringNodes.map((person, offset) => {
                const idx = offset + 2
                const selected = activeIndex === idx
                return (
                  <button
                    key={person.id}
                    ref={(el) => {
                      nodeRefs.current[idx] = el
                    }}
                    type="button"
                    role="tab"
                    id={`nt-team-tab-${person.id}`}
                    aria-selected={selected}
                    aria-controls="nt-team-dossier-panel"
                    tabIndex={selected ? 0 : -1}
                    className="nt-circuit-node"
                    onClick={() => selectSpecialist(idx)}
                  >
                    <span className="nt-circuit-node-main">
                      <span className="nt-circuit-node-dot" aria-hidden="true" />
                      <span className="nt-circuit-node-text">
                        <strong>{person.name}</strong>
                        <span>{person.responsibility}</span>
                      </span>
                    </span>
                    <span className="nt-circuit-node-code">{person.roleCode}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Palco Espacial 3D + Ficha Arquitetônica */}
        <div className="nt-spatial-core">
          <div className="nt-stage-column">
            <div
              ref={stageRef}
              className="nt-stage-viewport"
              onPointerMove={handleStagePointerMove}
              onPointerLeave={resetStageTilt}
              onPointerCancel={resetStageTilt}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="nt-stage-pedestal" aria-hidden="true">
                <svg viewBox="0 0 560 80" fill="none" preserveAspectRatio="none">
                  <ellipse
                    cx="260"
                    cy="44"
                    rx="236"
                    ry="28"
                    stroke="#59a2f2"
                    strokeOpacity="0.18"
                    strokeWidth="1"
                    strokeDasharray="4 7"
                  />
                  <ellipse
                    cx="260"
                    cy="44"
                    rx="154"
                    ry="17"
                    stroke="#7fc0ff"
                    strokeOpacity="0.28"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {teamMembers.map((person, index) => (
                <TeamPortrait
                  key={person.id}
                  id={person.id}
                  image={person.image}
                  name={person.name}
                  roleCode={person.roleCode}
                  indexNumber={person.indexNumber}
                  telemetryTag={person.telemetryTag}
                  areaId={person.areaId}
                  slot={getOrbitalSlot(index, activeIndex)}
                  onSelect={() => selectSpecialist(index)}
                />
              ))}
            </div>

            <div className="nt-stage-controls">
              <div className="nt-stage-nav">
                <button
                  type="button"
                  className="nt-stage-arrow"
                  onClick={() => selectSpecialist(activeIndex - 1)}
                  aria-label="Especialista anterior"
                >
                  <ArrowLeft size={15} />
                </button>
                <div className="nt-stage-dots" aria-label="Posição no palco 3D">
                  {teamMembers.map((person, idx) => (
                    <button
                      key={person.id}
                      type="button"
                      className="nt-stage-dot"
                      aria-current={idx === activeIndex ? 'true' : undefined}
                      aria-label={`Selecionar ${person.name}`}
                      onClick={() => selectSpecialist(idx)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="nt-stage-arrow"
                  onClick={() => selectSpecialist(activeIndex + 1)}
                  aria-label="Próximo especialista"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
              <span className="nt-stage-hint">
                PERSPECTIVA 3D · PASSE O CURSOR OU CLIQUE NAS CAMADAS
              </span>
            </div>
          </div>

          <div
            id="nt-team-dossier-panel"
            role="tabpanel"
            aria-labelledby={`nt-team-tab-${activePerson.id}`}
            aria-live="polite"
            className="nt-dossier-column"
          >
            <article key={activePerson.id} className="nt-dossier-card">
              <header className="nt-dossier-topline">
                <span className="nt-dossier-domain">
                  <AreaIcon size={14} aria-hidden="true" />
                  {activePerson.areaTitle}
                </span>
                <span className="nt-dossier-node">NÓ {activePerson.indexNumber} / 04</span>
              </header>

              <h3 className="nt-dossier-name">{activePerson.name}</h3>

              <div className="nt-dossier-roleline">
                <span className="nt-dossier-badge">{activePerson.role}</span>
                <span className="nt-dossier-fullrole">{activePerson.fullRole}</span>
              </div>

              <p className="nt-dossier-mandate">{activePerson.responsibility}</p>
              <p className="nt-dossier-bio">{activePerson.description}</p>

              <div className="nt-dossier-specs">
                <div>
                  <span className="nt-spec-block-label">Eixos de atuação direta</span>
                  <ul
                    className="nt-spec-chips"
                    aria-label={`Áreas de atuação de ${activePerson.name}`}
                  >
                    {activePerson.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="nt-spec-synergy">
                  <Workflow size={15} aria-hidden="true" />
                  <p>{activePerson.synergy}</p>
                </div>
              </div>

              <footer className="nt-dossier-actions">
                {activePerson.instagram && (
                  <a
                    className="nt-dossier-social"
                    href={activePerson.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver perfil profissional de ${activePerson.name} no Instagram (abre em nova aba)`}
                  >
                    <InstagramGlyph size={14} />
                    <span>Instagram profissional</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}

                <button
                  type="button"
                  className="nt-dossier-next"
                  onClick={() => selectSpecialist(nextIndex)}
                >
                  <span>
                    Próximo: {nextPerson.name} ({nextPerson.roleCode})
                  </span>
                  <ArrowRight size={14} />
                </button>
              </footer>
            </article>
          </div>
        </div>

        <div className="nt-spatial-footer">
          <p>O objetivo é seu. A construção é em parceria.</p>
          <button type="button" className="button button-secondary" onClick={onContact}>
            Vamos falar sobre a sua empresa
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
