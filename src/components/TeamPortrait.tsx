import type { MouseEvent } from 'react'
import './TeamPortrait.css'

export type PortraitImage = {
  src: string
  srcSet: string
  fallback: string
  fallbackSrcSet: string
  sizes: string
  width: number
  height: number
}

export type OrbitalSlot = -1 | 0 | 1 | 2

export function TeamPortrait({
  id,
  image,
  name,
  roleCode,
  indexNumber,
  telemetryTag,
  areaId,
  slot,
  onSelect,
}: {
  id: 'yuri' | 'maksuel' | 'manoel' | 'ronan'
  image: PortraitImage
  name: string
  roleCode: string
  indexNumber: string
  telemetryTag: string
  areaId: 'parcerias' | 'desenvolvimento'
  slot: OrbitalSlot
  onSelect: () => void
}) {
  const isActive = slot === 0
  const shortName = name.split(' ')[0]

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (!isActive) {
      event.preventDefault()
      onSelect()
    }
  }

  return (
    <div
      className={`nt-monolith-slot nt-area-${areaId}`}
      data-slot={slot}
      data-active={isActive ? 'true' : 'false'}
      onClick={handleClick}
      role={isActive ? undefined : 'button'}
      tabIndex={isActive ? -1 : 0}
      aria-label={isActive ? undefined : `Focar especialista ${name} (${roleCode}) no palco 3D`}
      onKeyDown={(event) => {
        if (!isActive && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          onSelect()
        }
      }}
    >
      <div className="nt-monolith-rig">
        {/* Camada Z -28px: Câmara arquitetônica + grade técnica + arco orbital */}
        <div className="nt-chamber-backplate" aria-hidden="true">
          <span className="nt-chamber-grid" />
          <span className="nt-chamber-keylight" />
          <svg
            className="nt-chamber-orbit"
            viewBox="0 0 240 240"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="120"
              cy="118"
              r="86"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
            <path
              d="M 48 96 A 76 76 0 0 1 192 96"
              stroke="currentColor"
              strokeOpacity="0.42"
              strokeWidth="1.2"
            />
            <circle cx="48" cy="96" r="2.2" fill="currentColor" fillOpacity="0.65" />
            <circle cx="192" cy="96" r="2.2" fill="currentColor" fillOpacity="0.65" />
          </svg>
          <span className="nt-chamber-corner nt-corner-tl" />
          <span className="nt-chamber-corner nt-corner-tr" />
          <span className="nt-chamber-corner nt-corner-bl" />
          <span className="nt-chamber-corner nt-corner-br" />
        </div>

        {/* Camada Z 0px: Moldura biselada e telemetria superior */}
        <div className="nt-chamber-frame" aria-hidden="true">
          <div className="nt-chamber-topbar">
            <span className="nt-chamber-coord">
              {indexNumber} // {roleCode}
            </span>
            <span className="nt-chamber-dot" />
          </div>
          <span className="nt-chamber-rim" />
        </div>

        {/* Camada Z +26px: Retrato calibrado com pop-out 3D acima da borda superior */}
        <div className="nt-portrait-portal">
          <img
            className={`nt-portrait-img nt-person-${id}`}
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.sizes}
            alt={`Retrato de ${name}, ${roleCode} na Newthing`}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={({ currentTarget }) => {
              if (currentTarget.dataset.fallback !== 'true') {
                currentTarget.dataset.fallback = 'true'
                currentTarget.srcset = image.fallbackSrcSet
                currentTarget.src = image.fallback
              }
            }}
          />
          <span className="nt-portrait-vignette" aria-hidden="true" />
          <span className="nt-portrait-dimmer" aria-hidden="true" />
        </div>

        {/* Camada Z +54px: Placa flutuante de telemetria em primeiro plano */}
        <div className="nt-hud-pill" aria-hidden="true">
          <div className="nt-hud-meta">
            <span className="nt-hud-live" />
            <span className="nt-hud-code">
              {roleCode} · {indexNumber}
            </span>
          </div>
          <strong className="nt-hud-name">{isActive ? name : shortName}</strong>
          <span className="nt-hud-tag">{telemetryTag}</span>
        </div>
      </div>
    </div>
  )
}
