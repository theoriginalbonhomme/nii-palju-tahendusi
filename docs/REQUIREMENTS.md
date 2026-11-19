# Requirements: Nii palju tähendusi!

What the finished app must do. The base version in this repository already covers the first three game modes. Everything below the base version is built in stages.

## Who it is for

- People learning Estonian, around level B1–B2: adults in language courses and older school students.
- Teachers who use it in class, on the classroom screen or on students' phones.
- Native speakers who simply like word games.

## Must have (the finished app)

### Game

1. **Three modes**, as in the base version: from word to meanings, from meanings to word, and all words (browse and search).
2. **Practice mode**: no points and no time limit. Wrong answers show the right one, and the player can keep going at their own pace.
3. **Points, levels and progress**:
   - points for right answers, a bonus for streaks;
   - levels that unlock as the player improves (for example by number of meanings: 2, then 3, then 4 or more);
   - a progress view: how many words the player has learned, and which ones they keep getting wrong.
4. **All 777 words**, with their meanings exactly as Kati wrote them. Changes to words or meanings come only from Kati, through Richard.

### Works everywhere

5. A **web app**: opens in the browser, nothing to install. Works on phones, tablets and computers, in portrait and landscape.
6. Works on current Chrome, Safari, Firefox and Edge, and on phones from the last 5 years.
7. Loads fast on a weak mobile connection: the first screen in under 3 seconds on 3G.
8. Can be **added to the home screen** and keeps working offline after the first visit (a PWA).

### Language and access

9. The whole interface is in **Estonian**.
10. Usable **without a mouse**: keys 1–4 and Enter already work; every button can be reached with Tab.
11. Readable for everyone: text contrast at least 4.5:1, text that grows with the phone's font setting, and correct labels for screen readers.
12. Respects "reduce motion" in the phone's settings (the base version already does).

### Privacy

13. **No accounts, no sign-up, no tracking.** Many players are school students, some under 18.
14. Progress is saved only on the player's own device (in the browser's local storage).
15. No third-party scripts, ads or analytics. Fonts are served from our own site, not from Google.

### Delivery

16. Source code in this repository, with a short user guide and technical notes.
17. Hosting and a domain for 12 months after launch (Richard arranges this).

## Stages

The dates are targets. They move if funding is confirmed later. Nothing beyond the base version starts until Richard says go.

| Stage | Target date | What is ready |
| --- | --- | --- |
| Base version | 30 Nov 2026 | Working app with three modes and all 777 words (this repository) |
| Stage 1 | 15 Dec 2026 | Own design for the game, better mobile view, self-hosted fonts, home-screen icon |
| Stage 2 | 15 Feb 2027 | Points, levels, practice mode, progress view, offline mode; a version for testing in class |
| Stage 3 | 10 Mar 2027 | Feedback from class testing built in, bugs fixed, final app |
| Launch | 21 Mar 2027 | App goes public on Kati's jubilee |

## Not in scope (for now)

- Native iOS or Android apps.
- Accounts, leaderboards between players, or anything that collects personal data.
- Multiplayer.
- Adding or changing words without Kati.

Ideas for later are welcome: open an issue with the label `idea`.
