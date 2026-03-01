# Recipes App

A recipe browsing application built with React, TypeScript, and Sanity CMS.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Data Fetching:** Apollo Client (GraphQL) + GraphQL Codegen
- **CMS:** Sanity Studio v3
- **Routing:** React Router
- **SVG:** SVGR (import SVGs as React components)
- **Code Quality:** ESLint + Prettier

## Project Structure

```
├── src/
│   ├── app/            # Entry point, providers, global styles
│   ├── assets/         # Static assets (SVGs, images)
│   ├── components/     # Shared UI components
│   │   ├── layout/     # Header, Footer, PageLayout
│   │   └── ui/         # Button, Spinner, etc.
│   ├── config/         # Environment config, constants
│   ├── features/       # Feature modules
│   │   └── recipes/    # Recipe feature (queries, hooks, components)
│   ├── generated/      # Auto-generated GraphQL types (git-ignored)
│   ├── lib/            # Library configs (Apollo Client)
│   ├── pages/          # Route-level page components
│   ├── routes/         # React Router config
│   └── types/          # Shared TypeScript types
├── studio/             # Sanity Studio
│   └── schemaTypes/    # Content schemas (recipe, category)
└── codegen.ts          # GraphQL Codegen config
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn

### 1. Set up Sanity

1. Create a Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
2. Update `studio/sanity.config.ts` and `studio/sanity.cli.ts` with your project ID
3. Install studio dependencies and start it:

```bash
cd studio
yarn install
yarn dev
```

4. Add some recipes in the Studio, marking a few as "Featured"

### 2. Deploy the GraphQL API

From the studio directory:

```bash
yarn deploy-graphql
```

### 3. Configure the frontend

Copy the example env file and fill in your Sanity project details:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_SANITY_PROJECT_ID=your_actual_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_GRAPHQL_TAG=default
```

### 4. Generate GraphQL types

```bash
yarn codegen
```

Or run in watch mode during development:

```bash
yarn codegen:watch
```

### 5. Start the dev server

```bash
yarn dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Script               | Description                            |
| -------------------- | -------------------------------------- |
| `yarn dev`           | Start Vite dev server                  |
| `yarn build`         | Type-check and build for production    |
| `yarn preview`       | Preview production build locally       |
| `yarn lint`          | Run ESLint                             |
| `yarn format`        | Format code with Prettier              |
| `yarn codegen`       | Generate TypeScript types from GraphQL |
| `yarn codegen:watch` | Watch mode for GraphQL type generation |
