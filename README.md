# Prompt Optimizer

Prompt Optimizer is a Web application for creating, optimizing, testing, and evaluating AI prompts. It runs entirely in the browser and stores application data in IndexedDB.

[Online app](https://prompt.always200.com) | [Documentation](https://docs.always200.com) | [Prompt Garden](https://garden.always200.com)

## Run locally

Requirements:

- Node.js 24
- Corepack

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

The development server serves the Web app from `packages/web`.

## Build and test

```bash
corepack pnpm build
corepack pnpm lint
corepack pnpm test:gate
```

## Deploy

The project builds a static Web application.

```bash
docker build -t prompt-optimizer .
docker run --rm -p 8080:80 prompt-optimizer
```

Vercel deployments use `packages/web/dist` as the output directory.

## Browser connectivity

Model requests originate in the browser. Providers must allow the deployed origin through CORS, or be placed behind a compatible proxy. API keys configured in the UI are stored locally in the browser and are never sent to this repository.

## Release notes

Release notes are Web-only and live under `releases/`.

```bash
corepack pnpm release:notes:new 2.12.0
corepack pnpm release:notes:check 2.12.0
corepack pnpm release:notes:render-body 2.12.0 linshenkx/prompt-optimizer
```

## License

AGPL-3.0-only. See [LICENSE](LICENSE).
