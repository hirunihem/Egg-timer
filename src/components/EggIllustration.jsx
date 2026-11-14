export default function EggIllustration({ type = 'soft', size = 'large', cut = false }) {
  return (
    <div className={`egg-art egg-art--${size} egg-art--${type}`} aria-hidden="true">
      <div className="egg-shell">
        {cut ? (
          <div className={`egg-yolk egg-yolk--${type}`} />
        ) : (
          <>
            <span className="egg-shine" />
            <span className="egg-face">
              <i />
              <i />
              <b />
            </span>
          </>
        )}
      </div>
      {cut && <span className="egg-shadow" />}
    </div>
  )
}