# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. Users describe components in chat, Claude generates the code, and a live preview renders the result in real-time using a virtual file system (no files written to disk).

## Development Commands

```bash
npm run setup          # Install dependencies, generate Prisma client, run migrations
npm run dev            # Start dev server with Turbopack (http://localhost:3000)
npm run build          # Production build
npm run lint           # Run ESLint
npm run test           # Run Vitest tests
npm run db:reset       # Reset database (force)
```

### Running a Single Test

```bash
npx vitest run path/to/test.test.ts
npx vitest run --testNamePattern "test name"
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router) with React 19 and TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Database**: SQLite via Prisma ORM
- **AI**: Anthropic Claude via Vercel AI SDK (@ai-sdk/anthropic)
- **Editor**: Monaco Editor for code editing

### Core Architecture

**Virtual File System** (`/src/lib/file-system.ts`): In-memory file system that maintains component files without disk I/O. All generated components exist only in memory and are rendered via iframe preview.

**LLM Integration** (`/src/lib/provider.ts`): Provider factory that creates Claude AI client. Falls back to a mock provider returning static responses when `ANTHROPIC_API_KEY` is not set.

**AI Tools** (`/src/lib/tools/`):
- `str-replace.ts`: Tool for Claude to make targeted string replacements in files
- `file-manager.ts`: Tool for file rename/delete operations

**Chat API** (`/src/app/api/chat/route.ts`): Streaming endpoint that handles AI conversations with tool use for code generation.

### Directory Structure

```
/src
  /app                  # Next.js App Router pages and API routes
    /api/chat           # Chat streaming endpoint
    /[projectId]        # Dynamic project route
  /components
    /ui                 # shadcn/ui components
    /chat               # Chat interface (MessageList, MessageInput)
    /editor             # Code editor (CodeEditor, FileTree)
    /preview            # Live preview (PreviewFrame)
    /auth               # Authentication forms
  /lib
    /contexts           # React Context (ChatContext, FileSystemContext)
    /tools              # AI tools for Claude
    /prompts            # System prompts for component generation
    /transform          # JSX compilation for browser execution
  /actions              # Server actions (auth, project CRUD)
```

### Database Models

**User**: Email/password authentication with bcrypt hashing
**Project**: Stores chat messages and virtual file system state as JSON strings

### Key Patterns

- Server Components for data fetching, Client Components for interactivity
- JWT-based authentication via middleware (`/src/middleware.ts`)
- Project state persists messages and file system as JSON in the `Project.data` field
- Component preview compiles JSX client-side using @babel/standalone

## Code Style

- Use comments sparsely
