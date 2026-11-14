import { useEffect, useRef, useState } from 'react'
import { eggs } from './data/eggs'
import EggCard from './components/EggCard'
import StartModal from './components/StartModal'
import TimerPanel from './components/TimerPanel'

export default function App() {
  const [selectedEgg, setSelectedEgg] = useState(eggs[1])
  const [modalEgg, setModalEgg] = useState(null)
  const [activeEgg, setActiveEgg] = useState(null)
  const [status, setStatus] = useState('idle')
  const [remaining, setRemaining] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const endTimeRef = useRef(null)
  const remainingRef = useRef(0)
  const audioContextRef = useRef(null)
  const alarmPlayedRef = useRef(false)

  const total = activeEgg ? activeEgg.minutes * 60 : 0

  useEffect(() => {
    if (status !== 'running') return undefined

    const update = () => {
      const secondsLeft = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000))
      remainingRef.current = secondsLeft
      setRemaining(secondsLeft)

      if (secondsLeft <= 0) {
        setStatus('done')
      }
    }

    update()
    const intervalId = window.setInterval(update, 200)
    return () => window.clearInterval(intervalId)
  }, [status])

  useEffect(() => {
    if (status === 'done' && !alarmPlayedRef.current) {
      alarmPlayedRef.current = true
      if (soundEnabled) playAlarm()
    }
  }, [status, soundEnabled])

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close()
      }
    }
  }, [])

  function playAlarm() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) return
      const context = audioContextRef.current || new AudioContextClass()
      audioContextRef.current = context
      if (context.state === 'suspended') context.resume()

      // A short, gentle three-note chime generated in the browser.
      ;[0, 0.28, 0.56].forEach((delay, index) => {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        const startAt = context.currentTime + delay
        oscillator.type = 'sine'
        oscillator.frequency.value = [660, 784, 988][index]
        gain.gain.setValueAtTime(0.0001, startAt)
        gain.gain.exponentialRampToValueAtTime(0.22, startAt + 0.035)
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.24)
        oscillator.connect(gain)
        gain.connect(context.destination)
        oscillator.start(startAt)
        oscillator.stop(startAt + 0.26)
      })
    } catch (error) {
      console.warn('The alarm could not be played:', error)
    }
  }

  function startTimer(egg) {
    const chosenEgg = egg || modalEgg || selectedEgg
    const seconds = chosenEgg.minutes * 60
    setActiveEgg(chosenEgg)
    setRemaining(seconds)
    remainingRef.current = seconds
    endTimeRef.current = Date.now() + seconds * 1000
    alarmPlayedRef.current = false
    setStatus('running')
    setModalEgg(null)
  }

  function pauseTimer() {
    const secondsLeft = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000))
    remainingRef.current = secondsLeft
    setRemaining(secondsLeft)
    setStatus(secondsLeft === 0 ? 'done' : 'paused')
  }

  function resumeTimer() {
    endTimeRef.current = Date.now() + remainingRef.current * 1000
    setStatus('running')
  }

  function resetTimer() {
    if (!activeEgg) return
    const seconds = activeEgg.minutes * 60
    remainingRef.current = seconds
    setRemaining(seconds)
    endTimeRef.current = Date.now() + seconds * 1000
    alarmPlayedRef.current = false
    setStatus('running')
  }

  function cancelTimer() {
    setStatus('idle')
    setActiveEgg(null)
    setRemaining(0)
    remainingRef.current = 0
    endTimeRef.current = null
    alarmPlayedRef.current = false
  }

  function handleEggSelect(egg) {
    setSelectedEgg(egg)
    setModalEgg(egg)
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="EggTimer home">
          <span className="brand__icon">🥚</span>
          <span>egg<span>timer</span></span>
        </a>
        <span className="header-note">A little timer for egg-cellent mornings</span>
        <span className="header-sun" aria-hidden="true">☀</span>
      </header>

      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">YOUR BREAKFAST, YOUR RULES</p>
          <h1>Boil it<br /><em>your way.</em></h1>
          <p className="hero__subtitle">No more guessing. Pick the egg you love, press start, and let us keep track of the time.</p>
          <div className="hero__note"><span>✦</span> Five ways to make your perfect egg</div>
        </div>
        <div className="hero__art" aria-hidden="true">
          <div className="hero-sun" />
          <div className="hero-plate">
            <div className="hero-egg"><div className="hero-yolk" /></div>
          </div>
          <span className="hero-spark hero-spark--one">✳</span>
          <span className="hero-spark hero-spark--two">✦</span>
          <span className="hero-caption">made just right</span>
        </div>
      </section>

      {status === 'idle' ? (
        <section className="selection-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIRST THINGS FIRST</p>
              <h2>How do you like your eggs?</h2>
            </div>
            <span className="section-side-note">Choose your perfect yolk ↓</span>
          </div>
          <div className="egg-grid">
            {eggs.map((egg) => (
              <EggCard
                key={egg.id}
                egg={egg}
                selected={selectedEgg.id === egg.id}
                onSelect={handleEggSelect}
              />
            ))}
          </div>
          <div className="tip-card">
            <span className="tip-icon">💡</span>
            <p><strong>Egg tip:</strong> Choose your preferred style, then start the timer when your egg goes into the boiling water.</p>
          </div>
        </section>
      ) : (
        <TimerPanel
          egg={activeEgg}
          remaining={remaining}
          total={total}
          status={status}
          soundEnabled={soundEnabled}
          onPause={pauseTimer}
          onResume={resumeTimer}
          onReset={resetTimer}
          onCancel={cancelTimer}
          onToggleSound={() => setSoundEnabled((value) => !value)}
        />
      )}

      <footer className="site-footer">
        <span>Made with <span className="footer-heart">♥</span> and a little bit of timing.</span>
        <span>EGGTIMER © 2026</span>
      </footer>

      <StartModal
        egg={modalEgg}
        onClose={() => setModalEgg(null)}
        onStart={() => startTimer(modalEgg)}
      />
    </main>
  )
}