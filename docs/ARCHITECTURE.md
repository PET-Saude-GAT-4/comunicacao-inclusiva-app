# Architecture

Comunicação Inclusiva is an Expo (React Native) app used during a health
consultation: the patient and the professional exchange pictograms or
SignWriting (Libras) symbols instead of relying on speech alone. This document
explains how the app is put together and, above all, why. For the domain terms
(board, term, placement, phrase, triage step…) see the
[API glossary](https://github.com/PET-Saude-GAT-4/comunicacao-inclusiva-api/blob/main/docs/GLOSSARY.md)
(it becomes available once the API's documentation reaches `main`).

## Layout

| Path                       | Holds                                                          |
| -------------------------- | -------------------------------------------------------------- |
| `App.tsx`                  | Provider tree and the navigation container                     |
| `app/navigation/`          | Every navigator; one folder per hot-bar tab under `main-tabs/` |
| `app/screens/main-tabs/`   | Screens, mirroring the navigator folders                       |
| `app/components/`          | Shared components (pain scale, body map, accessibility menu…)  |
| `app/contexts/`            | Session, display preferences and saved boards                  |
| `app/hooks/`               | Read-side hooks over the cache, plus `useSyncEngine`           |
| `app/services/`            | HTTP calls to the public API and the sync                      |
| `app/adapters/`            | Wire format → app model                                        |
| `app/types/`               | App models and their `Api*` wire counterparts                  |
| `app/constants/cache.ts`   | Every AsyncStorage key the sync writes                         |
| `app/content/emergency.ts` | Emergency boards, terms and triage levels bundled with the app |
| `app/mocks/`               | Fallback data for the non-emergency features                   |
| `app/utils/`               | Pure helpers (phrase matching, display resolution, formatting) |
| `test/`                    | Shared test fixtures and stubs                                 |

`@/` resolves to `app/`, `@assets/` to `assets/` and `@test/` to `test/`, both
in TypeScript (`tsconfig.json`) and in Jest (`jest.config.js`).

## Navigation

```
RootStackNav
├── MainTabNav (bottom hot-bar)
│   ├── CommBoardStackNav   "Prancha Livre"
│   │     CommBoardScreen while a consultation is open; otherwise
│   │     NoConsultationScreen → SelectProfession → SelectSpeciality → ConfirmConsultation
│   ├── MyCollectionStackNav "Minha Coleção"  (tabs: Pranchas, Interações) → BoardDetails
│   ├── EmergencyStackNav    "Emergência"     (tabs: Emergência Rápida, Categorias)
│   │     → ModuleVisualization, UrgencyResponse
│   ├── LibraryStackNav      "Biblioteca"     (tabs: Pranchas, Interações, Módulos) → PublicBoardDetails
│   └── SettingsStackNav     "Configurações"  (routable, hidden from the hot-bar)
├── FeedbackScreen
├── ReportScreen
└── TutorialStackNav
```

- `CommBoardStackNav` swaps its screens on `isInConsultation`: outside a
  consultation the free board is unreachable and the setup flow takes its
  place, so nobody can talk through the board without a profession and
  speciality chosen.
- `FeedbackScreen` and `ReportScreen` live on the root stack, not inside a tab,
  because they are reached when a consultation ends and must cover the hot-bar.
- Settings stays registered as a tab with `tabBarItemStyle: { display: "none" }`
  so existing navigation calls keep working while the hot-bar shows four items.
- The hot-bar floats above the system navigation bar. Screens that place
  content at the bottom read `useHotBarInset` to keep clear of it.
- `RootStackNav` has a placeholder `user` flag: there is no sign-in in the app.

## State

`App.tsx` nests the providers in this order:

```
GestureHandlerRootView → SafeAreaProvider → PaperProvider
  → SessionProvider → MyCollectionProvider → PreferencesProvider → NavigationContainer
```

| Context               | Owns                                                                     | Persisted under             |
| --------------------- | ------------------------------------------------------------------------ | --------------------------- |
| `SessionContext`      | Whether a consultation is open, who is speaking, the interactions so far | `@active_session`           |
| `MyCollectionContext` | uuids of the boards the user saved                                       | `@saved_boards`             |
| `PreferencesContext`  | Display mode: `pictogram` or `signWriting`                               | `@preferences_display_mode` |

The session is written back to AsyncStorage after every change and restored on
launch, so closing the app mid-consultation does not lose the conversation.
Ending the consultation removes the key. The cache entry is rebuilt from state
on each write rather than read and patched, which keeps two overlapping updates
from overwriting each other.

## Data flow: online sync, offline reads

The app is offline-first. Screens never call the API; they read AsyncStorage.

```
API ──request()──▶ services ──adapters──▶ syncService ──▶ AsyncStorage ──▶ hooks ──▶ screens
                                                                  └─(empty)─▶ mocks / bundled content
```

1. **Trigger.** `MainTabNav` calls `useSyncEngine`, which runs
   `syncService.syncAll()` once when the tabs mount.
2. **Fetch.** Services (`app/services/`) call `request()` from
   `app/utils/apiUtils.ts` (a `fetch` with a 5 s timeout) against
   `API_BASE_URL`, which `app.config.ts` reads from `.env` into
   `expo-constants`.
3. **Adapt.** Adapters turn wire objects into app models:
   - `boardAdapter.toTerm` uses `termUuid` as the term's `uuid`. On the wire,
     `uuid` addresses the _placement_ of a term inside a board or phrase; the
     app compares terms by vocabulary entry, so a term tapped on a board and the
     same term inside a phrase are equal (see `matchPhraseBySequence`).
   - `resolveFileUrl` keeps the path of every `fileUrl` but swaps protocol and
     host for `API_BASE_URL`. The backend may answer with `localhost`, which a
     phone cannot reach.
   - Fields the app does not use (`authorUuid`, `publishedAt`) are dropped.
4. **Cache.** `syncService` writes each resource under the keys in
   `app/constants/cache.ts`: professions and their specialities, common boards,
   emergency boards, every board's terms and next boards, triage steps, phrases
   and each phrase's next boards. Each resource syncs on its own: a failure
   keeps that resource's previous cache and does not stop the others.
   `syncAll` returns `false` when a top-level list (professions, common boards,
   emergency boards, triage steps, phrases) fails to download. A failure on a
   single board's terms or next boards, a phrase's next boards or a
   profession's specialities is only logged: that entry keeps its previous
   cache and `syncAll` still returns `true`.
5. **Read.** Hooks (`useBoards`, `usePhrases`, `useTriage`, …) read the cache.
   When it is empty they fall back to `app/mocks/` or, for emergency content,
   to `app/content/emergency.ts`, so the app is usable on first launch without
   a connection. Emergency content is bundled rather than mocked because it has
   to work even if the device has never synced.
6. **Offline banner.** When `syncAll` returns `false`, `MainTabNav` shows
   `OfflineBanner` above the hot-bar until it is dismissed.

Empty lists of next boards and triage steps are cached too: "no
recommendation" has to be distinguishable from "never synced". The other
resources are not: an empty list of professions, boards, phrases, a board's
terms or a profession's specialities skips the write and leaves whatever was
cached before.

Image files are not part of the sync; terms and boards cache only their URLs.

## Tests

Jest runs through `jest-expo` with React Native Testing Library.

```bash
yarn test            # run once
yarn test:watch
yarn test:coverage
```

- Tests live in a `__tests__/` folder beside the code they cover, named after
  the file under test: `app/utils/dateFormatter.ts` is tested by
  `app/utils/__tests__/dateFormatter.test.ts`.
- `jest.setup.ts` mocks AsyncStorage with the library's in-memory mock, fixes
  `API_BASE_URL` through `expo-constants`, and silences `console.log`.
- `test/fixtures.ts` builds wire and app objects; `test/svgStub.tsx` stands in
  for imported SVG files. Tests import them through `@test/`.
- Nothing reaches the network: `syncService.test.ts` mocks `request()` by URL
  and lets the real services and adapters run, so the cache holds what the app
  would read back.
