import EggIllustration from './EggIllustration'

export default function EggCard({ egg, selected, onSelect }) {
  return (
    <button
      className={`egg-card ${selected ? 'egg-card--selected' : ''}`}
      onClick={() => onSelect(egg)}
      aria-pressed={selected}
      type="button"
    >
      <span className="egg-card__art">
        <EggIllustration type={egg.className} size="card" />
        {selected && <span className="selected-check">✓</span>}
      </span>
      <span className="egg-card__name">{egg.name}</span>
      <span className="egg-card__time">{egg.minutes} min</span>
      <span className="egg-card__description">{egg.description}</span>
    </button>
  )
}