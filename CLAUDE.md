# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Run all tests**: `npm test`
- **Run a specific test**: `npm test -- <test-file-path>`

## Code Architecture

This repository is a Next.js project. Key directories and their purposes include:

- `app`: Contains the core application code, including pages, layouts, and API routes.
  - `(auth)`: Handles authentication-related pages (login, signup).
  - `(root)`: Core application pages and layout.
  - `_contexts`: Global contexts, such as `AuthProvider` for authentication state.
- `components`: Reusable UI components.
  - `home`: Components specific to the home page.
- `lib`: Utility functions and modules.
  - `axios`: (Deprecated/Removed) Likely contained Axios-related configurations.
  - `auth`: Authentication-related utility functions.

## Important Notes

- The project uses Next.js for routing and rendering.
- Authentication is managed via `AuthProvider` in `app/_contexts/AuthProvider.tsx`.
- Some files like `lib/axios.ts` have been deleted, indicating a potential shift in how HTTP requests are handled.
- New API routes might be located in `app/api/` and authentication utilities in `lib/auth/`.
