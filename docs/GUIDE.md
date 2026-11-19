# How we work

A short guide for working on this repository.

## People

- **Richard Murutar** (Teslawave OÜ / Unleashed Publishing): project lead. Reviews and merges every change.
- **Kati Murutar**: author of the word list and the game. Questions about words or meanings go to Richard, who asks Kati.
- **You**: building the app.

All communication goes by email to Richard: theoriginalbonhomme@gmail.com. Please don't contact Kati directly about the project.

## Getting started

1. Clone the repository: `git clone https://github.com/theoriginalbonhomme/nii-palju-tahendusi.git`
2. Open `index.html` in your browser, or run `python3 -m http.server 8000` and open http://localhost:8000.
3. Play a few rounds in each mode, and read [REQUIREMENTS.md](REQUIREMENTS.md).

## Making a change

1. Pick an issue, or open one that says what you want to do.
2. Make a branch from `main`, named after the issue, for example `12-practice-mode`.
3. Keep each change small: one feature or one fix per pull request.
4. Before you push, check that:
   - the game works in all three modes on a phone-sized screen (in Chrome: F12, then the phone icon);
   - there are no errors in the browser console;
   - `node scripts/check-words.js` says the word list is OK, if you touched `data/words.js`.
5. Open a pull request. Describe what changed and add a screenshot if the look changed.
6. Richard reviews it and merges it, or asks for changes.

Never push straight to `main`.

## Rules for the code

- Plain HTML, CSS and JavaScript, no framework, unless we agree otherwise first.
- No new libraries or outside services without asking: the app must load fast and collect no data.
- The interface text is Estonian. Code, comments and commit messages are English.
- Keep the word list in `data/words.js` exactly as Kati wrote it. Don't edit words or meanings, even if something looks like a typo: write it down in an issue instead.

## Using AI tools

Using AI coding assistants is fine. You are still responsible for the code you send: read it, run it and understand it before opening a pull request.

## Questions

Stuck for more than an hour? Write to Richard. A short question early saves a long rebuild later.
