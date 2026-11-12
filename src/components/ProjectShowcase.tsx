import { Suspense, lazy, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ArrowUpRight, Check, ChevronDown, Globe, LayoutDashboard, Workflow } from 'lucide-react'
import './ProjectShowcase.css'
import './ShowroomExplorer.css'
import type { PreviewDevice } from './previewDevices'

const loadProjectShowcaseModal = () =>
  import('./ProjectShowcaseModal').then((module) => ({ default: module.ProjectShowcaseModal }))

const ProjectShowcaseModal = lazy(loadProjectShowcaseModal)

const projects = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    brand: 'Workspace',
    address: 'workspace.demo / visao-geral',
    category: 'INTELIGÊNCIA PARA A OPERAÇÃO',
    title: 'Seu negócio, em perspectiva.',
    description:
      'Indicadores, resultados e prioridades reunidos em uma visão clara. Um painel desenhado para transformar dados em boas decisões.',
    features: [
      'Indicadores em tempo real',
      'Relatórios e visualização de dados',
      'Gestão de equipes e resultados',
    ],
    detail: 'Para acompanhar, analisar e decidir.',
    number: '01',
  },
  {
    id: 'saas',
    label: 'SaaS',
    icon: Workflow,
    brand: 'Orbit',
    address: 'app.orbit.demo / automacoes',
    category: 'UM PRODUTO QUE TRABALHA COM VOCÊ',
    title: 'Menos tarefas. Mais possibilidades.',
    description:
      'Uma plataforma com uma experiência própria. Fluxos conectados, automações inteligentes e uma jornada que simplifica o trabalho de cada dia.',
    features: [
      'Fluxos e automações conectados',
      'Áreas de trabalho personalizadas',
      'Experiência de produto por assinatura',
    ],
    detail: 'Para usar, automatizar e evoluir.',
    number: '02',
  },
  {
    id: 'website',
    label: 'Website',
    icon: Globe,
    brand: 'Forma',
    address: 'forma.demo / studio',
    category: 'UMA PRESENÇA QUE TEM PERSONALIDADE',
    title: 'Uma marca que você sente.',
    description:
      'Design editorial, narrativa e uma presença digital memorável. Um site que apresenta o que torna a sua marca única e conduz à próxima conversa.',
    features: [
      'Identidade visual e direção de arte',
      'Narrativa e apresentação de serviços',
      'Experiência fluida em qualquer tela',
    ],
    detail: 'Para apresentar, conectar e converter.',
    number: '03',
  },
] as const

const screenChoices = [
  { id: 'pc', label: 'PC', preposition: 'no PC' },
  { id: 'tablet', label: 'Tablet', preposition: 'no tablet' },
  { id: 'ios', label: 'Celular', preposition: 'no celular' },
] as const

