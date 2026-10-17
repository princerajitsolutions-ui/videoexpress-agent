# Module 01: Interactive Intake & Production Brief

When the user says **"Create a VideoExpress Video"** or **"Use VideoExpress Agent"**, execute a structured **Phase 0 Intake** before generating any assets or spending credits. If the user's initial prompt already specifies some parameters, retain them and ask only for the missing choices in one consolidated question.

---

## 1. The 6 Core Intake Dimensions

### A. Video Type (Narrative Genre)
Ask what kind of video story or topic they want to create:
1. **Narrated Story / Fable** *(Default)* — Character-driven narrative with beginning, escalating conflict/turn, and satisfying resolution.
2. **Explainer / Documentary** — Clear visual metaphors, step-by-step discovery, and authoritative narration.
3. **Comedy / Satire** — Character contrast, escalating physical/situational comedy, and a punchline reaction payoff.
4. **Adventure / Action** — Dynamic physical progression across connected environments (hiking, exploring, quests).
5. **Educational / Lesson** — Structured concept breakdown with memorable visual demonstrations.

### B. Aspect Ratio (Determines Standard Widescreen Video vs. Vertical Short)
Whether the production is a **normal widescreen video** or a **vertical Short/Reel** is determined strictly by the chosen **Aspect Ratio** (never offer `1:1`):
1. **Landscape (`16:9`) — Standard Widescreen Video** *(Default)*
   - `1920x1080` Full HD canvas + `3840x2160` 4K thumbnail.
   - Paced for standard YouTube / desktop viewing with natural narrative breathing room.
2. **Vertical (`9:16`) — Short / Reel / TikTok**
   - `1080x1920` vertical canvas + `1080x1920` vertical cover frame.
   - Automatically enables vertical framing rules, a 3-second scroll-stopping opening hook, and an optional loopable final beat.

> **Ratio Invariant Rule:** Once selected, the aspect ratio is locked across the VideoExpress project bar, the `Create Video From Prompt` modal ratio toggle (which must be checked before *every* `Create Image` click because rerenders can reset it to `9:16`), all reference photos, timeline tracks, and final exports.

### C. Visual Style (`select-type`)
Offer the supported multi-style aesthetics and lock the chosen style across 100% of references, source images, and video clips:
1. **2D Stickman** *(Classic Default)* — Crisp ink contours, matte cel colors, circular white head, expressive drawn eyes/eyebrows, two thin black arms/hands and two thin black legs/feet. Every visible human (including background people) must be a 2D stickman.
2. **3D Pixar / 3D Animated Feature** — Subsurface scattering, tactile fabric/fur/metal textures, soft volumetric rim lighting, and expressive animated eyes/eyebrows.
3. **Photorealistic / Cinematic** — Natural optical depth of field, authentic lens physics (35mm/50mm/85mm macro), realistic skin and surface textures, zero cartoon/3D contamination.
4. **2D Illustration / 2D Anime** — Clean cel shading, layered atmospheric painted backgrounds, dynamic linework.
5. **Claymation / Stop-Motion** — Hand-sculpted plasticine textures, warm miniature studio tabletop lighting, tactile handcrafted depth.

### D. Target Length / Runtime
Ask for the desired duration or scene count:
- **Concise (`~30s` | ~6–8 scenes)**
- **Standard (`~45–60s` | ~9–12 scenes)**
- **Extended (`~75–120s+` | ~15–22 scenes)**
- **Story-Driven / Auto** *(Default when unspecified)* — Plans enough 3–5 second natural beats to tell a complete, unhurried story without padding or filler.

### E. Script Input Mode: Just Title & Context vs. Full Script
Explicitly ask how the user wants to supply the story:
- **Mode A: Just Title & Context / Idea**
  - User provides a title, topic, or brief premise (e.g., *"The Cat Knight & The Crimson Demon — a brave armored cat battling a laser pointer in a sunlit castle"*).
  - The agent autonomously writes the multi-act arc, fresh protagonist identity, fixed location layouts, and connected 3–5s per-scene narration lines.
- **Mode B: Full Script / Scene Breakdown Provided**
  - User provides their exact narration script or scene list.
  - The agent preserves the user's wording, segments the script into timed 3–6s visual beats, verifies that each spoken line fits within `shot_duration - 0.6s` breath padding, and constructs the visual continuity handoff table around the script.

### F. Audio, Voice & Assembly Pipeline
Confirm the voice and audio production route:
- **Route A: In-App VideoExpress Integrated Narration** *(Default Browser Route)*
  - Uses `Narration Video (Choose my Audio)` ON → `Create Video` → `CloneVoice` → `System Voice` → **`Beau Whitaker`** (default, or user's chosen system/authorized cloned voice) → `Import Speech` → `Create Narration Video` → `Add to Timeline` → `Auto Align Clips` → `Export Video`.
- **Route B: Studio Mastered Hybrid Route (FFmpeg + Dynamic BGM + Dropzone)**
  - Generates **Mouth-Locked** (`Video Only`) clips in VideoExpress, downloads raw `.mp4` clips from BunnyCDN, synthesizes continuous single-narrator or multi-character speech (`Highpass @ 100Hz`, `+3.5dB @ 3kHz` presence boost, normalized to `-14 LUFS`), mixes genre-matched cinematic BGM with dynamic sidechain ducking (`-20dB` to `-24dB` under speech), renders a 4K/Vertical High-CTR Cover Thumbnail, and delivers atomically to the YUploader dropzone.

---

## 2. Consolidating the Intake Prompt

When the user says **"Create a VideoExpress Video"** or **"Use VideoExpress Agent"** without full parameters, ask once using `ask_question` or this concise prompt:

```markdown
To set up your VideoExpress video, please confirm your preferences (or reply **Defaults**):

1. **Video Type:** Narrated Story / Fable (Default) | Explainer / Documentary | Comedy / Satire | Adventure | Educational
2. **Aspect Ratio (Format):** Landscape 16:9 — Standard Video (Default) | Vertical 9:16 — Short / Reel
3. **Visual Style:** 2D Stickman (Default) | 3D Pixar | Photorealistic | 2D Anime / Illustration | Claymation
4. **Target Length:** ~30s | ~45–60s | ~75–120s+ | Auto Story-Driven (Default)
5. **Input Mode:**
   - **Just Title & Context:** Give me a title/topic and brief notes, and I'll write the full script & storyboard.
   - **Full Script:** Paste your script and I'll map each line to continuous visual beats.
6. **Audio & Voice Route:** Route A: In-App CloneVoice (`Beau Whitaker` default) | Route B: Studio Mastered FFmpeg (Voice + Sidechain BGM + Thumbnail)
```
