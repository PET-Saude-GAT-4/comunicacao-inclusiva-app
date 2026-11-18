# CI

Read it when a check failed on your pull request, or before changing what CI
runs.

[`ci.yml`](ci.yml) runs on every pull request into `main` or `develop`, and
again on every push to `main` or `develop`, which includes each merge. A pull
request run checks the branch merged with its base as it was then, and pull
requests do not have to be up to date before merging, so two that pass on
their own can still break `develop` together; the push run checks the merged
commit itself.

A new push to the same pull request cancels the run still in flight. Push runs
are never cancelled: each merge into `main` or `develop` keeps its own complete
result, shown as the check mark on the commit. The workflow only reads the
repository (`contents: read`).

## Jobs

Each check is its own job, so a red check names what broke:

| Job      | Command                               | Catches                                         |
| -------- | ------------------------------------- | ----------------------------------------------- |
| `lint`   | `yarn lint`                           | ESLint errors (`expo lint`)                     |
| `format` | `yarn format:check`                   | A file Prettier would change                    |
| `types`  | `yarn typecheck`                      | Type errors in `app/`, `test/` and `App.tsx`    |
| `test`   | `yarn test`                           | A failing Jest test                             |
| `bundle` | `yarn expo export --platform android` | An import Metro cannot resolve, a broken bundle |

Every job starts with [`.github/actions/setup`](../actions/setup/action.yml):
Node from [`.nvmrc`](../../.nvmrc), the Yarn 4 release committed under
`.yarn/releases` (which `yarnPath` in `.yarnrc.yml` points to, so no Corepack
download is needed), and `yarn install --immutable`, which fails when `yarn.lock` is out of
date instead of rewriting it.

The five jobs are **required status checks** on `main` and `develop`: a pull
request cannot be merged until all of them pass. The protection matches them by
job name, so renaming a job means updating the branch protection in the same
change.

## Pinned actions

Every external action is referenced by a full 40-character commit SHA, with
its version in a trailing comment:

```yaml
- uses: actions/checkout@<40-character commit SHA> # vX.Y.Z
```

A tag such as `@v4` can be moved to another commit by whoever controls the
action's repository, which would change the code every required check runs
without any change here. A SHA cannot move. The local
`./.github/actions/setup` is part of this repository and needs no pin.

[Dependabot](../dependabot.yml) keeps the pins current: each week it opens a
`ci:` pull request into `develop` that updates the SHA and the comment, and
that pull request goes through the same checks as any other. It reads the
workflows and the composite action in `.github/actions/setup`.

The repository setting _Require actions to be pinned to a full-length commit
SHA_ (Settings → Actions → General) is on, so a workflow that adds an action
by tag fails instead of running. To add an action, look up the commit of its
latest release (`gh api repos/<owner>/<action>/commits/<tag> --jq .sha`) and
pin that.

## Two details that look like mistakes

- **`bundle` sets `API_BASE_URL` to `http://localhost:8080`.** `app.config.ts`
  only copies the value into the app's config, so any URL bundles. The output
  is not deployable and is not kept; native builds (EAS) are not part of CI.
- **The workflow sets `EXPO_OFFLINE=1`.** The Expo CLI otherwise contacts
  `api.expo.dev` on each command; none of the checks needs it, and offline mode
  keeps an Expo outage from turning CI red.

## Reproducing a failure locally

Each job is one command:

```bash
yarn lint
yarn format:check     # yarn format fixes it
yarn typecheck
yarn test
API_BASE_URL=http://localhost:8080 yarn expo export --platform android
```

Lint warnings do not fail the `lint` job.
