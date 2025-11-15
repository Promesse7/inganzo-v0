# INGANZO - Learn Rwanda's History

A full-stack web application for learning Rwandan history through interactive lessons, quizzes, and community contributions. Built with React + TypeScript + Vite frontend and Firebase backend.

## Features

- 📚 **Lessons**: Browse lessons by era (Precolonial, Colonial, Independence, 1994, Post-1994)
- 🎯 **Quizzes**: Interactive quizzes with scoring, streaks, and speed bonuses
- 👤 **Profile**: Track your progress, points, badges, and achievements
- 📤 **Upload**: Submit testimonies, stories, and cultural content
- 🏆 **Leaderboards**: Compete with other learners
- 📱 **Offline-first**: Take quizzes offline and sync when reconnected

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, React Router
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Functions)
- **UI Components**: shadcn/ui (Radix UI primitives)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account and project

### Local Development

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Firebase:**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password, Google Sign-In)
   - Create Firestore database
   - Create Storage bucket
   - Enable Cloud Functions

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_USE_FIREBASE_EMULATOR=false
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:8080`

### Firebase Functions Setup

1. **Navigate to functions directory:**
   ```bash
   cd functions
   npm install
   ```

2. **Build functions:**
   ```bash
   npm run build
   ```

3. **Deploy functions (after Firebase CLI setup):**
   ```bash
   firebase login
   firebase use <your-project-id>
   npm run deploy
   ```

4. **Or run locally with emulator:**
   ```bash
   npm run serve
   ```

## Project Structure

```
/
├── src/
│   ├── app/              # Next.js-style app router (unused, kept for reference)
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── lesson/      # Lesson-related components
│   │   ├── quiz/        # Quiz components
│   │   └── upload/       # Upload components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities, API clients, Firebase config
│   ├── pages/           # Page components (React Router)
│   └── styles/          # Global styles
├── functions/           # Firebase Cloud Functions
│   └── src/
│       ├── api.ts       # Callable functions (API endpoints)
│       ├── ingestion.ts # Upload processing
│       ├── moderation.ts # Content moderation
│       └── gamification.ts # Quiz scoring & badges
├── public/              # Static assets
│   └── assets/          # Images, logos, etc.
└── firebase.json        # Firebase configuration
```

## API Endpoints (Firebase Callable Functions)

All API endpoints are implemented as Firebase Callable Functions:

- `validateSession` - Validate Firebase auth token
- `listLessons` - Get paginated list of lessons
- `getLesson` - Get lesson details
- `getLessonQuiz` - Get quiz for a lesson
- `submitQuizAttempt` - Submit quiz answers and get score
- `initUpload` - Get signed URL for file upload
- `submitUploadMetadata` - Submit upload metadata
- `getModerationQueue` - Get pending uploads (moderators only)
- `reviewUpload` - Approve/reject uploads (moderators only)
- `getUserProfile` - Get user profile and stats
- `getLeaderboard` - Get leaderboard rankings

## Scoring System

- **Base points**: 10 points per correct answer
- **Speed bonus**: 
  - < 10 seconds: +5 points
  - < 30 seconds: +2 points
- **Streak multiplier**: 1 + 0.1 × (streak - 1), capped at 2.0
- Points are rounded per question and summed for final score

## Firestore Collections

- `users/{userId}` - User profiles, points, badges
- `lessons/{lessonId}` - Lesson content and metadata
- `quizzes/{quizId}` - Quiz questions and answers
- `gameSessions/{sessionId}` - Quiz attempt records
- `uploads/{uploadId}` - User-submitted content
- `leaderboards/{category}` - Leaderboard data

## Deployment

### Frontend (Vercel/Netlify)

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider

3. Set environment variables in your hosting platform

### Firebase Functions

```bash
cd functions
npm run deploy
```

### Firebase Hosting (Alternative)

```bash
firebase deploy --only hosting
```

## Development Notes

- The app uses Vite, not Next.js (despite some Next.js-style folder structure)
- API routes in `src/app/api/` are placeholders - use Firebase Functions instead
- Mock data is available in `src/lib/mockData.ts` for development
- Offline queue is implemented in `src/hooks/useOfflineQueue.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
