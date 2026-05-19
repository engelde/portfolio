export const isEditableTarget = (target: EventTarget | null) => {
  if (typeof Element === 'undefined' || !(target instanceof Element)) return false

  return Boolean(
    target.closest(
      'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [data-pipe-room-message-form="true"]'
    )
  )
}
