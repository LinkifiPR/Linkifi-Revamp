# Linkifi Revamp - Project Notes

Last updated: 2026-04-08 12:39 GMT

## Current state
- Project path: `/Users/chrispanteli/Desktop/LINKIFI REVAMP`
- Branch: `main`
- Local HEAD: `a2005db1a4d1c675b8221251ec856d8361d0d9c3`
- Latest pushed commit message: `Add shared AI collaboration docs for Claude and Codex`
- Sync status: local `main` and `origin/main` are aligned (`0 ahead / 0 behind`)

## Shared assistant instruction files
- `AI_COLLABORATION.md` - canonical shared workflow for Claude + Codex
- `CLAUDE.md` - Claude wrapper pointing to shared docs
- `AGENTS.md` - Codex wrapper pointing to shared docs
- `PROJECT_NOTES.md` (this file) - environment/runtime/auth continuity details

## Known local untracked files (as of 2026-04-08)
- `public/authority-montage/raw/IMG_0585.jpg`
- `public/authority-montage/raw/IMG_0586.jpg`
- `public/authority-montage/raw/IMG_0587.jpg`
- `public/authority-montage/raw/IMG_0588.jpg`
- `public/authority-montage/raw/IMG_0589.jpg`
- `public/publication-logos/163-1634355_realtor-logo-black-and-white-realtor-com-5-star.png`
- `public/publication-logos/Daily_Express_logo_logotype.png`
- `public/publication-logos/The-Wall-Street-Journal-Symbol.png`
- `public/publication-logos/hubspot-inc-business-logo-inbound-marketing-portable-network-graphics-business.jpg`
- `public/team/Chris Panteli.webp`
- `public/team/Dani D.jpg`
- `public/team/Mat\303\255as.jpg`
- `public/team/Nick Biggs.webp`
- `public/team/processed/_test/`

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
