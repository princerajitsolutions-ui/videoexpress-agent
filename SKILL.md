---
name: videoexpress-shorts-agent
description: >-
  Autonomous Dynamic Multi-Style Video, Story & Shorts Producer for VideoExpress.ai.
  Always starts with a structured 6-point interactive intake (Video Type, Visual Style [2D Stickman / 3D Pixar / Photorealistic / 2D Anime / Claymation],
  Aspect Ratio [16:9 / 9:16], Target Length, Input Mode [Just Title & Context vs Full Script], and Audio Route [In-App CloneVoice TTS vs Studio FFmpeg Master]).
  Enforces Master Character & Fixed Location references, Outgoing-to-Incoming continuity handoffs, Mouth-Locked non-lipsync prompts,
  5-slot concurrent queue polling, BunnyCDN mediaPath sync guard, and 0px audio-video assembly.
---

# 🎬 VideoExpress Dynamic Multi-Style Story & Shorts Agent

Whenever the user asks to create a video, story, or Short in **VideoExpress.ai** (or invokes `videoexpress`, `stickman story`, or `videoexpress-shorts-agent`), follow this modular production workflow.

---

## ⚡ Phase 0: Mandatory Interactive Intake (Ask Missing Fields First)

Before generating any assets or spending credits, check what the user has already provided and ask **once** for any missing choices across these **6 intake dimensions** (using `ask_question` or a single concise prompt — see [`prompts/01-intake-and-brief.md`](prompts/01-intake-and-brief.md)):

1. **Video Type / Format:**
   - `Narrated Story / Fable` *(Default)*
   - `YouTube Short / Instagram Reel / TikTok` *(3s hook, escalating beats, seamless loop ending)*
   - `Explainer / Documentary / Educational`
   - `Comedy / Satire Skit`
2. **Visual Style (`select-type`):**
   - `2D Stickman` *(Classic stickman: white circular head, expressive drawn eyes/eyebrows, 2 thin black arms/hands, 2 thin black legs/shoes; every visible human including background crowds must be a 2D stickman)*
   - `3D Pixar / 3D Animated Feature` *(subsurface scattering, tactile fabric/fur, volumetric rim light)*
   - `Photorealistic / Cinematic` *(natural optical lens physics, realistic textures, zero cartoon artifacts)*
   - `2D Illustration / 2D Anime` *(layered cel shading, painted atmospheric backgrounds)*
   - `Claymation / Stop-Motion` *(handcrafted plasticine textures, miniature studio tabletop lighting)*
3. **Aspect Ratio (Project-Wide Invariant):**
   - `Landscape (16:9)` *(Widescreen `1920x1080` video, `3840x2160` 4K thumbnail)*
   - `Vertical (9:16)` *(Shorts/Reels `1080x1920` video & cover)*
   - *Never offer `1:1`. Enforce the chosen ratio across the project bar, the generation dialog's own ratio toggle before every `Create Image` click, timeline tracks, and final export.*
4. **Target Length / Runtime:**
   - `Short (15s–30s | ~4–6 scenes)`
   - `Standard (45s–60s | ~9–12 scenes)`
   - `Extended Story (75s–120s+ | ~15–22 scenes)`
   - `Story-Driven / Auto` *(Default when unspecified — plans enough 3–5s connected beats for a complete story without filler)*
5. **Script Input Mode:**
   - **Mode A — Just Title & Context / Idea:** User provides a title, topic, or brief premise; autonomously write the full story arc, fresh protagonist identity (do not automatically reuse *Milo*), fixed location layouts, and 3–5s per-scene narration lines.
   - **Mode B — Full Script Provided:** User provides their full script or scene list; preserve their wording, segment into 3–6s one-action beats, verify the `0.60s` breath-padding rule (`audio_dur <= clip_dur - 0.60s`), and build the continuity ledger around the script.
