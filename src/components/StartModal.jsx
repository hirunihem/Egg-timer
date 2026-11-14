import EggIllustration from './EggIllustration'

export default function StartModal({ egg, onClose, onStart }) {
  if (!egg) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close" type="button">×</button>
        <div className="modal__illustration">
          <EggIllustration type={egg.className} size="large" />
        </div>
        <p className="eyebrow">YOUR EGG, YOUR WAY</p>
        <h2 id="start-title">{egg.name}</h2>
        <p className="modal__description">{egg.description}.</p>
        <div className="duration-pill">⏱ {egg.minutes}:00 minutes</div>
        <button className="button button--primary button--wide" onClick={onStart} type="button">
          Start cooking <span aria-hidden="true">→</span>
        </button>
        <button className="text-button" onClick={onClose} type="button">Choose another egg</button>
      </section>
    </div>
  )
}