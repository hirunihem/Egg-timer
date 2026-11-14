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

## Run locally

1. Download and extract the project.
2. Open the extracted `egg-timer` folder in VS Code.
3. Open the integrated terminal.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Vite creates the production website in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
egg-timer/
├── public/
├── src/
│   ├── components/
│   │   ├── EggCard.jsx
│   │   ├── EggIllustration.jsx
│   │   ├── StartModal.jsx
│   │   └── TimerPanel.jsx
│   ├── data/
│   │   └── eggs.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## How the timer works

The selected preset is stored in React state. When the user starts cooking, the app calculates an end timestamp using `Date.now()`. The display checks the difference between the current time and that end timestamp. This is more reliable than assuming every JavaScript interval fires exactly once per second.

- **Pause:** saves the remaining seconds.
- **Resume:** calculates a new end timestamp.
- **Restart:** resets the countdown to the selected duration.
- **Cancel:** returns to egg selection.
- **Finish:** displays the completed state and plays a short chime if sound is enabled.

The alarm is generated with the browser's Web Audio API, so no separate audio file is required. Browsers may restrict audio until the user interacts with the page; starting the timer provides that interaction.

## Customise the egg presets

Edit `src/data/eggs.js`. Each object contains the preset's `id`, `minutes`, display name, description and illustration style.

For example, change `minutes: 6` to another duration if you want a different preset.

## Push to GitHub

Create an empty repository on GitHub, then run these commands from the project folder:

```bash
git init
git add .
git commit -m "Build EggTimer app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/egg-timer.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Deploy with Vercel

1. Push the project to GitHub.
2. Sign in to Vercel and import the repository.
3. Vercel should detect Vite automatically.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.
6. Deploy.

## Suggested improvements

- Add a ticking sound option.
- Add a choice of alarm tones.
- Add keyboard accessibility for modal controls.
- Add a small cooking guide explaining that actual egg results vary with egg size, starting temperature, altitude and cooking method.
- Add an optional setting for starting the timer when the water reaches a boil.

## Important cooking note

The preset times are illustrative starting points, not guaranteed food-safety or doneness instructions. Egg size, starting temperature, altitude, water temperature and cooking method can affect the result. Follow reliable food-safety guidance for your location and needs.

---

Made with React, Vite and a little egg-citement. 🍳
