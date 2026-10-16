import { ArrowUpRight, ChartNoAxesCombined, Code2, Globe } from 'lucide-react'
import './WhoWeAre.css'
import './TeamEditorial.css'
import { teamPhotos } from '../data/teamPhotos'

type TeamMember = {
  name: string
  role: string
  roleCode: string
  fullRole: string
  responsibility: string
  image: { src: string; fallback: string; width: number; height: number }
  imageClassName: string
  description: string
  focus?: string[]
  instagram?: string
}

const developmentTeam: TeamMember[] = [
  {
    name: 'Manoel Neto',
    role: 'Co-Founder & CTO',
    roleCode: 'CTO',
    fullRole: 'Chief Technology Officer',
    responsibility: 'Direção de tecnologia e arquitetura de sistemas',
    image: teamPhotos.manoel,
    imageClassName: 'team-photo-manoel',
    description:
      'Conecta desenvolvimento de sistemas, infraestrutura e automações para criar soluções integradas, com atenção à operação da empresa e à evolução de cada projeto.',
    focus: ['Sistemas sob medida', 'Automações'],
    instagram: 'https://www.instagram.com/manoel_io/',
  },
  {
    name: 'Ronan Severo',
    role: 'SDE',
    roleCode: 'SDE',
    fullRole: 'Software Development Engineer',
    responsibility: 'Desenvolvimento de software e integrações',
    image: teamPhotos.ronan,
    imageClassName: 'team-photo-ronan',
    description:
      'Transforma o planejamento em software: desenvolve funcionalidades, conecta processos e integra sistemas para apoiar a rotina de cada cliente.',
    focus: ['Desenvolvimento de sistemas', 'Integrações'],
  },
]

const partnershipTeam: TeamMember[] = [
  {
    name: 'Yuri Gabriel',
    role: 'Founder & CEO',
    roleCode: 'CEO',
    fullRole: 'Chief Executive Officer',
    responsibility: 'Direção estratégica e visão de negócio',
    image: teamPhotos.yuri,
    imageClassName: 'team-photo-yuri',
    description:
      'Conecta a visão do cliente à estratégia do projeto. Sua experiência em contabilidade e gestão financeira contribui para alinhar objetivos, prioridades e decisões de negócio.',
    focus: ['Gestão financeira', 'Visão de negócio'],
    instagram: 'https://www.instagram.com/yurig_contador/',
  },
  {
    name: 'Maksuel Silva',
    role: 'COO',
    roleCode: 'COO',
    fullRole: 'Chief Operating Officer',
    responsibility: 'Operações, parcerias e relacionamento',
    image: teamPhotos.maksuel,
    imageClassName: 'team-photo-macsuel',
    description:
      'Aproxima pessoas, parcerias e operação. Contribui para organizar o relacionamento com as empresas e alinhar as necessidades do cliente ao andamento do projeto.',
    focus: ['Parcerias', 'Visão empreendedora'],
    instagram: 'https://www.instagram.com/maksueel/',
  },
]

const teamAreas = [
  {
    id: 'parcerias',
    number: '01',
    icon: ChartNoAxesCombined,
    title: 'Liderança que escuta. Estratégia que direciona.',
    label: 'CEO + COO / ESTRATÉGIA E OPERAÇÕES',
    description:
      'Yuri Gabriel e Maksuel Silva conectam o que você quer conquistar às decisões do projeto. Visão de negócio, proximidade e organização para construir uma parceria com direção clara.',
    people: partnershipTeam,
  },
  {
    id: 'desenvolvimento',
    number: '02',
    icon: Code2,
    title: 'Visão técnica. Construção de verdade.',
    label: 'CTO + SDE / TECNOLOGIA E DESENVOLVIMENTO',
    description:
      'Manoel Neto e Ronan Severo transformam a direção do projeto em sites, sistemas e automações. Arquitetura, código e integrações trabalham juntos para dar forma ao que você precisa.',
    people: developmentTeam,
  },
]

export function WhoWeAre({ onContact }: { onContact: () => void }) {
  return (
    <section
      id="quem-somos"
      className="section identity-section team-editorial"
      aria-labelledby="identity-title"
    >
      <span id="sobre" className="team-anchor" aria-hidden="true" />
      <div className="container">
        <div className="team-editorial-intro">
          <div className="section-heading">
            <span className="eyebrow">
              <span />
              QUEM SOMOS
            </span>
            <h2 id="identity-title">
              Visão de negócio.
              <br />
              <span>Engenharia para realizar.</span>
            </h2>
          </div>
          <div>
            <p>
              Somos a Newthing. Unimos experiência contábil, financeira e operacional ao
              desenvolvimento de sites, sistemas e automações.
            </p>
            <p>
              Essa combinação conecta o que sua empresa precisa resolver às decisões de quem planeja
              e constrói a solução. Você sabe quem cuida de cada frente.
            </p>
          </div>
        </div>
        <div id="equipe" className="team-editorial-groups">
          {teamAreas.map((area) => (
            <section
              key={area.id}
              className={`team-editorial-area team-area-${area.id}`}
              aria-labelledby={`team-area-${area.id}`}
            >
              <header className="team-editorial-area-heading">
                <area.icon size={20} aria-hidden="true" />
                <div>
                  <span>{area.label}</span>
                  <h3 id={`team-area-${area.id}`}>
                    {area.id === 'parcerias'
                      ? 'Estratégia e operações'
                      : 'Tecnologia e desenvolvimento'}
                  </h3>
                </div>
                <small>{area.number}</small>
              </header>
              <div className="team-editorial-grid">
                {area.people.map((person, index) => (
                  <article
                    className="team-profile"
                    key={person.name}
                    aria-labelledby={`team-person-${area.id}-${index}`}
                  >
                    <div className="team-portrait">
                      <img
                        className={person.imageClassName}
                        src={person.image.src}
                        alt={`Retrato profissional de ${person.name}`}
                        width={person.image.width}
                        height={person.image.height}
                        loading="lazy"
                        decoding="async"
                        onError={({ currentTarget }) => {
                          if (currentTarget.dataset.fallback !== 'true') {
                            currentTarget.dataset.fallback = 'true'
                            currentTarget.src = person.image.fallback
                          }
                        }}
                      />
                    </div>
                    <div className="team-profile-details">
                      <h4 id={`team-person-${area.id}-${index}`}>{person.name}</h4>
                      <div className="team-role">
                        <span>{person.role}</span>
                        <small>{person.fullRole}</small>
                      </div>
                      <p className="team-description">{person.description}</p>
                      {person.focus && (
                        <ul
                          className="team-focus"
                          aria-label={`Áreas de atuação de ${person.name}`}
                        >
                          {person.focus.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {person.instagram && (
                        <a
                          className="team-profile-link"
                          href={person.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver perfil profissional de ${person.name} no Instagram (abre em nova aba)`}
                        >
                          <Globe size={14} />
                          <span>Perfil profissional</span>
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="team-editorial-contact">
          <p>O objetivo é seu. A construção é em parceria.</p>
          <button className="button button-secondary" onClick={onContact}>
            Vamos falar sobre a sua empresa
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
