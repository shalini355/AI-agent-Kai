# Kai — Empathetic AI Wellness Agent

> A polished full-stack wellness companion that blends empathetic AI chat, multilingual support, and mood tracking in a modern glassmorphism UI.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Mistral](https://img.shields.io/badge/Mistral-AI-FF6B6B?style=flat)

## Overview

Kai is a full-stack AI wellness assistant designed to feel supportive, culturally aware, and natural in daily conversation. It responds in both English and Hinglish, tracks mood sentiment over time, and presents a clean, responsive dashboard for users to review their emotional patterns.

## Features

- Real-time AI chat with an empathetic wellness-focused system prompt
- English + Hinglish conversational support
- Mood tracking with sentiment metadata and local history
- Modern glassmorphism dark UI for the frontend
- Recharts-powered mood history insights
- Clean backend architecture with route, controller, and service separation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, CSS3, Recharts |
| Backend | Node.js, Express |
| AI | Mistral AI SDK |
| API | REST |

## Project Structure

```text
AI-agent-Kai/
├── README.md
├── kai-backend/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── controllers/
│   ├── routes/
│   └── services/
├── kai-frontend/
│   ├── package.json
│   ├── public/
│   └── src/
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A valid Mistral API key

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

### 3. Configure environment variables

Create a `.env` file inside `kai-backend/` with:

```env
MISTRAL_API_KEY=your_mistral_api_key_here
PORT=5000
```

### 4. Run the app locally

Start the backend:

```bash
cd kai-backend
npm start
```

Start the frontend in a second terminal:

```bash
cd kai-frontend
npm start
```

### Local preview

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health
- Chat endpoint: http://localhost:5000/api/chat

## Notes

- The backend serves the built frontend when a production build exists.
- Mood history is saved locally in the browser for quick insights.
- The app is configured to use `MISTRAL_API_KEY` for its AI provider.

## Why Kai?

Kai aims to make emotional support more accessible, human-centered, and culturally aware by combining conversational AI with practical wellness tools.

## Connect

**Shalini Yadav** — [LinkedIn](https://linkedin.com/in/shaliniyadav-355abc) · [GitHub](https://github.com/shalini355)
