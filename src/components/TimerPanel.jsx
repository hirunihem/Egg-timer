import EggIllustration from './EggIllustration'

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

export default function TimerPanel({
  egg, remaining, total, status, soundEnabled,
  onPause, onResume, onReset, onCancel, onToggleSound,
}) {
  const progress = total > 0 ? Math.min(100, ((total - remaining) / total) * 100) : 0
  const isRunning = status === 'running'
  const isPaused = status === 'paused'
  const isDone = status === 'done'

  return (
    <section className={`timer-panel ${isDone ? 'timer-panel--done' : ''}`}>
      <div className="timer-panel__top">
        <div>
          <p className="eyebrow">{isDone ? 'TIME TO EAT' : isPaused ? 'TAKING A LITTLE BREAK' : 'COOKING IN PROGRESS'}</p>
          <h2>{isDone ? 'Your egg is ready!' : `${egg.name} egg`}</h2>
        </div>
        <button className="sound-toggle" onClick={onToggleSound} type="button" aria-pressed={soundEnabled}>
          <span>{soundEnabled ? '🔔' : '🔕'}</span> Sound {soundEnabled ? 'on' : 'off'}
        </button>
      </div>

      <div className="timer-panel__main">
        <div className="timer-egg">
          <EggIllustration type={egg.className} size="large" />
          {isDone && <span className="ready-sparkle">✦</span>}
        </div>
        <div className="timer-readout" aria-live="polite">
          <span className="timer-readout__time">{formatTime(remaining)}</span>
          <span className="timer-readout__label">{isDone ? 'Finished' : isPaused ? 'Paused' : 'remaining'}</span>
        </div>
      </div>

      <div className="progress-area">
        <div className="progress-labels">
          <span>{isDone ? 'All done!' : 'Cooking progress'}</span>
          <strong>{Math.round(progress)}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Cooking progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(progress)}
        >
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-times"><span>0:00</span><span>{egg.minutes}:00</span></div>
      </div>

      {isDone ? (
        <div className="done-message">🥚 Perfect timing! Carefully remove your egg and enjoy.</div>
      ) : (
        <div className="timer-actions">
          {isRunning && <button className="button button--primary" onClick={onPause} type="button">Ⅱ Pause</button>}
          {isPaused && <button className="button button--primary" onClick={onResume} type="button">▶ Resume</button>}
          <button className="button button--secondary" onClick={onReset} type="button">↺ Restart</button>
          <button className="button button--quiet" onClick={onCancel} type="button">Cancel</button>
        </div>
      )}
      <p className="timer-footnote">Keep an eye on your pot. Cooking results can vary depending on egg size and starting temperature.</p>
    </section>
  )
}