# Vivre en Thailande

**Type:** website | **Stage:** mvp
**Dev Environment:** windows

---

## References & Inspirations

### Reference Links

> Claude: fetch these URLs for context on project preferences.

- https://partir-vivre-en-thailande.com/

### Design & Style Preferences

Le site n'est pas une reference mais c'est le site que mon client ma demandé de refaire

---

# MCP Gemini Design - MANDATORY UNIQUE WORKFLOW

## ABSOLUTE RULE

You NEVER write frontend/UI code yourself. Gemini is your frontend developer.

---

## AVAILABLE TOOLS

### `generate_vibes`
Generates a visual page with 5 differently styled sections. The user opens the page, sees all 5 vibes, and picks their favorite. The code from the chosen vibe becomes the design-system.md.

### `create_frontend`
Creates a NEW complete file (page, component, section).

### `modify_frontend`
Makes ONE design modification to existing code. Returns a FIND/REPLACE block to apply.

### `snippet_frontend`
Generates a code snippet to INSERT into an existing file. For adding elements without rewriting the entire file.

---

## WORKFLOW (NO ALTERNATIVES)

### STEP 1: Check for design-system.md

BEFORE any frontend call → check if `design-system.md` exists at project root.

### STEP 2A: If design-system.md DOES NOT EXIST

1. Call `generate_vibes` with projectDescription, projectType, techStack
2. Receive the code for a page with 5 visual sections
3. Ask: "You don't have a design system. Can I create vibes-selection.tsx so you can visually choose your style?"
4. If yes → Write the page to the file
5. User chooses: "vibe 3" or "the 5th one"
6. Extract THE ENTIRE CODE between `<!-- VIBE_X_START -->` and `<!-- VIBE_X_END -->`
7. Save it to `design-system.md`
8. Ask: "Delete vibes-selection.tsx?"
9. Continue normally

### STEP 2B: If design-system.md EXISTS

Read it and use its content for frontend calls.

### STEP 3: Frontend Calls

For EVERY call (create_frontend, modify_frontend, snippet_frontend), you MUST pass:

- `designSystem`: Copy-paste the ENTIRE content of design-system.md (all the code, not a summary)
- `context`: Functional/business context WITH ALL REAL DATA. Include:
  - What it does, features, requirements
  - ALL real text/labels to display (status labels, button text, titles...)
  - ALL real data values (prices, stats, numbers...)
  - Enum values and their exact meaning
  - Any business-specific information

**WHY**: Gemini will use placeholders `[Title]`, `[Price]` for missing info. If you don't provide real data, you'll get placeholders or worse - fake data.

---

## FORBIDDEN

- Writing frontend without Gemini
- Skipping the vibes workflow when design-system.md is missing
- Extracting "rules" instead of THE ENTIRE code
- Manually creating design-system.md
- Passing design/styling info in `context` (that goes in `designSystem`)
- Summarizing the design system instead of copy-pasting it entirely
- Calling Gemini without providing real data (labels, stats, prices, etc.) → leads to fake info

## EXPECTED

- Check for design-system.md BEFORE anything
- Follow the complete vibes workflow if missing
- Pass the FULL design-system.md content in `designSystem`
- Pass functional context in `context` (purpose, features, requirements)

## EXCEPTIONS (you can code these yourself)

- Text-only changes
- JS logic without UI
- Non-visual bug fixes
- Data wiring (useQuery, etc.)

---

## WHY (Business Context & Goals)

- **Users:** visitors
- **Success KPIs:** seo-traffic

- **Primary technical goal:** visual-quality
- **Risk tolerance:** medium

---

## WHAT (Architecture & Stack)

### Repo Map

- **Repo type:** single

### Stack

> **Agent:** Analyze the project structure, `package.json`, config files, and codebase to determine the full tech stack. Document your findings here before proceeding.

---

## HOW (Working Rules)

### Commands

```bash
# Install
npm install
```

```bash
# Dev
npm run dev
```

### Code Standards

- **Naming:** mixed

### Always-On Rules (Detailed)

- [HARD] Toujours etablir des plan

---

### Agent Preferences

- **Autonomy:** high
- **Plan before coding:** true
- **Detail level:** moderate
- **Explain tradeoffs:** true
- **Change preference:** refactor
- **Speed vs robustness:** balanced
- **Prototype vs production:** production

### Code Modification Policy

- Can create files: Yes
- Can rename/move: Yes
- Can modify DB schema: Yes
- Can modify CI/CD: Yes
- Can add/remove deps: Yes
