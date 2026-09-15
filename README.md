# Kai: Empathetic AI Wellness Agent

Kai is a full-stack wellness companion that combines empathetic AI chat, mood check-ins, practical activities, support resources, and privacy-aware onboarding in one responsive React experience.

> Kai is a wellness support tool, not a medical professional, therapist, diagnosis service, or emergency response service. In an emergency or if there is a risk of harm, contact local emergency services or a crisis hotline.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Mistral](https://img.shields.io/badge/Mistral-AI-FF6B6B?style=flat)

## What the app includes

- Welcome experience with light/dark theme switching and persistent theme preference
- Consent gate with in-app Privacy Policy and Terms of Use content
- Empathetic KAI chat powered by Mistral, with English and Hinglish support
- Mood sentiment metadata and score updates from chat responses
- Dashboard mood checker with saved notes, latest mood, average score, and history chart
- Wellness activities for journaling, breathing, affirmations, stretching, meditation, and gratitude
- Resource Navigator with direct email, phone, SMS, and external guide actions
- Settings for theme, compact chat preference, local data export/deletion actions, and sign-out UI
- Contact Us form with support contact details
- About page and consistent back navigation across secondary screens
- Express health checks, structured routes/controllers/services, and an AI fallback response when Mistral is unavailable

## Technology

| Area | Technology |
| --- | --- |
| Frontend | React 19, Create React App, inline component styles |
| Charts | Recharts |
| HTTP | Browser Fetch API, REST JSON |
| Backend | Node.js, Express 5, CORS, dotenv |
| AI provider | Mistral AI SDK using `mistral-small-latest` |
| Persistence | Browser `localStorage`; no database is currently required |

## Repository layout

```text
AI-agent-Kai/
├── README.md
├── kai-backend/
│   ├── server.js                 # Express server and static build hosting
│   ├── package.json
│   ├── controllers/
│   │   └── chatController.js     # Request validation and response handling
│   ├── routes/
│   │   └── chatRoutes.js         # Chat and route-level health endpoint
│   └── services/
│       └── mistralService.js     # Mistral integration and fallback replies
└── kai-frontend/
		├── package.json
		├── public/
		└── src/
				├── App.js                # App shell, navigation, theme, consent state
				├── Chat.jsx              # AI conversation UI and sentiment persistence
				├── Dashboard.js          # Mood overview, checker, and chart
				├── ConsentModal.js       # Privacy and terms flow
				├── WellnessActivities.js # Interactive activity toolkit
				├── Resources.js          # Support and crisis resource actions
				├── Settings.js
				├── ContactUs.js
				├── AboutPage.js
				└── moodUtils.js          # Local mood keyword analysis
```

## Requirements

- Node.js 18 or newer
- npm
- A Mistral API key for live AI responses

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/shalini355/AI-agent-Kai.git
cd AI-agent-Kai
```

### 2. Install dependencies

```bash
cd kai-backend
npm install

cd ../kai-frontend
npm install
```

### 3. Configure the backend

Create `kai-backend/.env`:

```env
MISTRAL_API_KEY=your_mistral_api_key_here
PORT=5000
```

Never commit `.env` or expose the Mistral key in frontend code. The backend logs a warning and returns a clear unavailable response when the key is missing.

### 4. Start development servers

Use two terminals:

Terminal 1:

```bash
cd kai-backend
npm start
```

Terminal 2:

```bash
cd kai-frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000). The frontend sends chat requests to `http://localhost:5000/api/chat`.

## Available commands

### Backend

```bash
npm start       # Start the Express server
npm run dev     # Start with Node's watch mode
```

### Frontend

```bash
npm start       # Start the development server
npm run build   # Create a production build
npm test        # Run the Create React App test runner
```

The current frontend build has been verified with `npm run build`.

## API reference

### `GET /api/health`

Returns backend status:

```json
{
	"ok": true,
	"service": "kai-backend"
}
```

### `GET /api/chat/health`

Returns the same health response from the chat router.

### `POST /api/chat`

Request:

```json
{
	"message": "I feel anxious about tomorrow"
}
```

Successful response shape:

```json
{
	"reply": "...",
	"mood": "anxious",
	"sentiment": {
		"mood": "anxious",
		"score": 4
	}
}
```

An empty message returns HTTP `400`. Provider or server failures return a neutral fallback response rather than exposing provider errors to the user.

### `POST /ai-mood`

Legacy-compatible alias for the same chat controller and request/response contract as `POST /api/chat`.

## Client-side data

Kai currently uses browser storage instead of a database:

| Key | Contents |
| --- | --- |
| `kai_theme` | `dark` or `light` theme preference |
| `kai_mood_history` | JSON array of mood scores, timestamps, and check-in notes |

Data is local to the browser profile. Clearing site data removes these values. The app does not currently provide server-side accounts, synchronization, or database-backed storage.

## Production deployment

Build the frontend first:

```bash
cd kai-frontend
npm run build
```

The Express server serves static frontend files when `kai-backend/build/index.html` exists. To deploy the combined app, copy the generated frontend `build` directory into `kai-backend/build`, configure the backend environment, and start the backend:

```bash
cd kai-frontend
npm run build

# Copy kai-frontend/build to kai-backend/build using your platform's file-copy command.

cd ../kai-backend
npm start
```

The combined application is then available from the backend port, normally [http://localhost:5000](http://localhost:5000). API routes remain under `/api/*`; non-API routes fall back to the React `index.html`.

## Privacy and safety notes

- Consent is required before entering the dashboard.
- The Privacy Policy and Terms of Use are displayed inside the consent flow.
- Chat and mood history are intended for personal wellness reflection and are stored locally by the current implementation.
- Do not share passwords, API keys, financial details, or other unnecessary sensitive information in chat.
- KAI must not be relied on for diagnosis, treatment decisions, or crisis response.

## Contributing

1. Create a focused branch from `main`.
2. Keep frontend and backend changes scoped to the relevant package.
3. Run `npm run build` in `kai-frontend` before opening a pull request.
4. Do not commit `.env`, API keys, `node_modules`, or generated build output.

## Maintainer

**Shalini Yadav**: [LinkedIn](https://linkedin.com/in/shaliniyadav-355abc) · [GitHub](https://github.com/shalini355)
