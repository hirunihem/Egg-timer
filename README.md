# EggTimer — Boil It Your Way 🥚

A playful, responsive egg-boiling timer built with **React, Vite, JavaScript and CSS**. Choose the egg style you want, start the countdown, watch the progress bar, and hear a gentle chime when the timer finishes.


## 🚀 Live Website

🔗  https://hirunihem.github.io/Egg-timer/

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

