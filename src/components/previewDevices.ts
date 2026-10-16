import { Monitor, Smartphone, Tablet } from 'lucide-react'

export const previewDevices = [
  { id: 'pc', label: 'PC', icon: Monitor, detail: 'Visão completa para analisar e decidir.' },
  {
    id: 'tablet',
    label: 'Tablet',
    icon: Tablet,
    detail: 'Espaço para trabalhar, liberdade para levar.',
  },
  { id: 'android', label: 'Android', icon: Smartphone, detail: 'Sua operação na palma da mão.' },
  {
    id: 'ios',
    label: 'iPhone · iOS',
    icon: Smartphone,
    detail: 'Uma experiência clara em cada toque.',
  },
] as const

export type PreviewDevice = (typeof previewDevices)[number]['id']
