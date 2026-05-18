# HabitOS - Production-Grade MERN Monorepo

HabitOS is a full-stack habit tracking application built with a modern tech stack and scalable architecture.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS, Zustand, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Joi, Helmet, Morgan
- **Infrastructure**: Monorepo with npm workspaces

## Architecture

### Server (`/server`)
- `controllers/`: Request handling logic
- `routes/`: API endpoint definitions
- `middleware/`: Auth, error, and validation middleware
- `models/`: Mongoose schemas
- `services/`: Business logic layer
- `validators/`: Joi validation schemas
- `utils/`: Helper functions

### Client (`/client`)
- `app/`: Next.js App Router (pages and layouts)
- `components/`: Reusable UI components
- `hooks/`: Custom React hooks
- `services/`: API client and services
- `store/`: Zustand state management
- `utils/`: Utility functions

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB (local or Atlas)

### Setup

1. **Install dependencies** (from root):
   ```bash
   npm run install:all
   ```

2. **Configure environment variables**:
   - Copy `server/.env.example` to `server/.env` and update values.
   - Copy `client/.env.example` to `client/.env` and update values.

3. **Run in development**:
   ```bash
   npm run dev
   ```
   - Client: http://localhost:3000
   - Server: http://localhost:5000

## API Endpoints

- `GET /health`: Server health check

## License
MIT
