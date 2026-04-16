# Linkifi Revamp - Project Notes

Last updated: 2026-04-16 21:41 BST

## Current state
- Project path: `/Users/chrispanteli/Desktop/CODEX/LINKIFI REVAMP`
- Branch: `main`
- Local HEAD: `ed02f99644400f88001bbbb9a751f42247d9ee8a`
- Latest pushed commit message: `Add CEOs and spokespeople cards to built-for strip`
- Sync status: local `main` and `origin/main` are aligned (`0 ahead / 0 behind`)

## Shared assistant instruction files
- `AI_COLLABORATION.md` - canonical shared workflow for Claude + Codex
- `CLAUDE.md` - Claude wrapper pointing to shared docs
- `AGENTS.md` - Codex wrapper pointing to shared docs
- `PROJECT_NOTES.md` (this file) - environment/runtime/auth continuity details

## Known local untracked files (as of 2026-04-16)
- `public/authority-montage/raw/IMG_0585.jpg`
- `public/authority-montage/raw/IMG_0586.jpg`
- `public/authority-montage/raw/IMG_0587.jpg`
- `public/authority-montage/raw/IMG_0588.jpg`
- `public/authority-montage/raw/IMG_0589.jpg`
- `public/homepage/HERO/Hero Video (1).mp4`
- `public/publication-logos/163-1634355_realtor-logo-black-and-white-realtor-com-5-star.png`
- `public/publication-logos/Daily_Express_logo_logotype.png`
- `public/publication-logos/The-Wall-Street-Journal-Symbol.png`
- `public/publication-logos/hubspot-inc-business-logo-inbound-marketing-portable-network-graphics-business.jpg`
- `public/team/Chris Panteli.webp`
- `public/team/Dani D.jpg`
- `public/team/Mat\303\255as.jpg`
- `public/team/Nick Biggs.webp`
- `public/team/processed/_test/`

## 2026-04-16 `/authority-pr` rollout summary
Primary file touched across all iterations:
- `components/site/AuthorityPrDeckPage.tsx`

Implemented and shipped:
- Rebuilt hero right panel into a TV-style video frame with autoplay loop behavior.
- Added and tracked hero video asset(s) used in production (`authority-pr-hero.mp4`, then switched to `hero1.mp4`).
- Added and then refined/remixed callout treatments based on iterative feedback (visibility, pulse behavior, arrow removal).
- Removed hero support pills (`Live authority reel`, `Optimized autoplay loop`) and removed the hero-row `Main promise` / `End state` cards.
- Replaced the hero supporting block with a stylized `Built for` strip, then iterated through:
  - softer/less-contrast version
  - sketch-style mini illustrations
  - robotic/sleek/angular treatment
  - expanded audience coverage with two new cards: `CEOs`, `Spokespeople`
- Final state now includes 5 `Built for` audience cards:
  - Brands
  - Founders
  - Experts
  - CEOs
  - Spokespeople

Recent shipped commits for this rollout:
- `8c6d39e` Rework Authority PR hero with TV-style autoplay video
- `71b6983` Add tracked hero video asset for Authority PR
- `52d58d8` Widen Authority PR hero video bezel
- `306f0a3` Add animated hero callout pointing to TV screen
- `085e416` Update hero callout with pink curved arrow and switch to hero1 video
- `8c1478c` Refine hero TV styling with pulsing badge and no arrow
- `bf49fc2` Simplify hero supporting block to full-width stylized built-for section
- `ba7ffe8` Refine built-for strip with softer palette and sketch illustrations
- `e005b37` Style built-for strip with sleek robotic angular treatment
- `ed02f99` Add CEOs and spokespeople cards to built-for strip

## Start-of-session terminal commands
Run exactly:

```bash
cd "/Users/chrispanteli/Desktop/LINKIFI REVAMP"
git status -sb
git remote -v
git fetch origin
git pull --rebase origin main
```

## If GitHub push auth fails
If push errors include `Invalid username or token` or `could not read Username`, run:

```bash
printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase
git push origin main
```

Then enter:
- Username: `LinkifiPR`
- Password: your GitHub fine-grained token (not GitHub account password)

## Build/test commands before commit
```bash
npx next build
npm run check
```

## Standard commit/push flow
Use targeted staging (avoid `git add -A` when there are unrelated local assets):

```bash
git add <only-the-files-for-this-task>
git commit -m "your message"
git push origin main
```

---

## New chat starter (Claude or Codex)
Use this at the start of each new session:

```text
Project path: /Users/chrispanteli/Desktop/LINKIFI REVAMP
Goal for this thread: <replace with exact task>
Assistant: <Claude or Codex>
Constraints:
- Keep existing Linkifi visual style unless I explicitly ask for a redesign
- Do not touch unrelated files
- Run: npx next build and npm run check before commit
- Commit and push to main when done
Read first:
- /Users/chrispanteli/Desktop/LINKIFI REVAMP/AI_COLLABORATION.md
- /Users/chrispanteli/Desktop/LINKIFI REVAMP/PROJECT_NOTES.md
- /Users/chrispanteli/Desktop/LINKIFI REVAMP/CLAUDE.md (if Claude)
- /Users/chrispanteli/Desktop/LINKIFI REVAMP/AGENTS.md (if Codex)
```

## Notes for continuity
- Keep each session scoped to one clear outcome.
- If a session gets long, start a new thread and reuse the starter block.
- If both assistants are active at the same time, use separate branches per task.
