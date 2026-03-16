# Svitlo

**Power Generator Maintenance Tracker — Built for the [TestSprite Hackathon](https://testsprite.com)**

Svitlo is a local-first web application for tracking the usage and maintenance of power generators. It helps individuals and businesses know exactly when a generator needs maintenance, whether it has been running too long, and who last operated it.

### Demo

[![Watch the demo](https://img.youtube.com/vi/KrBQzb6jr68/maxresdefault.jpg)](https://youtu.be/KrBQzb6jr68)

---

## Why Svitlo?

Power generators are critical infrastructure — especially in regions with unreliable electricity. But most people manage them with guesswork: sticky notes, memory, or nothing at all. Svitlo replaces that with a structured system that works even when the internet doesn't.

---

## Features

### Generator Management
- **Start/Stop Session Tracking** — Log every generator run with timestamps and operator identity
- **Automatic State Detection** — Generators are derived as *running*, *resting*, or *available* based on session history
- **Consecutive Run Monitoring** — Configurable run-hour limits with warning thresholds to prevent overuse
- **Enforced Rest Periods** — Generators that hit their run limit enter a mandatory rest state

### Maintenance
- **Maintenance Templates** — Define recurring tasks triggered by run hours, calendar days, or whichever comes first
- **Due Date Computation** — All maintenance status is computed in real-time from the maintenance log
- **AI-Suggested Maintenance Plans** — Powered by Google Gemini, researches manufacturer specs and suggests maintenance schedules based on generator model and type

### Organizations & Teams
- **Multi-Organization Support** — Create and manage multiple organizations; be an admin in some and an employee in others
- **Role-Based Access** — Administrators manage generators and templates; employees operate assigned generators
- **Employee Invitations** — Invite team members by email; invitations persist until accepted or declined
- **Generator Assignments** — Assign specific employees to specific generators for accountability

### Offline-First
- **Works Without Internet** — All reads and writes happen against a local SQLite database on the device
- **Background Sync** — Data synchronizes to the server automatically when connectivity is available
- **No Loading Spinners** — The UI is always instant because it reads from local data
- **Resilient by Design** — Start generators, log maintenance, and view history even in areas with no connectivity

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [TanStack Start](https://tanstack.com/start) + [React 19](https://react.dev) |
| **Routing** | [TanStack Router](https://tanstack.com/router) (file-based, type-safe) |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) + [oRPC](https://orpc.dev) (type-safe RPC) |
| **Local-First Sync** | [PowerSync](https://www.powersync.com) + SQLite (via wa-sqlite) |
| **Database** | [Neon Serverless Postgres](https://neon.tech) + [Drizzle ORM](https://orm.drizzle.team) |
| **Authentication** | [Better Auth](https://www.better-auth.com) (email/password + Google OAuth) |
| **UI Components** | [HeroUI](https://heroui.com) + [Tailwind CSS 4](https://tailwindcss.com) |
| **AI** | [Mastra](https://mastra.ai) + [Google Gemini 2.5 Flash](https://ai.google.dev) |
| **Validation** | [Zod](https://zod.dev) (3-layer: client, mutation, database) |
| **State** | [Zustand](https://zustand.docs.pmnd.rs) |
| **Deployment** | [Vercel](https://vercel.com) |

---

## Local-First Architecture

Svitlo uses a 3-layer validation architecture designed for offline-first correctness:

1. **Client Zod Schemas** — Field-level constraints for immediate UX feedback
2. **Client Mutations** — Authorization checks, foreign key existence, cross-table business rules
3. **PostgreSQL Constraints + Triggers** — Final safety net enforced even if client validation is bypassed

All generator state (running/resting/available), lifetime hours, and maintenance due dates are **computed at query time** — never stored. This keeps the local and server databases consistent without complex sync logic.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js)
- A [Neon](https://neon.tech) PostgreSQL database
- A [PowerSync](https://www.powersync.com) account for local-first sync

### Installation

```bash
bun install
```

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=your_neon_connection_string
POWERSYNC_URL=your_powersync_instance_url
POWERSYNC_PRIVATE_KEY=your_powersync_key
BETTER_AUTH_SECRET=your_auth_secret
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

### Development

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Testing

```bash
bun run test
```

### Linting & Type Checking

```bash
bun run lint
bun run typecheck
```

---

## Test Accounts

The following accounts are available for testing the application. All accounts share the same password: `TestOne1$`

| Email |
|---|
| test-nazar@gmail.com |
| test-maria@gmail.com |
| test-andy@gmail.com |
| test-leo@gmail.com |

---

## License

MIT
