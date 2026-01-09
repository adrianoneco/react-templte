# NexusApp

## Overview

NexusApp is a full-stack web application built with React, Express, and PostgreSQL. It provides a dashboard-style interface with user authentication, team management, and real-time communication via Socket.io. The application follows a monorepo structure with shared types and schemas between frontend and backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theming (teal/cyan color scheme), dark mode support via next-themes
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for page transitions and UI effects
- **Real-time**: Socket.io client for WebSocket communication

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints with typed route definitions in `shared/routes.ts`
- **Authentication**: Passport.js with local strategy, session-based auth using express-session
- **Password Hashing**: Argon2 for secure password storage
- **Real-time**: Socket.io server for WebSocket connections

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Session Store**: connect-pg-simple for storing sessions in PostgreSQL
- **Schema Location**: `shared/schema.ts` contains all database table definitions

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components (shadcn/ui)
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Utilities and query client
│       └── pages/        # Page components
├── server/           # Express backend
│   ├── auth.ts       # Authentication setup
│   ├── db.ts         # Database connection
│   ├── routes.ts     # API routes and Socket.io
│   └── storage.ts    # Data access layer
├── shared/           # Shared types and schemas
│   ├── schema.ts     # Drizzle database schemas
│   └── routes.ts     # API route type definitions
└── migrations/       # Database migrations
```

### Build System
- **Development**: Vite for frontend HMR, tsx for server
- **Production**: Custom build script using esbuild for server bundling, Vite for client
- **Database**: `drizzle-kit push` for schema migrations

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable

### Third-Party Services
- Socket.io for real-time bidirectional communication
- Google Fonts for typography (Outfit, Plus Jakarta Sans)

### Key NPM Packages
- **UI**: @radix-ui/* primitives, lucide-react icons, class-variance-authority
- **Forms**: react-hook-form, @hookform/resolvers, zod
- **Data**: @tanstack/react-query, drizzle-orm
- **Auth**: passport, passport-local, argon2, express-session
- **Phone Input**: react-imask, country-flag-icons