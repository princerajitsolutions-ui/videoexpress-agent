---
name: videoexpress-agent
description: >-
  Autonomous Multi-Style Video Producer for VideoExpress.ai. Activate whenever the user says
  "Create a VideoExpress Video" or "Use VideoExpress Agent". Starts with a structured 6-point interactive intake
  (Video Type, Aspect Ratio [16:9 Standard Video vs 9:16 Vertical Short], Visual Style [2D Stickman / 3D Pixar / Photorealistic / 2D Anime / Claymation],
  Target Length, Input Mode [Just Title & Context vs Full Script], and Audio Route [In-App CloneVoice TTS vs Studio FFmpeg Master]).
  Enforces 5-Layer Continuity (Master Character Reference Photo 1, Fixed Location Reference Photo 2, Outgoing-to-Incoming State Handoffs,
  Incoming Prop & Eyeline Gates, and Frame QA), Mouth-Locked prompts, 5-slot queue polling, and BunnyCDN mediaPath sync guard.
---

# 🎬 VideoExpress Agent (`videoexpress-agent`)

Whenever the user asks to **"Create a VideoExpress Video"** or **"Use VideoExpress Agent"** (or requests any story/video production in **VideoExpress.ai**), follow this modular workflow.

---

## ⚡ Phase 0: Mandatory Interactive Intake (Ask Missing Fields First)

Before generating any assets or spending credits, check what the user has already provided and ask **once** for any missing choices across these **6 intake dimensions** (using `ask_question` or a single concise prompt — see [`prompts/01-intake-and-brief.md`](prompts/01-intake-and-brief.md)):

1. **Video Type (Narrative Genre):**
   - `Narrated Story / Fable` *(Default)*
   - `Explainer / Documentary`
   - `Comedy / Satire`
   - `Adventure / Action`
   - `Educational / Lesson`
2. **Aspect Ratio (Determines Standard Video vs. Short/Reel):**
   - `Landscape (16:9) — Standard Widescreen Video` *(Default — `1920x1080` video, `3840x2160` 4K thumbnail)*
   - `Vertical (9:16) — Vertical Short / Reel` *(`1080x1920` vertical canvas, 3s hook & vertical framing)*
   - *Never offer `1:1`. Enforce the chosen ratio across the project bar, the generation dialog's own ratio toggle before every `Create Image` click, timeline tracks, and final export.*
3. **Visual Style (`select-type`):**
   - `2D Stickman` *(Classic stickman: white circular head, expressive drawn eyes/eyebrows, 2 thin black arms/hands, 2 thin black legs/shoes; every visible human including background crowds must be a 2D stickman)*
   - `3D Pixar / 3D Animated Feature` *(subsurface scattering, tactile fabric/fur, volumetric rim light)*
   - `Photorealistic / Cinematic` *(natural optical lens physics, realistic textures, zero cartoon artifacts)*
   - `2D Illustration / 2D Anime` *(layered cel shading, painted atmospheric backgrounds)*
   - `Claymation / Stop-Motion` *(handcrafted plasticine textures, miniature studio tabletop lighting)*
4. **Target Length / Runtime:**
   - `Concise (~30s | ~6–8 scenes)`
   - `Standard (~45–60s | ~9–12 scenes)`
   - `Extended (~75–120s+ | ~15–22 scenes)`
   - `Story-Driven / Auto` *(Default when unspecified — plans enough 3–5s connected beats for a complete story without filler)*
5. **Script Input Mode:**
   - **Mode A — Just Title & Context / Idea:** User provides a title, topic, or brief premise; autonomously write the full story arc, fresh protagonist identity (do not automatically reuse *Milo*), fixed location layouts, and 3–5s per-scene narration lines.
   - **Mode B — Full Script Provided:** User provides their full script or scene list; preserve their wording, segment into 3–6s one-action beats, verify the `0.60s` breath-padding rule (`audio_dur <= clip_dur - 0.60s`), and build the continuity ledger around the script.
