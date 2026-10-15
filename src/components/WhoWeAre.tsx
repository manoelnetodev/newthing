import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Code2,
  Compass,
  Headphones,
  Globe,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import './WhoWeAre.css'
import { ClientVision } from './ClientVision'

const expertise = [
  {
    number: '01',
    icon: Code2,
    title: 'Software com propósito.',
    text: 'Desenvolvemos sistemas sob medida, aplicações web e plataformas que traduzem as necessidades da sua empresa em experiências simples de usar.',
  },
  {
    number: '02',
    icon: Workflow,
    title: 'Operações mais conectadas.',
    text: 'Criamos automações e integramos ferramentas para reduzir tarefas repetitivas, organizar informações e dar mais fluidez à rotina do seu negócio.',
  },
  {
    number: '03',
    icon: Headphones,
    title: 'Atendimento de verdade.',
    text: 'Escuta, proximidade e comunicação clara. Entendemos o seu contexto, esclarecemos decisões técnicas e mantemos você perto de cada etapa do projeto.',
  },
  {
    number: '04',
    icon: RefreshCw,
    title: 'Uma parceria que continua.',
    text: 'Planejamos o acompanhamento, as melhorias e a evolução do sistema conforme as necessidades e o escopo de cada projeto. A entrega é o começo de uma nova etapa.',
  },
]

type TeamMember = {
  name: string
  role: string
  image: string
  imageClassName: string
  description: string
  focus?: string[]
  instagram?: string
}

const developmentTeam: TeamMember[] = [
  {
    name: 'Manoel Neto',
    role: 'CTO & Founder',
    image: '/team/manoel-neto-estudio-v2.png',
    imageClassName: 'team-photo-manoel',
    description:
      'Conecta desenvolvimento de sistemas, infraestrutura e automações para criar soluções integradas, com atenção à operação da empresa e à evolução de cada projeto.',
    focus: ['Sistemas sob medida', 'Automações'],
    instagram: 'https://www.instagram.com/manoel_io/',
  },
  {
    name: 'Ronan Severo',
    role: 'Desenvolvedor de sistemas',
    image: '/team/ronan-severo-estudio-v2.png',
    imageClassName: 'team-photo-ronan',
    description:
      'Construção de software e sistemas que conectam processos e transformam necessidades do negócio em soluções digitais.',
  },
]

const partnershipTeam: TeamMember[] = [
  {
    name: 'Yuri Gabriel',
    role: 'CEO & Founder',
    image: '/team/yuri-gabriel-estudio-v2.png',
    imageClassName: 'team-photo-yuri',
    description:
      'Une contabilidade e gestão financeira para compreender a realidade de cada empresa e conectar as prioridades do negócio ao planejamento de projetos digitais.',
    focus: ['Gestão financeira', 'Visão de negócio'],
    instagram: 'https://www.instagram.com/yurig_contador/',
  },
  {
    name: 'Maksuel Silva',
    role: 'COO',
    image: '/team/macsuel-silva-estudio-v2.png',
    imageClassName: 'team-photo-macsuel',
    description:
      'Traz a visão contábil e empreendedora para o diálogo com as empresas, ajudando a alinhar parcerias e projetos digitais às necessidades do negócio.',
    focus: ['Parcerias', 'Visão empreendedora'],
    instagram: 'https://www.instagram.com/maksueel/',
  },
]

const teamAreas = [
  {
    id: 'parcerias',
    number: '01',
    icon: ChartNoAxesCombined,
    title: 'Parcerias e visão de negócio',
    label: 'RELACIONAMENTO E ESTRATÉGIA',
    photoLabel: 'PARCERIAS',
    description:
      'Contabilidade, gestão financeira e visão empreendedora conectadas à realidade de cada empresa. Atuamos nas parcerias, nas negociações e no alinhamento de sites e sistemas às prioridades do negócio.',
    people: partnershipTeam,
  },
  {
    id: 'desenvolvimento',
    number: '02',
    icon: Code2,
    title: 'Desenvolvimento de sistemas',
    label: 'ENGENHARIA E PRODUTO',
    photoLabel: 'DESENVOLVIMENTO',
    description:
      'Manoel Neto e Ronan Severo cuidam da construção técnica: software sob medida, sites, integrações e sistemas automatizados que transformam necessidades em soluções para o dia a dia da empresa.',
    people: developmentTeam,
  },
]

