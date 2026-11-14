# EggTimer — Boil It Your Way 🥚

A playful, responsive egg-boiling timer built with **React, Vite, JavaScript and CSS**. Choose the egg style you want, start the countdown, watch the progress bar, and hear a gentle chime when the timer finishes.

## Features

- Five preset egg styles: 6, 7, 8, 10 and 12 minutes
- Selectable egg cards and a confirmation modal
- Countdown timer with `MM:SS` display
- Live progress bar
- Pause, resume, restart and cancel controls
- Sound toggle and browser-generated completion chime
- Responsive layout for desktop and mobile
- No backend or database required

## Requirements

- Node.js 18 or later
- npm
- A modern browser

## How the timer works

The selected preset is stored in React state. When the user starts cooking, the app calculates an end timestamp using `Date.now()`. The display checks the difference between the current time and that end timestamp. This is more reliable than assuming every JavaScript interval fires exactly once per second.

- **Pause:** saves the remaining seconds.
- **Resume:** calculates a new end timestamp.
- **Restart:** resets the countdown to the selected duration.
- **Cancel:** returns to egg selection.
- **Finish:** displays the completed state and plays a short chime if sound is enabled.

The alarm is generated with the browser's Web Audio API, so no separate audio file is required. Browsers may restrict audio until the user interacts with the page; starting the timer provides that interaction.

```

## Important cooking note

The preset times are illustrative starting points, not guaranteed food-safety or doneness instructions. Egg size, starting temperature, altitude, water temperature and cooking method can affect the result. Follow reliable food-safety guidance for your location and needs.

---

Made with React, Vite and a little egg-citement. 🍳
