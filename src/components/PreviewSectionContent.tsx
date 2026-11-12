import { useState } from 'react'
import { ArrowRight, CheckCircle2, Workflow, Users } from 'lucide-react'
import type { PreviewSection } from './previewSections'
import { previewSectionLabels } from './previewSections'
import './PreviewSectionContent.css'

const people = [
  { name: 'Ana Costa', initials: 'AC', role: 'Operações', tasks: 4 },
  { name: 'Bruno Lima', initials: 'BL', role: 'Desenvolvimento', tasks: 3 },
  { name: 'Carla Souza', initials: 'CS', role: 'Atendimento', tasks: 2 },
  { name: 'Diego Santos', initials: 'DS', role: 'Design', tasks: 5 },
]
const projectRows = [
  { name: 'Nova identidade digital', owner: 'Diego Santos', status: 'Em andamento', progress: 68 },
  { name: 'Portal do cliente', owner: 'Bruno Lima', status: 'Concluído', progress: 100 },
  { name: 'Automação de pedidos', owner: 'Ana Costa', status: 'Em andamento', progress: 42 },
]
const headings: Record<PreviewSection, { title: string; text: string }> = {
  overview: {
    title: 'Seu workspace em movimento.',
    text: 'Acompanhe o que acontece na sua operação.',
  },
  projects: {
    title: 'Cada projeto, um próximo passo.',
    text: 'Acompanhe responsáveis, progresso e entregas.',
  },
  clients: {
    title: 'Relacionamentos bem cuidados.',
    text: 'Clientes e próximos contatos em um só lugar.',
  },
  finance: {
    title: 'Seu financeiro, organizado.',
    text: 'Acompanhe recebimentos e o que ainda está previsto.',
  },
  settings: {
    title: 'Do seu jeito.',
    text: 'Experimente as preferências deste workspace ilustrativo.',
  },
  flows: { title: 'Fluxos da operação.', text: 'Da chegada do pedido ao próximo atendimento.' },
  team: {
    title: 'Equipe do workspace.',
    text: 'Pessoas, responsabilidades e entregas conectadas.',
  },
}

