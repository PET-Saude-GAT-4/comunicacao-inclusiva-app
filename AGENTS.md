# AGENTS.md

SAP (Suporte Assistivo ao Paciente) is an Expo (React Native) app that a health
professional and a patient who does not communicate by speech use together
during a consultation, exchanging pictograms or SignWriting (Libras) symbols.
Its boards, terms, phrases and triage steps come from a separate HTTP API.

Setup, `.env` and the first run live in the [README](README.md) — start there.

## Toolchain

Yarn 4 via Corepack (`packageManager` in `package.json`), never npm. Node comes
from [`.nvmrc`](.nvmrc).

The app is on **Expo SDK 58 and React Native 0.88**, newer than most examples
online. Before using an Expo module or a React Native API, check the version in
`package.json` and the module's docs for that SDK; install new Expo modules with
`yarn expo install <package>` so the version matches the SDK.

Tests are Jest through the `jest-expo` preset, with React Native Testing
Library. Prettier formats every file with the repository's `.prettierrc`.

## Architecture in a few lines

The app is offline-first: screens never call the API. `useSyncEngine` runs
`syncService.syncAll()` once when the tabs mount; services in `app/services/`
fetch through `request()` (`app/utils/apiUtils.ts`), adapters in `app/adapters/`
turn the `Api*` wire types into app models, and the result is written to
AsyncStorage under the keys in `app/constants/cache.ts`. Hooks in `app/hooks/`
read that cache and fall back to `app/mocks/` or to the bundled
`app/content/emergency.ts` when it is empty. Session, display mode and saved
boards are React contexts in `app/contexts/`. The details, and why, are in
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## What an agent gets wrong without being told

**React Native is not a browser.** There is no DOM, no `window`/`document`, no
`localStorage`, no CSS files and no `<div>`: layout is `View` + `StyleSheet`,
persistence is AsyncStorage. Code written for the web compiles and then fails on
the device, or only works under `yarn web`.

**Screens read the cache, not the network.** A screen or hook that calls a
service directly breaks the app offline and duplicates what the sync already
fetched. A new resource gets a service, an adapter, a cache key in
`app/constants/cache.ts`, a step in `syncService` and a hook that reads it.

**Emergency content must work on a device that never synced.** It is bundled in
`app/content/emergency.ts` on purpose; do not replace it with a mock or make it
depend on the API.

**Accessibility is the product.** Every touchable sets `accessibilityRole` and a
pt-BR `accessibilityLabel`, and toggles set `accessibilityState`; meaning never
depends on color alone. Follow the
[rules for new screens](docs/ACCESSIBILITY.md#rules-for-new-screens), and show a
term's image and label through `resolveTermDisplay`, never by picking
`pictogram` or `signWriting` by hand — that is what makes the display-mode
switch apply everywhere.

**`API_BASE_URL` is read from `expo-constants`** (`Constants.expoConfig.extra`),
filled by `app.config.ts` from `.env` when Metro starts. It has no
`EXPO_PUBLIC_` prefix, so `process.env.API_BASE_URL` is `undefined` in app
code, and a changed `.env` needs a Metro restart.

**An imported `.svg` is a component**, through `react-native-svg-transformer`
(`metro.config.js`). In tests every `.svg` maps to `test/svgStub.tsx`.

**A path alias lives in two places.** `@/`, `@assets/` and `@test/` are declared
in `tsconfig.json` and in `jest.config.js`; a new alias added to only one of
them type-checks and then fails in Jest, or the other way round.

**Portuguese is for users, English is for code.** Every UI string and
accessibility label is pt-BR. Identifiers, comments, commit messages and this
documentation are English.

**Tests live in `__tests__/` beside the code they cover**, named after the file
under test, and nothing reaches the network: mock `request()` and let the real
services and adapters run. Fixtures come from `@test/fixtures`.

**Each page under `docs/` answers one "Read it when".** Whoever opens a page, a
person or an agent, is after one answer and has to read the whole page to find
it. When an edit makes a page answer a second question, or brings it to about
400 lines, split it by topic in the same pull request and add the new page to
the table below. Pages the pull request does not touch stay as they are.

**Commits follow Conventional Commits** in the imperative (`feat: show the
pain scale labels`, `fix: keep the session after a restart`). Branches are
`type/short-slug`, cut from `develop`, and pull requests go into `develop`. A
change a user would notice gets a line under `[Unreleased]` in
[CHANGELOG.md](CHANGELOG.md).

## Commands

| Command              | What it does                    |
| -------------------- | ------------------------------- |
| `yarn start`         | Metro and the Expo dev server   |
| `yarn android`       | Same, opening Android           |
| `yarn ios`           | Same, opening the iOS simulator |
| `yarn web`           | Same, for the web build         |
| `yarn lint`          | ESLint (`expo lint`)            |
| `yarn test`          | Jest, once                      |
| `yarn test:watch`    | Jest in watch mode              |
| `yarn test:coverage` | Jest with coverage              |

## Where to look next

| Topic                                                                            | Page                                                                                                    |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Layout, navigation, state, the sync, tests                                       | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)                                                            |
| Display modes, accessibility menu, rules for screens                             | [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md)                                                          |
| Domain terms (board, term, placement, phrase…), once the API's docs reach `main` | [API glossary](https://github.com/PET-Saude-GAT-4/comunicacao-inclusiva-api/blob/main/docs/GLOSSARY.md) |
| What changed in each version                                                     | [CHANGELOG.md](CHANGELOG.md)                                                                            |