6. **Audio, Voice & Assembly Route:**
   - **Route A — In-App VideoExpress Integrated Narration *(Default)*:** `Narration Video (Choose my Audio)` ON → `Create Video` → `CloneVoice` → `System Voice` → **`Beau Whitaker`** (or chosen voice) → `Import Speech` → `Create Narration Video` → `Add to Timeline` → `Auto Align Clips` → `Save` & `Export Video`.
   - **Route B — Studio Mastered Hybrid Pipeline:** Generates **Mouth-Locked** (`Video Only`) clips in VideoExpress, downloads raw `.mp4` clips from BunnyCDN, synthesizes continuous speech (`Highpass @ 100Hz`, `+3.5dB @ 3kHz` presence boost, normalized to `-14 LUFS`), mixes genre-matched BGM with FFmpeg `sidechaincompress` ducking (`-20dB` to `-24dB` under speech), renders a 4K/Vertical High-CTR Cover Thumbnail, and delivers atomically to the YUploader dropzone.

---

## 📂 Modular Reference & Script Hierarchy

Read the corresponding module inside this skill directory when executing each phase:

- **Phase 0 (Intake & Brief):** [`prompts/01-intake-and-brief.md`](prompts/01-intake-and-brief.md) & [`config/intake-schema.json`](config/intake-schema.json)
- **Phase 1–2 (Story, Multi-Style Art Direction, Master References & Continuity Ledger):** [`prompts/02-story-and-continuity.md`](prompts/02-story-and-continuity.md) & [`config/prompt-book.schema.json`](config/prompt-book.schema.json)
- **Phase 3–4 (VideoExpress Modal DOM Hooks, 5-Slot Queue & BunnyCDN Guard):** [`prompts/03-videoexpress-mechanics.md`](prompts/03-videoexpress-mechanics.md) & [`scripts/ve_queue_worker.js`](scripts/ve_queue_worker.js)
- **Phase 5–6 (In-App CloneVoice vs Studio FFmpeg Sidechain Mastering & Atomic Delivery):** [`prompts/04-audio-qa-and-delivery.md`](prompts/04-audio-qa-and-delivery.md) & [`scripts/studio_audio_assembler.py`](scripts/studio_audio_assembler.py)
- **Templates:** [`templates/production-brief.template.md`](templates/production-brief.template.md) & [`templates/continuity-ledger.template.md`](templates/continuity-ledger.template.md)
- **QA Checklist & Examples:** [`evals/acceptance-checklist.md`](evals/acceptance-checklist.md) & [`examples/`](examples/)

---

## 🔒 Non-Negotiable Production Rules

1. **Standalone Master Character First (`Reference Photo 1`):**
   - Generate and inspect one full-body protagonist alone on a plain neutral studio background before Scene 1. Save as `<Project Title> — Master Character`, enable **Consistent Character**, and keep it in `Reference Photo 1` across all scenes (`1..N`).
2. **Fixed Location Layouts (`Reference Photo 2`):**
   - Lock the camera side and landmark screen zones (`LEFT`, `CENTER`, `RIGHT`, `FOREGROUND`, `BACKGROUND`) for every recurring set. Attach a standalone empty set reference to `Reference Photo 2` when supported.
3. **Outgoing State $N$ = Incoming State $N+1$:**
   - Every scene starts in the exact pose, position, and prop state where the prior scene ended. Never reset to a neutral pose or depict a completed action in the source image.
4. **Pre-Submit Modal Reset Guard:**
   - Before every `Create Image` click, verify the dialog's own aspect-ratio toggle (`16:9` or `9:16`) and confirm `Automatically enhance my image prompt` is **OFF**.
5. **Mouth-Lock Protocol (For Third-Person Voiceover / Non-LipSync):**
   - Establish a single sealed closed-lip smile at frame 0 (`lips, jaw, chin, cheeks remain still`) and route all emotion through eyes, eyebrows, head tilt, posture, and hands.
6. **5-Slot Queue & BunnyCDN `mediaPath` Sync Latency Guard:**
   - Respect the 5-concurrent-video limit (`/ai/api/status/<uuid>`) and wait until both `status === 'completed'` / `'SUCCEEDED'` **and** `mediaPath` (`https://cdn-ny-b.videoexpress.ai/video/<fileName>.mp4`) is non-null and `> 1 MB` before downloading or inserting.
7. **Atomic Dropzone Delivery (When Using YUploader):**
   - Write **1. Thumbnail (`.jpg`) FIRST** → **2. Master Video (`.mp4`) SECOND** → **3. Metadata (`.md`) LAST**.
