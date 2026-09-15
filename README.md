# Kai: Empathetic AI Wellness Agent

Kai is a full-stack wellness companion that combines empathetic AI chat, mood check-ins, practical activities, support resources, and privacy-aware onboarding in one responsive React experience.

> Kai is a wellness support tool, not a medical professional, therapist, diagnosis service, or emergency response service. In an emergency or if there is a risk of harm, contact local emergency services or a crisis hotline.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Mistral](https://img.shields.io/badge/Mistral-AI-FF6B6B?style=flat)

## Product capabilities

- Welcome experience with persistent light/dark theme switching
- Consent gate with in-app Privacy Policy and Terms of Use content
- JWT account registration and login for production deployments
- Empathetic KAI chat powered by Mistral, with English and Hinglish support
- Mood sentiment metadata, scores, notes, history charts, and server persistence
- Wellness activities for journaling, breathing, affirmations, stretching, meditation, and gratitude
- Resource Navigator with direct email, phone, SMS, and external guide actions
- Settings for theme, local export, server-side mood deletion, and sign-out
- Validated support request submission backed by PostgreSQL
- Error boundary, API retries, loading/error feedback, health checks, structured logs, rate limiting, security headers, and strict CORS
- Docker Compose local stack and GitHub Actions CI validation

## Technology

| Area | Technology |
| --- | --- |
| Frontend | React 19, Create React App, inline component styles |
| Charts | Recharts |
| HTTP | Fetch API, REST JSON, bounded retry client |
| Backend | Node.js, Express 5, Helmet, CORS, Pino |
| AI provider | Mistral AI SDK using `mistral-small-latest` |
| Auth | JWT access tokens and bcrypt password hashing |
| Database | PostgreSQL via `pg` |
| Validation | Zod request and environment schemas |

## Repository layout

```text
AI-agent-Kai/
├── README.md
├── Dockerfile
├── docker-compose.yml
├── .github/workflows/ci.yml
├── kai-backend/
│   ├── server.js
│   ├── .env.example
│   ├── config/env.js
│   ├── db/schema.sql
│   ├── db/pool.js
│   ├── middleware/
│   ├── validators/
│   ├── controllers/
│   ├── routes/
│   └── services/
└── kai-frontend/
    ├── .env.example
    ├── public/
    └── src/
        ├── App.js
        ├── AuthScreen.jsx
        ├── ErrorBoundary.jsx
        ├── Chat.jsx
        ├── Dashboard.js
        ├── ConsentModal.js
        ├── WellnessActivities.js
        ├── Resources.js
        ├── Settings.js
        ├── ContactUs.js
        ├── services/api.js
        └── moodUtils.js
```

## Requirements

- Node.js 18 or newer
- npm
- PostgreSQL 14+ or Docker Desktop
- A Mistral API key for live AI responses
- A random JWT secret of at least 32 characters

## Local setup

### Install dependencies

```bash
git clone https://github.com/shalini355/AI-agent-Kai.git
cd AI-agent-Kai

cd kai-backend
npm install

cd ../kai-frontend
npm install
```

### Configure the backend

Create `kai-backend/.env`:

```env
NODE_ENV=development
PORT=5000
MISTRAL_API_KEY=your_backend_only_mistral_key
DATABASE_URL=postgresql://kai:kai_password@localhost:5432/kai
JWT_SECRET=replace_with_at_least_32_random_characters
CORS_ORIGIN=http://localhost:3000
API_RATE_LIMIT=60
AI_TIMEOUT_MS=20000
```

The complete template is in `kai-backend/.env.example`. Never commit `.env` or expose Mistral credentials in frontend variables. Rotate any credential that has ever been committed or placed in a frontend environment file.

### Configure the frontend

Create `kai-frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AUTH_REQUIRED=false
```

Set `REACT_APP_AUTH_REQUIRED=true` for production builds.

### Start the development servers

Use two terminals:

```bash
cd kai-backend
npm start
```

```bash
cd kai-frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000). The backend health endpoint is [http://localhost:5000/api/health](http://localhost:5000/api/health).

### Start the complete local stack with Docker

```bash
MISTRAL_API_KEY=your_key JWT_SECRET=your_32_character_secret docker compose up --build
```

This starts PostgreSQL, applies `kai-backend/db/schema.sql`, builds the React app, and serves the combined application at [http://localhost:5000](http://localhost:5000).

## Commands

### Backend

```bash
npm start       # Start Express
npm run dev     # Start with Node watch mode
npm run check   # Syntax-check backend modules
npm test        # Run backend validation contract tests
```

### Frontend

```bash
npm start       # Start the development server
npm run build   # Create a production build
npm run check   # Run the production build as a validation check
npm test        # Run the Create React App test runner
```

## API reference

All protected requests use `Authorization: Bearer <token>`.

### Health

- `GET /api/health`: liveness status
- `GET /api/readiness`: Mistral and database readiness status
- `GET /api/chat/health`: chat router health status

### Authentication

`POST /api/auth/register` and `POST /api/auth/login` accept:

```json
{
  "email": "person@example.com",
  "password": "a-password-at-least-12-characters"
}
```

Both return a short-lived JWT and safe user profile. `GET /api/auth/me` returns the current authenticated profile.

### Chat

`POST /api/chat` accepts:

```json
{
  "message": "I feel anxious about tomorrow"
}
```

Response:

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

In production, chat requires authentication. Messages are limited to 4000 characters, requests are rate-limited, and provider calls have a timeout. Provider failures degrade to a safe response without exposing internal errors.

### Mood data

- `GET /api/moods`: latest 100 entries for the authenticated user
- `POST /api/moods`: create a `{ mood, score, note, source }` entry
- `DELETE /api/moods`: delete the authenticated user's mood history

`score` must be an integer from 1 to 10. `source` is `check-in` or `chat`.

### Support

`POST /api/support` accepts validated `name`, `email`, and `message` fields and stores a support request in PostgreSQL. It can be submitted anonymously or with an authenticated token.

## Data and privacy

PostgreSQL stores users, mood entries, conversations/messages, and support requests. The browser keeps a small local recovery/cache layer:

| Key | Contents |
| --- | --- |
| `kai_theme` | `dark` or `light` preference |
| `kai_mood_history` | Local recovery copy of mood entries |
| `kai_access_token` | Session-scoped JWT when auth is enabled |

Use the Settings deletion action to remove server-side mood history. A production deployment still needs managed secrets, encrypted database connections, backups, retention controls, audit logging, and a privacy/legal review.

## Production deployment

The root `Dockerfile` builds the frontend and serves it from the backend image. `docker-compose.yml` provides a local PostgreSQL-backed deployment:

```bash
MISTRAL_API_KEY=your_key JWT_SECRET=your_32_character_secret docker compose up --build -d
```

For a managed platform, provide `DATABASE_URL`, `MISTRAL_API_KEY`, `JWT_SECRET`, `CORS_ORIGIN`, and the rate/timeout settings through the platform secret manager. Do not put backend secrets in `REACT_APP_*` variables.

The backend serves the React build when `kai-backend/build/index.html` exists. API routes remain under `/api/*`; non-API routes fall back to React `index.html`.

## Security and safety

- Environment variables are validated at startup.
- CORS is allowlisted instead of open to every origin.
- Helmet, JSON body limits, rate limiting, and Zod validation protect the API boundary.
- Passwords are bcrypt-hashed and JWTs are short-lived.
- Do not share passwords, API keys, financial details, or unnecessary sensitive information in chat.
- KAI must not be relied on for diagnosis, treatment decisions, or crisis response.

## CI and contribution

GitHub Actions in `.github/workflows/ci.yml` installs both packages, syntax-checks the backend, and builds the frontend on pushes and pull requests to `main`.

1. Create a focused branch from `main`.
2. Keep changes scoped to the relevant package and update the API/README when contracts change.
3. Run `npm run check` in both packages before opening a pull request.
4. Do not commit `.env`, API keys, `node_modules`, or generated build output.

## Maintainer

**Shalini Yadav**: [LinkedIn](https://linkedin.com/in/shaliniyadav-355abc) · [GitHub](https://github.com/shalini355)
