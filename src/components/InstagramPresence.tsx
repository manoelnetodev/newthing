import { ArrowUpRight, BadgeCheck, Code2, Layers, Workflow } from 'lucide-react'
import { BrandMark } from './BrandMark'
import './InstagramPresence.css'

export const NEWTHING_INSTAGRAM_URL =
  'https://www.instagram.com/newthing.apps?psln=djE3c3d1NTRkbHVq'

export function InstagramGlyph({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const feedPillars = [
  {
    code: '01',
    tag: 'ARQUITETURA',
    title: 'Sistemas por dentro',
    summary: 'Como organizamos dados, painéis e fluxos reais sem complexidade desnecessária.',
    icon: Code2,
  },
  {
    code: '02',
    tag: 'EXPERIÊNCIA',
    title: 'Design com direção',
    summary: 'Escolhas visuais e interfaces pensadas para funcionar em qualquer tela.',
    icon: Layers,
  },
  {
    code: '03',
    tag: 'OPERAÇÃO',
    title: 'Automações na rotina',
    summary: 'Exemplos práticos de integrações que reduzem tarefas manuais nas empresas.',
    icon: Workflow,
  },
] as const

export function InstagramPresence() {
  return (
    <section id="instagram" className="section nt-ig-section" aria-labelledby="nt-ig-title">
      <div className="container">
        <div className="nt-ig-layout">
          <div className="nt-ig-copy">
            <span className="eyebrow">
              <span />
              BASTIDORES &amp; CONTEÚDO · @NEWTHING.APPS
            </span>
            <h2 id="nt-ig-title">
              Acompanhe de perto <br />
              <span>o que estamos construindo.</span>
            </h2>
            <p>
              No Instagram oficial da Newthing compartilhamos bastidores de projetos, decisões de
              design, arquitetura de sistemas e ideias práticas para organizar e evoluir sua
              operação digital.
            </p>
            <div className="nt-ig-cta-row">
              <a
                className="button button-primary nt-ig-primary-btn"
                href={NEWTHING_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir perfil oficial @newthing.apps no Instagram em nova aba"
              >
                <InstagramGlyph size={17} />
                <span>Seguir @newthing.apps</span>
                <ArrowUpRight size={16} />
              </a>
              <span className="nt-ig-handle-note">Sites · Sistemas · Automações</span>
            </div>
          </div>

          <div className="nt-ig-console">
            <a
              className="nt-ig-profile-bar"
              href={NEWTHING_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar perfil @newthing.apps no Instagram (abre em nova aba)"
            >
              <span className="nt-ig-avatar" aria-hidden="true">
                <BrandMark />
              </span>
              <span className="nt-ig-profile-meta">
                <strong>
                  @newthing.apps
                  <BadgeCheck size={14} className="nt-ig-verified" aria-hidden="true" />
                </strong>
                <span>Newthing Apps · Canal oficial no Instagram</span>
              </span>
              <span className="nt-ig-follow-pill">
                <span>Ver perfil</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </a>

            <div className="nt-ig-cards">
              {feedPillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <a
                    key={pillar.code}
                    className="nt-ig-card"
                    href={NEWTHING_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${pillar.title} no Instagram @newthing.apps (abre em nova aba)`}
                  >
                    <div className="nt-ig-card-top">
                      <span className="nt-ig-card-icon" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      <span className="nt-ig-card-code">
                        {pillar.code} // {pillar.tag}
                      </span>
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.summary}</p>
                    <span className="nt-ig-card-link">
                      <span>Explorar no Instagram</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