export function PreviewSectionContent({
  section,
  brand = 'Workspace',
}: {
  section: PreviewSection
  brand?: string
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [notifications, setNotifications] = useState(true)
  const heading = headings[section]
  const matches = (value: string) =>
    value.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))
  const filteredPeople = people.filter((person) => matches(`${person.name} ${person.role}`))
  const filteredProjects = projectRows.filter(
    (project) => matches(project.name) && (filter === 'Todos' || project.status === filter),
  )
  return (
    <section className="preview-section-content" aria-label={heading.title}>
      <header>
        <span>
          {brand.toUpperCase()} /{' '}
          {section === 'team'
            ? 'PESSOAS'
            : section === 'flows'
              ? 'AUTOMAÇÕES'
              : section === 'overview'
                ? 'VISÃO GERAL'
                : previewSectionLabels[section].toUpperCase()}
        </span>
        <h3>{heading.title}</h3>
        <p>{heading.text}</p>
      </header>
      {['projects', 'clients', 'team'].includes(section) && (
        <input
          type="search"
          aria-label={`Buscar ${section === 'projects' ? 'projetos' : section === 'team' ? 'pessoas' : 'clientes'} na demonstração`}
          placeholder={
            section === 'projects'
              ? 'Buscar projeto...'
              : section === 'team'
                ? 'Buscar pessoa...'
                : 'Buscar cliente...'
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      )}
      {section === 'team' && (
        <>
          <div className="preview-section-stat">
            <Users size={17} />
            <strong>4 pessoas</strong>
            <span>14 entregas em andamento</span>
          </div>
          <div className="preview-people-list">
            {filteredPeople.map((person) => (
              <article key={person.name} className="preview-person">
                <span className="preview-person-avatar" aria-hidden="true">
                  {person.initials}
                </span>
                <div>
                  <h4>{person.name}</h4>
                  <p>{person.role}</p>
                </div>
                <small>{person.tasks} entregas</small>
              </article>
            ))}
            {filteredPeople.length === 0 && (
              <p className="preview-empty">Nenhuma pessoa encontrada.</p>
            )}
          </div>
        </>
      )}
      {section === 'flows' && (
        <div className="preview-flow-list">
          {[
            { name: 'Novo pedido', steps: ['Receber', 'Registrar', 'Notificar'], runs: 128 },
            { name: 'Atualizar estoque', steps: ['Conferir', 'Atualizar', 'Confirmar'], runs: 84 },
            {
              name: 'Retorno ao cliente',
              steps: ['Organizar', 'Agendar', 'Avisar equipe'],
              runs: 56,
            },
          ].map((flow) => (
            <article key={flow.name}>
              <header>
                <Workflow size={18} />
                <h4>{flow.name}</h4>
                <span>Ativo</span>
              </header>
              <ol>
                {flow.steps.map((step, index) => (
                  <li key={step}>
                    {index > 0 && <ArrowRight size={12} />}
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <small>{flow.runs} execuções neste mês · Sem pendências</small>
            </article>
          ))}
        </div>
      )}
      {section === 'projects' && (
        <>
          <label className="preview-filter">
            Status{' '}
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filtrar projetos por status"
            >
              <option>Todos</option>
              <option>Em andamento</option>
              <option>Concluído</option>
            </select>
          </label>
          <div className="preview-project-list">
            {filteredProjects.map((project) => (
              <article key={project.name}>
                <div>
                  <h4>{project.name}</h4>
                  <p>{project.owner}</p>
                </div>
                <small>{project.status}</small>
                <div className="preview-progress">
                  <i style={{ width: `${project.progress}%` }} />
                </div>
                <span>{project.progress}%</span>
              </article>
            ))}
            {filteredProjects.length === 0 && (
              <p className="preview-empty">Nenhum projeto encontrado.</p>
            )}
          </div>
        </>
      )}
      {section === 'clients' && (
        <div className="preview-people-list">
          {[
            { name: 'Aurora Studio', initials: 'AS', role: 'Identidade e presença digital' },
            { name: 'Norte Digital', initials: 'ND', role: 'Portal do cliente' },
            { name: 'Nexo Comércio', initials: 'NC', role: 'Gestão e automações' },
          ]
            .filter((client) => matches(client.name))
            .map((client) => (
              <article className="preview-person" key={client.name}>
                <span className="preview-person-avatar">{client.initials}</span>
                <div>
                  <h4>{client.name}</h4>
                  <p>{client.role}</p>
                </div>
                <small>Ativo</small>
              </article>
            ))}
          {!['Aurora Studio', 'Norte Digital', 'Nexo Comércio'].some(matches) && (
            <p className="preview-empty">Nenhum cliente encontrado.</p>
          )}
        </div>
      )}
      {section === 'finance' && (
        <>
          <div className="preview-summary-grid">
            <div>
              <small>Recebido</small>
              <strong>R$ 48.750</strong>
            </div>
            <div>
              <small>Previsto</small>
              <strong>R$ 12.400</strong>
            </div>
          </div>
          <label className="preview-filter">
            Recebimentos{' '}
            <select
              aria-label="Filtrar recebimentos"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option>Todos</option>
              <option>Recebido</option>
              <option>Previsto</option>
            </select>
          </label>
          {[
            { name: 'Aurora Studio', value: 'R$ 8.500', status: 'Recebido' },
            { name: 'Norte Digital', value: 'R$ 6.200', status: 'Previsto' },
            { name: 'Nexo Comércio', value: 'R$ 6.200', status: 'Previsto' },
          ]
            .filter((item) => filter === 'Todos' || item.status === filter)
            .map((item) => (
              <div className="preview-payment" key={item.name}>
                <div>
                  <h4>{item.name}</h4>
                  <small>{item.status}</small>
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
        </>
      )}
      {section === 'settings' && (
        <div className="preview-settings">
          <div>
            <h4>Notificações da demonstração</h4>
            <p>{notifications ? 'Avisos de projetos ativados.' : 'Avisos de projetos pausados.'}</p>
            <button
              type="button"
              role="switch"
              aria-checked={notifications}
              onClick={() => setNotifications(!notifications)}
            >
              {notifications ? 'Ativadas' : 'Pausadas'}
            </button>
          </div>
          <small>Preferência local desta demonstração.</small>
        </div>
      )}
      {section === 'overview' && (
        <>
          <div className="preview-summary-grid">
            <div>
              <small>Fluxos ativos</small>
              <strong>08</strong>
            </div>
            <div>
              <small>Execuções no mês</small>
              <strong>1.284</strong>
            </div>
            <div>
              <small>Conclusão</small>
              <strong>98,6%</strong>
            </div>
          </div>
          <h4 className="preview-activity-heading">Últimas atividades</h4>
          {[
            'Novo lead registrado no CRM',
            'Pedido encaminhado à equipe',
            'Relatório atualizado',
          ].map((item, index) => (
            <div className="preview-activity" key={item}>
              <CheckCircle2 size={16} />
              <span>{item}</span>
              <small>Há {index * 3 + 2} min</small>
            </div>
          ))}
        </>
      )}
    </section>
  )
}
