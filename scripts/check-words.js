// Checks data/words.js for mistakes: run with `node scripts/check-words.js`.
"use strict";
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "words.js");
const WORDS = new Function(fs.readFileSync(file, "utf8") + "\nreturn WORDS;")();

const problems = [];
const seen = new Map();

WORDS.forEach((entry, i) => {
  const where = `entry ${i + 1}`;
  if (!entry || typeof entry.w !== "string" || !entry.w.trim()) {
    problems.push(`${where}: missing word`);
    return;
  }
  const key = entry.w.trim().toLowerCase();
  if (seen.has(key)) problems.push(`${where}: "${entry.w}" also at entry ${seen.get(key)}`);
  else seen.set(key, i + 1);
  if (!Array.isArray(entry.m) || entry.m.length < 2) {
    problems.push(`${where}: "${entry.w}" needs at least two meanings`);
  } else if (entry.m.some((m) => typeof m !== "string" || !m.trim())) {
    problems.push(`${where}: "${entry.w}" has an empty meaning`);
  }
});

if (problems.length) {
  console.error(`Word list has ${problems.length} problem(s):\n` + problems.join("\n"));
  process.exit(1);
}
console.log(`Word list OK: ${WORDS.length} words.`);
