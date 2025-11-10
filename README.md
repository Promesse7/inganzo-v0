# INGAnzo (Vite + React + TypeScript + Tailwind + Firebase)

A refactor from static UI into a scaffolded full-stack app with Firebase-backed backend (Auth, Firestore, Storage, Cloud Functions).

## Getting Started (Frontend)

1. Install deps:
   - `npm install`
2. Create `.env.local` with Firebase web config:
   - `VITE_FIREBASE_API_KEY=...`
   - `VITE_FIREBASE_AUTH_DOMAIN=...`
   - `VITE_FIREBASE_PROJECT_ID=...`
   - `VITE_FIREBASE_STORAGE_BUCKET=...`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID=...`
   - `VITE_FIREBASE_APP_ID=...`
3. Run dev:
   - `npm run dev`

Pages include Home, Lessons, Quiz, Profile, and Upload. Mock data is provided in `src/lib/mockData.ts`. The quiz runs locally and stubs server submission via `src/lib/api.ts`.

## Firebase Functions

1. Install CLI: `npm i -g firebase-tools`
2. Login: `firebase login`
3. Initialize project if needed: `firebase use <your-project-id>`
4. Install function deps:
   - `cd functions && npm ci`
5. Emulate locally:
   - `npm run serve` (from `functions/`)
6. Deploy:
   - `npm run deploy` (from `functions/`)

Cloud Functions include:
- `uploadCreated` (ingestion stub)
- `uploadApproved` (moderation stub + points)
- `quizAttempt` (authoritative scoring stub)
- `weeklyChallenge` (scheduled stub)

## CI

See `.github/workflows/ci.yml` for lint/build workflow. Configure secrets for deploy if desired.

## Notes

- Assets should live in `public/assets`. Existing `src/assets` items can be moved there and referenced via `/assets/...`. Update imports accordingly.
- Security rules are defined in `firestore.rules`. Review and harden for production.
- Replace the API stubs in `src/lib/api.ts` with real HTTPS or Callable Function integrations.

# Twibuke Wisdom Archive 61

An interactive web application built with **React**, **TypeScript**, and **Vite**, styled using **Tailwind CSS** and **shadcn-ui**.  
The project is designed to provide a smooth and modern user experience with fast development and easy customization.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```sh
git clone https://github.com/Angek12/twibuke-wisdom-archive-61.git
cd twibuke-wisdom-archive-61

2. Install Dependencies

Make sure you have Node.js and npm installed. Then run:

npm install

3. Start the Development Server
npm run dev


The app will be available at:

http://localhost:5173/

4. Build for Production
npm run build


The optimized build will be created in the dist/ folder.
To preview the build:

npm run preview
