export type PreviewSection =
  'overview' | 'projects' | 'clients' | 'finance' | 'settings' | 'flows' | 'team'

export const previewSectionLabels: Record<PreviewSection, string> = {
  overview: 'Visão geral',
  projects: 'Projetos',
  clients: 'Clientes',
  finance: 'Financeiro',
  settings: 'Configurações',
  flows: 'Fluxos',
  team: 'Equipe',
}