export function WhoWeAre({
  onContact,
  onStartProject,
}: {
  onContact: () => void
  onStartProject: (goal: string, stage: string) => void
}) {
  return (
    <section id="quem-somos" className="section identity-section" aria-labelledby="identity-title">
      <div className="container">
        <div className="identity-intro">
          <div className="identity-heading">
            <span className="eyebrow">
              <span />
              QUEM SOMOS
            </span>
            <h2 id="identity-title">
              Ouvimos o que você almeja.
              <br />
              <span>Construímos o caminho.</span>
            </h2>
            <div className="identity-story">
              <p>Antes de definir a tecnologia, queremos conhecer a sua história.</p>
              <p>
                Somos a Newthing. Desenvolvemos <strong>sites, sistemas e automações</strong> a
                partir do que você quer realizar. Escutamos seus desafios, entendemos sua rotina e
                projetamos uma solução com você.
              </p>
            </div>
            <ul className="identity-care">
              <li>
                <Headphones size={18} />
                <div>
                  <strong>Escuta para entender.</strong>
                  <p>Seu contexto e seus objetivos orientam o projeto.</p>
                </div>
              </li>
              <li>
                <Compass size={18} />
                <div>
                  <strong>Clareza para decidir.</strong>
                  <p>Você participa do escopo, do protótipo e das prioridades.</p>
                </div>
              </li>
              <li>
                <ShieldCheck size={18} />
                <div>
                  <strong>Proximidade para evoluir.</strong>
                  <p>Acompanhamos as entregas e planejamos os próximos passos com você.</p>
                </div>
              </li>
            </ul>
            <div className="identity-signature">
              <span className="brand-symbol" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <div>
                Pessoas próximas. Tecnologia com propósito.
                <small>O SEU OBJETIVO NO CENTRO DE CADA DECISÃO.</small>
              </div>
            </div>
          </div>
          <ClientVision onStartProject={onStartProject} />
        </div>
        <section id="equipe" className="identity-team" aria-labelledby="team-title">
          <div className="identity-team-intro">
            <div className="identity-team-heading">
              <span className="eyebrow">
                <span />
                QUEM CAMINHA COM VOCÊ
              </span>
              <h3 id="team-title">
                Pessoas de verdade.
                <br />
                <span>Perto do seu projeto.</span>
              </h3>
            </div>
            <div className="identity-team-story">
              <p>
                Uma parceria começa com saber quem está do outro lado. Reunimos visão de negócio e
                desenvolvimento para ouvir suas necessidades, esclarecer decisões e cuidar da
                construção.
              </p>
              <p>
                Da conversa sobre a sua rotina à validação das entregas, nossa equipe trabalha
                próxima de você. A tecnologia entra para realizar o que faz sentido para o seu
                negócio.
              </p>
              <div className="identity-team-note">
                <span />
                <span>
                  Seu objetivo orienta as decisões.
                  <br />
                  Nossa equipe acompanha o caminho.
                </span>
              </div>
            </div>
          </div>
          {teamAreas.map((area) => (
            <section
              key={area.id}
              className={`team-area team-area-${area.id}`}
              aria-labelledby={`team-area-${area.id}`}
            >
              <div className="team-area-intro">
                <div className="team-area-number">
                  <area.icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  <span>{area.number}</span>
                </div>
                <span className="team-area-label">{area.label}</span>
                <h4 id={`team-area-${area.id}`}>{area.title}</h4>
                <p>{area.description}</p>
              </div>
              {area.people.map((person, index) => (
                <article
                  className="team-profile"
                  key={person.name}
                  aria-labelledby={`team-person-${area.id}-${index}`}
                >
                  <div className="team-portrait">
                    <img
                      className={person.imageClassName}
                      src={person.image}
                      alt={`Retrato profissional de ${person.name}`}
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="team-photo-caption">
                      <span className="team-photo-mark" />
                      NEWTHING <span>{area.photoLabel}</span>
                    </span>
                  </div>
                  <div className="team-profile-details">
                    <h5 id={`team-person-${area.id}-${index}`}>{person.name}</h5>
                    <p className="team-role">{person.role}</p>
                    <p className="team-description">{person.description}</p>
                    {person.focus && (
                      <ul className="team-focus" aria-label={`Áreas de atuação de ${person.name}`}>
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
                        <Globe size={13} aria-hidden="true" />
                        <span>Perfil profissional</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </section>
          ))}
        </section>
        <div className="identity-expertise">
          {expertise.map(({ number, icon: Icon, title, text }) => (
            <article key={number}>
              <div className="identity-expertise-top">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                <span>{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="identity-promise">
          <div>
            <span className="identity-promise-line" />
            <p>
              Entender o seu negócio.
              <br />
              <strong>Construir o que faz diferença para ele.</strong>
            </p>
          </div>
          <button className="button button-secondary" onClick={onContact}>
            Vamos falar sobre a sua empresa <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
