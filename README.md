# `TTS Project`

Final Prokect to NCI!

## Tech Stack

- Nuxt 3
- Clerk
- Pinata
- Turso
- ElevenLabs
- Tailwind
- PrimeVue

## .env

```
TURSO_DB_URL=<turso-db-url>
TURSO_DB_TOKEN=<turso-db-token>

PINATA_JWT=<pinata-jwt>
PINATA_GATEWAY_URL=<pinata-gateway-url>

ELEVENLABS_API_KEY=<elevenlabs-api-key>

NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk-publishable-key>
NUXT_CLERK_SECRET_KEY=<clerk-secret-key>

CLERK_SIGN_IN_FORCE_REDIRECT_URL=http://localhost:3000/generations
CLERK_SIGN_UP_FORCE_REDIRECT_URL=http://localhost:3000/generations
```

## To run locally

Para rodar o projeto localmente, execute os seguintes comandos:

```bash
pnpm install
pnpm dev
```