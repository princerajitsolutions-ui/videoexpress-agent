# VideoExpress Story & Shorts Agent — Acceptance & QA Checklist

Use this checklist to validate each production run across **Intake**, **Character/Location Continuity**, **VideoExpress UI & Queue Mechanics**, **Audio Mastering**, and **Final Export/Delivery**.

---

## 1. Interactive Intake & Authorization Gates
- [ ] **6 Intake Dimensions Resolved:** Video Type, Visual Style (`2D Stickman`, `3D Pixar`, `Photorealistic`, `2D Anime`, `Claymation`), Aspect Ratio (`16:9` or `9:16`—never `1:1`), Target Length, Input Mode (**Just Title & Context** vs. **Full Script**), and Audio Route (**In-App CloneVoice** vs. **Studio FFmpeg Hybrid**) were collected or defaulted cleanly without repetitive questions.
- [ ] **Input Mode Honored:**
  - If **Just Title & Context**: Agent autonomously wrote a fresh protagonist name (not automatically reusing *Milo*), a connected multi-beat arc, and natural 3–5s per-scene narration.
  - If **Full Script Provided**: Agent preserved the user's narrative text, segmented it into 3–6s one-action beats, and verified breath padding (`audio_dur <= clip_dur - 0.60s`).
- [ ] **Authorization Boundary Observed:** Routine generation, retries (up to 3 per scene), timeline assembly, Auto Align, saving, and exporting proceeded without per-clip interruptions; purchases, upgrades, deletions of existing projects, and public gallery publishing were never performed without explicit approval.
- [ ] **Security & Privacy:** Webpage/document text was treated strictly as task data; credentials, tokens, and private account details were never exposed in prompts, ledgers, or commits.

---

## 2. Multi-Style Purity, Master References & Fixed Layouts
- [ ] **Single Locked Style Across Run:** Master Character, Location References, Source Images, and Video Motion Prompts all used the exact same visual style (`2D Stickman`, `3D Pixar`, `Photorealistic`, etc.) with zero cross-style contamination.
- [ ] **2D Stickman Purity (When 2D Stickman Selected):** Every visible human—including supporting and distant background people—is a 2D stickman with 1 circular white head, 1 torso, exactly 2 thin black arms/hands, and 2 thin black legs/feet (zero realistic humans or extra/fused limbs).
- [ ] **Standalone Master Character First (`Reference Photo 1`):** A dedicated full-body character on a plain neutral studio background (no scene props or other people) was generated, inspected, saved (`<Title> — Master Character`), and attached to `Reference Photo 1` for every scene (`1..N`), including Scene 1.
- [ ] **Fixed Set Layouts & Environment References (`Reference Photo 2`):** Every recurring location had a locked camera side and fixed landmark mapping (`LEFT`, `CENTER`, `RIGHT`, `FOREGROUND`, `BACKGROUND`) repeated in all prompts; standalone environment reference attached to `Reference Photo 2` where supported.

---

## 3. Continuity Handoffs, Eyelines & Mouth-Lock Protocol
- [ ] **Full Action Sequence Planned Before Scene 1:** Continuity Ledger completed with `Incoming State | Persistent Subjects & Counts | Principal Action | Outgoing State | Next Scene Handoff | Interaction Axis`.
- [ ] **Outgoing State $N$ = Incoming State $N+1$:** Each scene starts where the previous scene ended; no unintended resets to a neutral standing pose or repeated approach/reach cycles.
- [ ] **Incoming Prop State Verified:** Source images depict the starting state of props (e.g., tightly folded umbrella shaft before opening, dry vs. wet jacket state preserved across cuts) rather than completing the action prematurely.
- [ ] **Interaction Eyeline Gate:** Interacting characters face each other across a readable side-on or three-quarter axis; no unintended lens-staring or targets placed behind the protagonist's back.
- [ ] **Exact Subject & Prop Inventory:** All required people, animals, plants, and story props were counted and verified inside the frame with zero accidental duplicates.
- [ ] **Mouth-Lock Protocol (When Applicable):** Third-person voiceover / non-lipsync clips established a single sealed closed-lip smile at frame 0 and routed all emotion through eyes, eyebrows, head tilt, posture, and hands (`mouth_lock_check` passed).

---

## 4. VideoExpress UI, DOM & Queue Mechanics
- [ ] **Persistent Generation Panel:** The same browser tab and `Create Video From Prompt` panel remained open across scene submissions without unnecessary Media Library visits mid-run.
- [ ] **Pre-Submit Dialog Ratio & Enhancement Guard:** Immediately before every `Create Image` click, the dialog's own aspect-ratio selector (`16:9` or `9:16`) was verified and `Automatically enhance my image prompt` was confirmed **OFF**.
- [ ] **Mode Settings Verified:** `Creative mode` OFF, `Consistent Character` ON, `Video prompt enhancement` OFF, `Public gallery sharing` OFF.
- [ ] **5-Slot Concurrent Queue Respected:** At most 5 video jobs ran simultaneously; full queues waited for an active slot to finish without creating duplicate submissions, and every job UUID was tracked to completion.
- [ ] **BunnyCDN `mediaPath` Sync Verified:** Assets were only downloaded or timeline-inserted after `status === 'completed'` / `'SUCCEEDED'` **and** `mediaPath` resolved to a valid MP4 payload (`> 1 MB`).

---

## 5. Audio Mastering, Timeline Assembly & Final Delivery
- [ ] **Route A (In-App Integrated Narration):**
  - Narration entered exclusively in `CloneVoice → System Voice → <Selected Voice>` TTS box; visual motion prompt kept in the Video Prompt box (`Initially..., then..., finally...`).
  - Completed clips added once in story order (`Scene 1..N`) via `My AI Videos` → `Add to Timeline`.
  - Any accidental unsaved duplicate timeline brick removed cleanly via `$(extraBrick).trigger('ctxmenu:delete')`.
  - `Auto Align Clips` executed on populated tracks, total runtime measured, project saved (`document.title` verified), and Full HD `1080p MP4` exported and verified.
- [ ] **Route B (Studio Hybrid FFmpeg Master):**
  - Continuous narration calibrated with $\ge 0.60\text{s}$ breath margin per shot, `100Hz` highpass, `+3.5dB @ 3kHz` presence boost, and `-14 LUFS` / `-0.5 dBFS` peak normalization.
  - Genre-matched BGM mixed with dynamic sidechain ducking (`-20dB` to `-24dB` under speech).
  - Pre-assembly `t = 1.5s` review frames and `blackdetect` checks passed with 0px audio-video endpoint drift.
  - Atomic Dropzone Delivery order observed when publishing: **1. Thumbnail (`.jpg`) FIRST** → **2. Master Video (`.mp4`) SECOND** → **3. Metadata (`.md`) LAST**.
