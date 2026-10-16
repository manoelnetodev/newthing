import { useEffect, useId, useRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { AlertCircle, X } from 'lucide-react'

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  return <button className={`button button-${variant} ${className}`} {...props} />
}

export function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  )
}

export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="error-message" role="alert">
      <AlertCircle size={18} />
      <span>{children}</span>
    </div>
  )
}

export function Modal({
  title,
  description,
  children,
  onClose,
  className = '',
}: {
  title: string
  description?: string
  children: ReactNode
  onClose: () => void
  className?: string
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  useEffect(() => {
    const element = dialog.current
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    element?.showModal()
    element
      ?.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not(:disabled), [role="tab"][aria-selected="true"], select:not(:disabled), textarea:not(:disabled)',
      )
      ?.focus()
    return () => {
      element?.close()
      queueMicrotask(() => {
        if (opener?.isConnected && !document.querySelector('dialog[open]')) opener.focus()
      })
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      className={`modal ${className}`}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onKeyDown={(event) => {
        if (event.key !== 'Tab' || event.ctrlKey || event.altKey || event.metaKey) return
        const focusable = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button, input:not([type="hidden"]), select, textarea, summary, [tabindex]',
          ),
        ).filter(
          (element) =>
            element.tabIndex >= 0 &&
            !element.matches(':disabled') &&
            element.getClientRects().length > 0,
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target !== dialog.current) return
        const rect = dialog.current.getBoundingClientRect()
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose()
      }}
    >
      <div className="modal-head">
        <div>
          <h2 id={titleId}>{title}</h2>
          {description && <p id={descriptionId}>{description}</p>}
        </div>
        <Button
          variant="ghost"
          className="icon-button"
          aria-label="Fechar janela"
          onClick={onClose}
        >
          <X size={20} />
        </Button>
      </div>
      {children}
    </dialog>
  )
}
