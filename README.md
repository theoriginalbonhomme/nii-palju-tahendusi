# Nii palju tähendusi!

A word game for learning Estonian homonyms: words with several meanings, like *pea* (head, hold, stop, soon). The word list of 777 words is by Kati Murutar.

This repository holds the **base version** of the web app. It runs in any browser, on a phone or a computer, with nothing to install.

*Eesti keeles: mitmetähenduslike sõnade õppemängu veebiäpi alusversioon. Sõnavara (777 sõna) on Kati Murutari oma.*

## What works today

- **Sõnast tähendusteni** (from word to meanings): you see a word and pick its meanings from four options.
- **Tähendustest sõnani** (from meanings to word): you see the meanings and pick the word.
- **Kõik sõnad** (all words): browse and search the whole list.
- Rounds of 10 questions, score and streak, keys 1–4 and Enter work on a keyboard.

## Run it

The quickest way: download the repository and double-click `index.html`.

Or run a small local server, so it behaves like the real site:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The page: tabs, card, answer buttons, word list |
| `css/style.css` | All styles (temporary Unleashed look) |
| `js/app.js` | Game logic: rounds, options, scoring, search |
| `data/words.js` | The 777 words, one per line: `w` = word, `m` = meanings |
| `scripts/check-words.js` | Checks the word list for mistakes (`node scripts/check-words.js`) |
| `docs/REQUIREMENTS.md` | What the finished app must do, stage by stage |
| `docs/GUIDE.md` | How we work together: branches, pull requests, reviews |

## Next

The plan for the finished app, and what comes in each stage, is in [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md). How to start working is in [docs/GUIDE.md](docs/GUIDE.md).

## Rights

The word list and the game idea belong to Kati Murutar. The code belongs to Teslawave OÜ (Unleashed Publishing). This repository is private and not open source. See [LICENSE](LICENSE).
