# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- **Urgency response in Libras mode.** After tapping a symptom in an
  emergency module, "Sintoma Apontado" shows its SignWriting image when the
  app is in Libras mode, as the module grid does, instead of the pictogram.
- **Removed content leaves the app.** When the server no longer publishes any
  phrases, professions, boards, terms of a board or specialities, the next sync
  empties them in the app too, instead of keeping the old ones or showing
  sample content.

## [0.1.0] - 2026-11-11

First tagged version of the app.

### Added

- **Consultation and free board.** Start a consultation by choosing a
  profession and speciality (with a history of recent professions), then talk
  through the free board, switching the speaker between patient and
  professional. Composed terms are confirmed on a feedback screen
  ("entendi / tenho dúvida"), and closing the consultation shows a report of
  every interaction, which can be copied to the clipboard. A consultation in
  progress survives an app restart.
- **Free text mode** for typing a message instead of tapping terms.
- **Pain scale and body map.** Record pain intensity on a face scale with
  haptic feedback, and mark painful regions on the front and back body views;
  both are logged as interactions. The body map is available to the patient
  only.
- **Next boards.** The boards suggested after a board or a phrase come to the
  front of the carousel, and the composed sequence can open the board it leads
  to.
- **Ready-made phrases.** A phrase library, sending a phrase into the
  consultation, and matching the terms being composed against known phrases.
- **Emergency.** Quick Emergency by urgency level, read from the API's triage
  steps, and categorized emergency modules that show the tapped symptom.
  Emergency boards, terms and levels are bundled so they work without a sync.
- **Library and My Collection.** Browse public boards with their term count,
  save boards for offline use, and see saved interactions.
- **Accessibility.** App-wide switch between pictograms and SignWriting
  (Libras), remembered across restarts, through the accessibility menu.
- **Offline-first sync.** Professions, specialities, common and emergency
  boards, their terms and next boards, triage steps and phrases are synced to
  local storage on launch; screens read only the cache and fall back to bundled
  data, with a banner when the sync fails.
- **Tests.** Jest (`jest-expo`) with React Native Testing Library, covering the
  adapters, the pure utilities and the sync.
- **Documentation.** `docs/ARCHITECTURE.md` and `docs/ACCESSIBILITY.md`.

[Unreleased]: https://github.com/PET-Saude-GAT-4/comunicacao-inclusiva-app/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/PET-Saude-GAT-4/comunicacao-inclusiva-app/releases/tag/v0.1.0
