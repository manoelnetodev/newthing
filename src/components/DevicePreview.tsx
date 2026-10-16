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

export function DevicePreview({
  device,
  address,
  label,
  children,
}: {
  device: PreviewDevice
  address: string
  label: string
  children: ReactNode
}) {
  const mobile = device === 'android' || device === 'ios'
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
            role="region"
            tabIndex={0}
            aria-label={`${label} em ${previewDevices.find((item) => item.id === device)?.label}. Role para explorar a interface ilustrativa.`}
          >
            {children}
          </div>
          {mobile &&
            (label === 'Website' ? (
              <div className="device-site-address" aria-hidden="true">
                <ShieldCheck />
                forma.demo
              </div>
            ) : (
              <div className="device-app-nav" aria-hidden="true">
                <span className={label === 'Dashboard' ? 'active' : ''}>
                  <LayoutDashboard />
                  Visão geral
                </span>
                <span className={label === 'SaaS' ? 'active' : ''}>
                  <Workflow />
                  Fluxos
                </span>
                <span>
                  <Users />
                  Equipe
                </span>
              </div>
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