function ScreenSketch({ project }: { project: string }) {
  return (
    <svg viewBox="0 0 120 80" className="screen-sketch" aria-hidden="true">
      <path d="M8 10H112" stroke="#476782" strokeWidth="2" />
      {project === 'dashboard' ? (
        <>
          <rect x="8" y="20" width="31" height="19" rx="2" fill="#284764" />
          <rect x="45" y="20" width="31" height="19" rx="2" fill="#1b3045" />
          <rect x="82" y="20" width="30" height="19" rx="2" fill="#1b3045" />
          <path
            d="M8 69L26 60L42 63L64 50L82 54L112 43"
            fill="none"
            stroke="#82baff"
            strokeWidth="2"
          />
        </>
      ) : project === 'saas' ? (
        <>
          <path d="M25 47H95" stroke="#73a9db" strokeWidth="2" />
          {[12, 48, 84].map((x) => (
            <rect
              key={x}
              x={x}
              y="34"
              width="24"
              height="25"
              rx="4"
              fill="#1c344e"
              stroke="#537da4"
            />
          ))}
        </>
      ) : (
        <>
          <path d="M8 28H60M8 35H48M8 49H38" stroke="#9fbdd8" strokeWidth="3" />
          <rect x="77" y="23" width="30" height="45" rx="15" fill="#2c5582" />
          <path d="M8 65H60" stroke="#476782" strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

export function ProjectShowcase() {
  const [selected, setSelected] = useState(0)
  const [device, setDevice] = useState<PreviewDevice>('ios')
  const [previewOpen, setPreviewOpen] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const project = projects[selected]

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % projects.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + projects.length) % projects.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = projects.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus()
  }

  function warmModalChunk() {
    void loadProjectShowcaseModal()
  }

  return (
    <section id="projetos" className="section showroom-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">
            <span />
            POSSIBILIDADES
          </span>
          <h2>
            Ideias diferentes. <br />
            <span>O mesmo cuidado ao construir.</span>
          </h2>
          <p>
            Explore três possibilidades para o seu negócio. Troque a tela e veja como cada
            experiência se adapta à sua rotina.
          </p>
        </div>
        <div className={`showroom-card showroom-compact showroom-${project.id}`}>
          <div className="showroom-toolbar">
            <div className="showroom-tabs" role="tablist" aria-label="Tipos de projeto">
              {projects.map((item, index) => (
                <button
                  key={item.id}
                  ref={(element) => {
                    tabs.current[index] = element
                  }}
                  id={`project-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected === index}
                  aria-controls={`project-panel-${item.id}`}
                  tabIndex={selected === index ? 0 : -1}
                  onClick={() => setSelected(index)}
                  onKeyDown={(event) => navigateTabs(event, index)}
                >
                  <item.icon size={16} aria-hidden="true" />
                  {item.label}
                </button>
              ))}
            </div>
            <span className="showroom-explore-hint">Uma ideia. Cada tela.</span>
          </div>
          <div
            key={project.id}
            className="showroom-launch-scene"
            id={`project-panel-${project.id}`}
            role="tabpanel"
            aria-labelledby={`project-tab-${project.id}`}
            tabIndex={0}
          >
            <div className="showroom-copy">
              <span className="showroom-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <details className="showroom-specs">
                <summary>
                  O que este projeto oferece <ChevronDown size={13} />
                </summary>
                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <Check size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </details>
              <div className="showroom-copy-footer">
                <span>
                  <project.icon size={18} />
                  {project.detail}
                </span>
                <span className="showroom-counter">
                  {project.number}
                  <span> / 03</span>
                </span>
              </div>
            </div>
            <div className="showroom-screen-selector">
              <span className="showroom-screen-label">ESCOLHA COMO QUER VER</span>
              <div
                className="showroom-screen-choices"
                role="group"
                aria-label="Abrir demonstração em um dispositivo"
              >
                {screenChoices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`screen-choice screen-choice-${item.id}`}
                    aria-label={`Ver ${project.label} ${item.preposition}`}
                    aria-haspopup="dialog"
                    onPointerEnter={warmModalChunk}
                    onFocus={warmModalChunk}
                    onClick={() => {
                      setDevice(item.id)
                      setPreviewOpen(true)
                    }}
                  >
                    <span className="screen-choice-art" aria-hidden="true">
                      <span className="screen-choice-frame">
                        <ScreenSketch project={project.id} />
                      </span>
                    </span>
                    <span className="screen-choice-label">
                      {item.label} <ArrowUpRight size={13} />
                    </span>
                  </button>
                ))}
              </div>
              <p>Clique em uma tela para explorar.</p>
            </div>
          </div>
        </div>
        <span className="showroom-announcement" role="status">
          {project.label}: {project.title} Escolha PC, tablet ou celular para explorar.
        </span>
        {previewOpen && (
          <Suspense
            fallback={
              <div className="nt-lazy-loader" role="status" aria-live="polite">
                Preparando demonstração interativa...
              </div>
            }
          >
            <ProjectShowcaseModal
              projectId={project.id}
              projectLabel={project.label}
              projectAddress={project.address}
              device={device}
              onDeviceChange={setDevice}
              onClose={() => setPreviewOpen(false)}
            />
          </Suspense>
        )}
      </div>
    </section>
  )
}
