# Accessibility

The app exists so that people who do not communicate by speech, deaf Libras
users in particular, can take part in a health consultation. Accessibility is
therefore the product, not a layer on top of it. This document describes what
the app does today and the rules new screens follow.

## Display modes: pictogram and SignWriting

Every term carries two images: a pictogram and its SignWriting (Libras)
transcription. Which one is shown is a single app-wide preference.

- `PreferencesContext` holds `displayMode` (`"pictogram"` or `"signWriting"`)
  and persists it under `@preferences_display_mode`, so the choice survives a
  restart.
- `resolveTermDisplay(term, mode)` (`app/utils/resolveTermDisplay.ts`) is the
  single place that picks the image and the label for a term. Screens and
  components call it instead of reading `term.pictogram` or `term.signWriting`
  directly, so every surface switches together. The label is upper-cased.
  One exception remains: tapping a symptom in an emergency module opens
  `UrgencyResponseScreen` with the term's pictogram, so that screen shows the
  pictogram even in SignWriting mode.
- Board covers (category chips, board cards) are not terms and keep using
  `board.representativePictogram`.
- Each interaction records the `displayMode` active when it was sent, so the
  feedback and report screens show it the way it was seen at the time, even if
  the mode changed afterwards.

## Accessibility menu

`AccessibilityMenu` is the floating button on the free board
(`CommBoardScreen`). It opens two options:

- **Modo Libras / Modo Pictogramas**: toggles the display mode. Label and icon
  name the mode the button switches _to_.
- **Modo de texto**: lets the board be used by typing free text instead of
  tapping terms.

A high-contrast option is planned after the MVP and is commented out in the
component.

## Pain scale and body map

- The pain scale (`app/components/pain-scale/`) is an `adjustable` control with
  a label, a hint and an `accessibilityValue`, so screen readers can step
  through levels. Each face is also a labelled button
  (`"<severity>. <label>"`).
- Haptics confirm what happened without relying on sight: a light impact on
  each level while dragging, a selection tick when a face is tapped, and a
  success notification when the level is sent.
- If sending a level fails, the error in the tray is announced with
  `accessibilityLiveRegion="polite"`.
- The close button has a 12 pt `hitSlop` to enlarge its touch target.
- Every region of the body map (`BodyFrontView`, `BodyBackView`) is an
  accessible button labelled with its Portuguese name from
  `app/constants/bodyMapRegions.ts`.
- Recorded entries read as text (`app/utils/interactionText.ts`): the pain
  level is shown 1-based next to the scale size, and body regions are listed by
  name.

## Rules for new screens

1. Every touchable element sets `accessibilityRole` and an
   `accessibilityLabel`; toggles and selectable items also set
   `accessibilityState` (`selected`, `checked`, `disabled`).
2. Labels and hints are in Portuguese, the language the user hears.
3. Never convey meaning through color alone. Selection, errors and urgency also
   change text, an icon or shape.
4. Touch targets are at least 44×44 pt; use `hitSlop` when the visual element
   must stay smaller.
5. What is visible is also available to the screen reader: images that carry
   meaning get a label, decorative ones are hidden from accessibility.
6. Show term images and labels through `resolveTermDisplay`, never by picking
   `pictogram` or `signWriting` by hand.
7. Confirm actions the user cannot see happen (sending, saving) with haptics or
   a live-region message.

Coverage is still partial: the pain scale and body map follow these rules,
while many older screens and components (board grids, cards, the accessibility
menu itself) do not set roles or labels yet. Bring a component up to the rules
when you touch it.
