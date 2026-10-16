/** Restore an abandoned focus without overriding a new interaction or another dialog. */
export function restoreFocus(target: HTMLElement | null) {
  if (!target?.isConnected || document.querySelector('dialog[open]')) return
  const active = document.activeElement
  if (
    active instanceof HTMLElement &&
    active !== document.body &&
    active !== document.documentElement &&
    active.isConnected &&
    active !== target
  )
    return
  target.focus({ preventScroll: true })
}
