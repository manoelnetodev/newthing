import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  BatteryFull,
  LayoutDashboard,
  MoreHorizontal,
  ShieldCheck,
  Signal,
  Users,
  Wifi,
  Workflow,
} from 'lucide-react'
import './DevicePreview.css'
import { previewDevices } from './previewDevices'
import type { PreviewDevice } from './previewDevices'
import { previewSectionLabels } from './previewSections'
import type { PreviewSection } from './previewSections'

export function DevicePreview({
  device,
  address,
  label,
  children,
}: {
  device: PreviewDevice
  address: string
  label: string
  children: (section: PreviewSection, onNavigate: (section: PreviewSection) => void) => ReactNode
}) {
  const mobile = device === 'android' || device === 'ios'
  const [section, setSection] = useState<PreviewSection>(label === 'SaaS' ? 'flows' : 'overview')
  const content = useRef<HTMLDivElement>(null)
  useEffect(() => {
    content.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [section, device])
  return (
    <div className={`device-stage device-stage-${device}`} data-device={device}>
      <div className={`device-hardware device-${device}`}>
        <div className="device-screen">
          {mobile ? (
            <div className="device-system-bar" aria-hidden="true">
              <span>9:41</span>
              <i className="device-camera" />
              <span>
                <Signal />
                <Wifi />
                <BatteryFull />
              </span>
            </div>
          ) : (
            <div className="demo-browser-bar" aria-hidden="true">
              <span className="demo-window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>
                <ShieldCheck />
                {address}
              </span>
              <MoreHorizontal />
            </div>
          )}
          <div
            className="device-content"
            ref={content}
            role="region"
            tabIndex={0}
            aria-label={`${label} em ${previewDevices.find((item) => item.id === device)?.label}: ${previewSectionLabels[section]}. Role para explorar a interface ilustrativa.`}
          >
            {children(section, setSection)}
          </div>
          {mobile &&
            (label === 'Website' ? (
              <div className="device-site-address" aria-hidden="true">
                <ShieldCheck />
                forma.demo
              </div>
            ) : (
              <nav className="device-app-nav" aria-label="Navegação da demonstração">
                {(
                  [
                    { id: 'overview', label: 'Visão geral', icon: LayoutDashboard },
                    { id: 'flows', label: 'Fluxos', icon: Workflow },
                    { id: 'team', label: 'Equipe', icon: Users },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={section === item.id ? 'active' : ''}
                    aria-pressed={section === item.id}
                    onClick={() => setSection(item.id)}
                  >
                    <item.icon aria-hidden="true" />
                    {item.label}
                  </button>
                ))}
              </nav>
            ))}
          {mobile && (
            <div className="device-home-area" aria-hidden="true">
              <i />
            </div>
          )}
        </div>
        {device === 'pc' && (
          <div className="device-monitor-chin" aria-hidden="true">
            <span />
            <i />
          </div>
        )}
      </div>
    </div>
  )
}
