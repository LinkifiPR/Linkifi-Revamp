# AI Collaboration Guide (Claude + Codex)

This file is the shared source of truth for AI-assisted work in this repo.

## Canonical References
- Collaboration workflow: `AI_COLLABORATION.md` (this file)
- Project/runtime/auth details: `PROJECT_NOTES.md`

## Session Start Checklist
Run from project root:

```bash
git status
git branch --show-current
git remote -v
```

Then read:
- `AI_COLLABORATION.md`
- `PROJECT_NOTES.md`

## Guardrails
- Keep existing Linkifi visual style unless explicitly asked to redesign.
- Do not edit unrelated files.
- Never revert someone else's in-progress work unless explicitly requested.
- Keep changes scoped to one clear outcome per branch/task.

## Branch Strategy
- If only one assistant is active: working on `main` is acceptable.
- If Claude and Codex are both active at once: use separate branches to avoid conflicts.
- Suggested branch naming:
  - `claude/<task-name>`
  - `codex/<task-name>`

## Validation Before Commit
Run:

```bash
npx next build
npm run check
```

If either fails, fix or report before committing.

## Handoff Format (for assistant-to-assistant continuity)
Include in the final update or PR description:
- Goal completed
- Files changed
- Commands run and outcomes
- Follow-up items or known risks

## Commit & Push Guidance
- Keep commit messages task-specific and readable.
- Avoid mixing unrelated changes in one commit.
- Push only the branch relevant to the current scoped task.

