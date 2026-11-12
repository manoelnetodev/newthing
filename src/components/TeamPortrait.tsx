import { useEffect, useRef } from 'react'
import type { PointerEvent } from 'react'
import './TeamPortrait.css'

type PortraitImage = {
  src: string
  srcSet: string
  fallback: string
  fallbackSrcSet: string
  sizes: string
  width: number
  height: number
}

export function TeamPortrait({
  image,
  name,
  imageClassName,
  index,
}: {
  image: PortraitImage
  name: string
  imageClassName: string
  index: string
}) {
  const portrait = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)
  const motionAllowed = useRef(false)
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const media = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    const element = portrait.current
    const updatePreference = () => {
      motionAllowed.current = media.matches
      if (!media.matches) {
        if (frame.current !== null) cancelAnimationFrame(frame.current)
        frame.current = null
        element?.removeAttribute('data-tracking')
        element?.removeAttribute('style')
      }
    }
    updatePreference()
    media.addEventListener('change', updatePreference)
    return () => {
      media.removeEventListener('change', updatePreference)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (!motionAllowed.current || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    position.current = {
      x: Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2)),
      y: Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2)),
    }
    if (frame.current !== null) return
    frame.current = requestAnimationFrame(() => {
      frame.current = null
      const element = portrait.current
      if (!element) return
      const { x, y } = position.current
      element.dataset.tracking = 'true'
      element.style.setProperty('--portrait-rx', `${-y * 4}deg`)
      element.style.setProperty('--portrait-ry', `${x * 7}deg`)
      element.style.setProperty('--portrait-x', `${x * 7}px`)
      element.style.setProperty('--portrait-y', `${y * 4}px`)
      element.style.setProperty('--portrait-light-x', `${50 + x * 22}%`)
      element.style.setProperty('--portrait-light-y', `${40 + y * 15}%`)
    })
  }

  function releasePointer() {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
    portrait.current?.removeAttribute('data-tracking')
    portrait.current?.removeAttribute('style')
  }

  return (
    <div
      className="team-portrait"
      ref={portrait}
      onPointerMove={followPointer}
      onPointerLeave={releasePointer}
      onPointerCancel={releasePointer}
    >
      <div className="team-portrait-scene">
        <span className="team-portrait-aura" aria-hidden="true" />
        <span className="team-portrait-ground" aria-hidden="true" />
        <span className="team-portrait-index" aria-hidden="true">
          {index}
        </span>
        <img
          className={`team-portrait-image ${imageClassName}`}
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes}
          alt={`Retrato profissional de ${name}`}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          onError={({ currentTarget }) => {
            if (currentTarget.dataset.fallback !== 'true') {
              currentTarget.dataset.fallback = 'true'
              currentTarget.srcset = image.fallbackSrcSet
              currentTarget.src = image.fallback
            }
          }}
        />
      </div>
    </div>
  )
}
