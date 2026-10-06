# Abdul Qadeer — Portfolio
React 18 + Vite, plain CSS, GSAP + ScrollTrigger.

## Run
    npm install
    npm run dev      # local dev server
    npm run build    # output in dist/

## Content
- Edit all text/data in `src/data.js`.
- Contact form: put your Web3Forms access key in `src/config.js` (empty = mailto fallback).
- Optional hero image: `public/images/hero.png` (otherwise built-in SVG laptop shows).

## Deploy to Firebase Hosting
    npm install -g firebase-tools
    firebase login
    firebase init hosting    # public dir: dist | single-page app: Yes | GitHub deploys: optional
    npm run build
    firebase deploy