6. **Audio, Voice & Assembly Route:**
   - **Route A — In-App VideoExpress Integrated Narration *(Default)*:** `Narration Video (Choose my Audio)` ON → `Create Video` → `CloneVoice` → `System Voice` → **`Beau Whitaker`** (or chosen voice) → `Import Speech` → `Create Narration Video` → `Add to Timeline` → `Auto Align Clips` → `Save` & `Export Video`.
   - **Route B — Studio Mastered Hybrid Pipeline:** Generates **Mouth-Locked** (`Video Only`) clips in VideoExpress, downloads raw `.mp4` clips from BunnyCDN, synthesizes continuous speech (`Highpass @ 100Hz`, `+3.5dB @ 3kHz` presence boost, normalized to `-14 LUFS`), mixes genre-matched BGM with FFmpeg `sidechaincompress` ducking (`-20dB` to `-24dB` under speech), renders a 4K/Vertical High-CTR Cover Thumbnail, and delivers atomically to the YUploader dropzone.

---

## 🔗 5-Layer Continuity System (Enforced on Every Run)

See [`prompts/02-story-and-continuity.md`](prompts/02-story-and-continuity.md) and [`templates/continuity-ledger.template.md`](templates/continuity-ledger.template.md):

1. **Layer 1 — Standalone Master Character (`Reference Photo 1`):**
   - Generate and inspect one full-body protagonist alone on a plain neutral studio background before Scene 1. Save as `<Project Title> — Master Character`, enable **Consistent Character**, and lock it into `Reference Photo 1` across all scenes (`1..N`).
2. **Layer 2 — Fixed Location Layouts (`Reference Photo 2`):**
   - Lock the camera side (`SOUTH`, etc.) and landmark screen zones (`LEFT`, `CENTER`, `RIGHT`, `FOREGROUND`, `BACKGROUND`) for every recurring set. Attach a standalone empty set reference to `Reference Photo 2` when supported.
3. **Layer 3 — Outgoing State $N$ = Incoming State $N+1$ Handoff Chain:**
   - Plan the complete Continuity Ledger before Scene 1. Every scene's source image starts in the exact pose, screen position, hand occupancy, and prop state where the prior scene ended—never resetting to a neutral front-facing pose or repeating an approach/reach cycle.
4. **Layer 4 — Incoming Prop State & Interaction Eyeline Gates:**
   - Source images depict the **pre-action state** of props (e.g., tightly folded umbrella shaft before opening; wet clothing stays wet across cuts). Interacting characters face each other across a readable side-on or three-quarter axis rather than staring into the lens.
5. **Layer 5 — Pre-Video Source Inspection & `t=1.5s` Frame Audit:**
   - Inspect each source image before clicking `Create Video` (1 head, 1 torso, 2 arms/hands, 2 legs/feet, exact prop count, zero style contamination).

---

## 📂 Modular Reference & Script Hierarchy

- **Phase 0 (Intake & Brief):** [`prompts/01-intake-and-brief.md`](prompts/01-intake-and-brief.md) & [`config/intake-schema.json`](config/intake-schema.json)
- **Phase 1–2 (Story, Multi-Style Art Direction & 5-Layer Continuity):** [`prompts/02-story-and-continuity.md`](prompts/02-story-and-continuity.md) & [`config/prompt-book.schema.json`](config/prompt-book.schema.json)
- **Phase 3–4 (VideoExpress Modal DOM Hooks, 5-Slot Queue & BunnyCDN Guard):** [`prompts/03-videoexpress-mechanics.md`](prompts/03-videoexpress-mechanics.md) & [`scripts/ve_queue_worker.js`](scripts/ve_queue_worker.js)
- **Phase 5–6 (In-App CloneVoice vs Studio FFmpeg Sidechain Mastering & Atomic Delivery):** [`prompts/04-audio-qa-and-delivery.md`](prompts/04-audio-qa-and-delivery.md) & [`scripts/studio_audio_assembler.py`](scripts/studio_audio_assembler.py)
- **Templates:** [`templates/production-brief.template.md`](templates/production-brief.template.md) & [`templates/continuity-ledger.template.md`](templates/continuity-ledger.template.md)
- **QA Checklist & Examples:** [`evals/acceptance-checklist.md`](evals/acceptance-checklist.md) & [`examples/`](examples/)
