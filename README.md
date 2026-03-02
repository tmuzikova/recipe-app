# Recipes App

A recipe browsing and submission app built with React, TypeScript, and Sanity CMS. Browse recipes, view details, and submit new recipes via a form that writes to Sanity through a Netlify serverless function.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4
- **Data:** Sanity Client + GROQ (read), Netlify Functions + Sanity API (write)
- **Forms:** React Hook Form + Zod
- **UI utilities:** class-variance-authority, tailwind-merge
- **CMS:** Sanity Studio v3
- **Routing:** React Router 7
- **i18n:** i18next + react-i18next
- **SVG:** SVGR (import SVGs as React components)
- **Auth:** Netlify Identity (přihlášení pro přidávání receptů)
- **Hosting:** Netlify (static site + serverless functions)
- **Code quality:** ESLint + Prettier

## Project Structure

```
├── src/
│   ├── app/              # Entry point, providers, global styles
│   ├── assets/           # Static assets (SVGs, images)
│   ├── components/       # Shared UI (layout, ui)
│   ├── config/           # Env config, constants
│   ├── features/
│   │   └── recipes/      # Recipe feature (api, components, types)
│   ├── i18n/             # Locales (en, cs)
│   ├── lib/              # Sanity client, cn utility
│   ├── pages/            # Route-level pages
│   ├── routes/           # React Router config
│   └── types/            # Shared TypeScript types
├── studio/               # Sanity Studio
│   └── schemaTypes/      # Content schemas (recipe, category)
├── netlify/
│   └── functions/        # Serverless (e.g. create-recipe)
├── netlify.toml          # Netlify build & dev config
└── sanity.types.ts       # Generated from studio schema (via typegen)
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn

### 1. Install dependencies

```bash
yarn install
```

### 2. Set up Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. In `studio/sanity.config.ts` and `studio/sanity.cli.ts`, set your project ID
3. Install and run the studio:

```bash
cd studio
yarn install
yarn dev
```

4. In the Studio, add some recipes and optionally mark a few as “Featured”

### 3. Configure environment

Copy the example env and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` (tyto hodnoty jdou do frontendu – pouze project ID a dataset):

```
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
```

Pro lokální běh formuláře „vytvoř recept“ (Netlify Dev) vytvoř `.env.local` (git-ignorovaný) a přidej tam **write token jen pod neveřejným názvem** – funkce `create-recipe` ho bere jako `SANITY_API_TOKEN`:

```
SANITY_API_TOKEN=your_sanity_write_token
```

Token nikdy nedávej do `.env` ani do proměnných s prefixem `VITE_` – dostal by se do buildu a do prohlížeče.

### 4. Generate Sanity types (optional)

To regenerate TypeScript types from the Studio schema:

```bash
yarn typegen
```

### 5. Run the app

**Vite only (no serverless):**

```bash
yarn dev
```

App: `http://localhost:5173`. Recipe creation will not work without the Netlify function.

**With Netlify (recommended, includes create-recipe):**

```bash
yarn dev:netlify
```

App: `http://localhost:8888` (proxies to Vite and runs Netlify functions).

## Available Scripts

| Script             | Description                           |
| ------------------ | ------------------------------------- |
| `yarn dev`         | Vite dev server (no serverless)       |
| `yarn dev:netlify` | Netlify Dev (Vite + functions)        |
| `yarn build`       | Type-check and production build       |
| `yarn preview`     | Preview production build              |
| `yarn lint`        | Run ESLint                            |
| `yarn format`      | Format with Prettier                  |
| `yarn typegen`     | Generate Sanity schema types to `src` |

## Deployment (Netlify)

### 1. Propojení repozitáře

1. Přihlas se na [app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import an existing project**
3. Připoj GitHub/GitLab a vyber repozitář `recipes-app`
4. Netlify sám nastaví:
   - **Build command:** `yarn build`
   - **Publish directory:** `dist`
   - **Functions:** složka `netlify/functions` (pokud ne, v **Site configuration** → **Functions** zadej `netlify/functions`)

### 2. Nastavení proměnných (včetně tokenu)

1. V Netlify: **Site configuration** → **Environment variables** → **Add a variable**
2. Přidej tyto proměnné:

| Variable                 | Scope | K čemu                                                                  |
| ------------------------ | ----- | ----------------------------------------------------------------------- |
| `VITE_SANITY_PROJECT_ID` | All   | ID projektu ze Sanity (veřejné, jde do frontendu)                       |
| `VITE_SANITY_DATASET`    | All   | Dataset, většinou `production` (veřejné)                                |
| `SANITY_API_TOKEN`       | All   | **Write token** – **pouze pro serverless funkci**, nikdy ne na frontend |

**Proč token NENÍ `VITE_...`:** Proměnné s prefixem `VITE_` se při buildu vloží do klientského JS a byly by vidět v prohlížeči. `SANITY_API_TOKEN` (bez `VITE_`) je v Netlify dostupná jen serverless funkci `create-recipe`, do frontendu se nedostane.

**Jak získat Sanity API token (write):**

1. [sanity.io/manage](https://sanity.io/manage) → vyber projekt
2. **API** → **Tokens**
3. **Add API token** → název např. „Netlify deploy“, oprávnění **Editor**
4. Zkopíruj token a v Netlify ho nastav jako **`SANITY_API_TOKEN`** (ne jako VITE\_…)

### 3. Netlify Identity (přihlášení pro přidávání receptů)

Přidávání receptů je chráněné – pouze přihlášení uživatelé mohou volat funkci `create-recipe`. V Netlify musíš zapnout Identity:

1. V Netlify: **Site configuration** → **Identity** → **Enable Identity**
2. (Volitelně) **Registration preferences**: nastav **Invite only**, aby se nemohl zaregistrovat kdokoliv – pak musíš uživatele zvanět v **Identity** → **Invite users**
3. Pro lokální testování s přihlášením použij `yarn dev:netlify` – Identity funguje proti tvému Netlify site.

Bez zapnutého Identity bude endpoint vracet 401 a formulář na `/recipes/new` vyžaduje přihlášení (tlačítko „Přihlásit se“ otevře Netlify Identity modál).

### 4. Deploy

Po uložení proměnných a zapnutí Identity spusť **Deploy site** (nebo push do repa). Po buildu bude stránka dostupná na URL typu `https://název-site.netlify.app`.
