# SAP — Suporte Assistivo ao Paciente (app)

SAP is the mobile app used during a health consultation by a professional and a
patient who does not communicate by speech, deaf Libras users in particular.
The professional and the patient talk through boards of terms and ready-made
phrases shown as pictograms or SignWriting, record pain on a scale and a body
map, and reach emergency content that works offline. It is an Expo (React
Native) app; its content comes from the
[SAP API](https://github.com/PET-Saude-GAT-4/comunicacao-inclusiva-api).

## Requirements

- **Node 22**, the version in [`.nvmrc`](.nvmrc) (`nvm use` picks it up).
- **Yarn 4**, through Corepack: run `corepack enable` once. Never use npm; the
  version is pinned by `packageManager` in `package.json`.
- **Expo Go** on an Android or iOS phone, or an Android emulator / iOS
  simulator.
- **A running API**, the
  [SAP API](https://github.com/PET-Saude-GAT-4/comunicacao-inclusiva-api),
  which needs Docker to run locally (see below).

## Running the API locally

The API repository is the reference for its own setup. In short, from a clone
of it, with Docker running:

```bash
cp .env.example .env
yarn install
yarn docker:dev            # Postgres, Mailpit and the API on port 8080
yarn prisma:migrate:dev    # create the schema
yarn prisma:seed           # load the boards, terms and phrases
```

`curl http://localhost:8080/public/boards` should then answer with a list of
boards. These commands belong to the API's `package.json`, not the app's.

## Getting started

```bash
git clone https://github.com/PET-Saude-GAT-4/comunicacao-inclusiva-app.git
cd comunicacao-inclusiva-app
corepack enable
yarn install
cp .env.example .env
```

Set `API_BASE_URL` in `.env` to the API's address as seen **from the device**,
with no trailing slash and no path:

| Where the app runs              | `API_BASE_URL`                         |
| ------------------------------- | -------------------------------------- |
| Android emulator                | `http://10.0.2.2:8080`                 |
| iOS simulator                   | `http://localhost:8080`                |
| Phone with Expo Go (same Wi-Fi) | `http://<your computer's LAN IP>:8080` |

On a phone, `localhost` is the phone itself, so it never reaches the API. The
app also rewrites the host of every image URL the API returns to
`API_BASE_URL`, so a wrong value shows up as missing images too.

Then start Metro:

```bash
yarn start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `a`
for the Android emulator or `i` for the iOS simulator.

`app.config.ts` reads `.env` when Metro starts: after changing it, stop
`yarn start` and run it again. The app syncs with the API once when its tabs
open. If the API cannot be reached, an offline banner appears and the app
keeps working from what it cached before, from bundled emergency content and
from built-in sample data.

## Commands

| Command              | What it does                                               |
| -------------------- | ---------------------------------------------------------- |
| `yarn start`         | Start Metro and the Expo dev server                        |
| `yarn android`       | Start Metro and open the app on an Android device/emulator |
| `yarn ios`           | Start Metro and open the app on the iOS simulator          |
| `yarn web`           | Start Metro for the web build                              |
| `yarn lint`          | ESLint over the repository (`expo lint`)                   |
| `yarn test`          | Run the Jest suite once                                    |
| `yarn test:watch`    | Run Jest in watch mode                                     |
| `yarn test:coverage` | Run Jest with a coverage report                            |

## Layout

| Path              | Holds                                            |
| ----------------- | ------------------------------------------------ |
| `App.tsx`         | Provider tree and the navigation container       |
| `app/navigation/` | Navigators, one folder per hot-bar tab           |
| `app/screens/`    | Screens, mirroring the navigator folders         |
| `app/components/` | Shared components                                |
| `app/contexts/`   | Session, display preferences and saved boards    |
| `app/hooks/`      | Hooks that read the cache, plus the sync trigger |
| `app/services/`   | API calls and the sync                           |
| `app/adapters/`   | Wire format → app model                          |
| `app/content/`    | Emergency content bundled with the app           |
| `test/`           | Shared test fixtures and stubs                   |

The full table, with the remaining folders, is in
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#layout).

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): navigation, state, the offline
  sync and the tests.
- [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md): display modes, the
  accessibility menu, and the rules every new screen follows.
- [CHANGELOG.md](CHANGELOG.md): what changed in each version.
- [AGENTS.md](AGENTS.md): conventions, and what is easy to get wrong here.
- The domain terms (board, term, placement, phrase, triage step…) are defined
  in the
  [API glossary](https://github.com/PET-Saude-GAT-4/comunicacao-inclusiva-api/blob/main/docs/GLOSSARY.md)
  (it becomes available once the API's documentation reaches `main`).

## Contributing

- Branch from `develop`, named `type/short-slug` (`feat/pain-scale-labels`,
  `fix/offline-banner`).
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
  in the imperative: `feat: …`, `fix: …`, `docs: …`.
- Open the pull request into `develop`. Changes a user would notice go under
  `[Unreleased]` in the [CHANGELOG](CHANGELOG.md).
