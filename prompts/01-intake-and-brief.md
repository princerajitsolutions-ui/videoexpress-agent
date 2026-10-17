# Module 01: Interactive Intake & Production Brief

Before generating any assets or consuming account credits, the agent executes a structured **Phase 0 Intake** to capture the user's exact production specifications. If the user's initial prompt already specifies some parameters, retain them and ask only for the missing choices in a single consolidated intake prompt.

---

## 1. The 6 Core Intake Dimensions

When starting a new video project, collect or confirm the following parameters:

### A. Video Type / Narrative Format
Ask the user what kind of video they are producing:
1. **Narrated Story / Fable** *(Default)* — Character-driven narrative with beginning, escalating conflict/turn, and satisfying resolution.
2. **YouTube Short / Instagram Reel / TikTok** — Fast-paced vertical narrative with a 3-second scroll-stopping hook, escalating beats, and a seamless loop back to Scene 1.
3. **Explainer / Documentary / Educational** — Visual metaphors, step-by-step discovery, and authoritative narration.
4. **Comedy / Satire Skit** — Character contrast, escalating physical/situational comedy, and a punchline reaction payoff.

### B. Visual Style (`select-type`)
Offer the supported multi-style aesthetics and lock the chosen style across 100% of references, source images, and video clips:
1. **2D Stickman** *(Classic Story Default)* — Crisp ink contours, matte cel colors, circular white head, expressive drawn eyes/eyebrows, two thin black arms/hands and two thin black legs/feet. Every visible human (including background people) must be a 2D stickman.
2. **3D Pixar / 3D Animated Feature** — Subsurface scattering, tactile fabric/fur/metal textures, soft volumetric rim lighting, and expressive animated eyes/eyebrows.
3. **Photorealistic / Cinematic** — Natural optical depth of field, authentic lens physics (35mm/50mm/85mm macro), realistic skin and surface textures, zero cartoon/3D contamination.
4. **2D Illustration / 2D Anime** — Clean cel shading, layered atmospheric painted backgrounds, dynamic linework.
5. **Claymation / Stop-Motion** — Hand-sculpted plasticine textures, warm miniature studio tabletop lighting, tactile handcrafted depth.

### C. Aspect Ratio (Project-Wide Invariant)
Offer only the two supported broadcast ratios (never offer `1:1`):
- **Landscape (`16:9`)** *(Default for Widescreen Stories)* — `1920x1080` video canvas, `3840x2160` 4K thumbnail.
- **Vertical (`9:16`)** *(Default for Shorts / Reels)* — `1080x1920` video canvas and cover thumbnail.

> **Ratio Invariant Rule:** Once selected, the aspect ratio is locked across the VideoExpress project bar, the `Create Video From Prompt` modal ratio toggle (which must be checked before *every* `Create Image` click because rerenders can reset it to `9:16`), all reference photos, timeline tracks, and final exports.

### D. Target Length / Runtime
Ask for the desired duration or scene count:
- **Short (`15s–30s`)** — ~4 to 6 connected scenes (ideal for punchy Shorts/hooks).
- **Standard (`45s–60s`)** — ~9 to 12 connected scenes (ideal for full Shorts or concise stories).
- **Extended Story (`75s–120s+`)** — ~15 to 22 connected scenes (multi-act storytelling).
- **Story-Driven / Auto** *(Default when unspecified)* — Plans enough 3–5 second natural beats to tell a complete, unhurried story without padding or filler.

### E. Script Input Mode: Just Title & Context vs. Full Script
Explicitly ask how the user wants to supply the story:
- **Option 1: Just Title & Context / Idea**
  - User provides a title, topic, or brief premise (e.g., *"The Cat Knight & The Crimson Demon — a brave armored cat battling a laser pointer in a sunlit castle"*).
  - The agent autonomously writes the multi-act arc, fresh protagonist identity, fixed location layouts, and connected 3–5s per-scene narration lines.
- **Option 2: Full Script / Scene Breakdown Provided**
  - User provides their exact narration script or scene list.
  - The agent preserves the user's wording, segments the script into timed 3–6s visual beats, verifies that each spoken line fits within `shot_duration - 0.6s` breath padding, and constructs the visual continuity handoff table around the script.

### F. Audio, Voice & Assembly Pipeline
Confirm the voice and audio production route:
- **Route 1: In-App VideoExpress Integrated Narration** *(Default Browser Route)*
  - Uses `Narration Video (Choose my Audio)` ON → `Create Video` → `CloneVoice` → `System Voice` → **`Beau Whitaker`** (default, or user's chosen system/authorized cloned voice) → `Import Speech` → `Create Narration Video` → `Add to Timeline` → `Auto Align Clips` → `Export Video`.
- **Route 2: Studio Mastered Hybrid Route (FFmpeg + Dynamic BGM + Dropzone)**
  - Generates **Mouth-Locked** (`Video Only`) clips in VideoExpress, downloads raw `.mp4` clips from BunnyCDN, synthesizes continuous single-narrator or multi-character speech (`Highpass @ 100Hz`, `+3.5dB @ 3kHz` presence boost, normalized to `-14 LUFS`), mixes genre-matched cinematic BGM with dynamic sidechain ducking (`-20dB` to `-24dB` under speech), renders a 4K/Vertical High-CTR Cover Thumbnail, and delivers atomically to the YUploader dropzone.

---

## 2. Consolidating the Intake Prompt

If the user starts with a bare request (e.g., *"Create a video"* or *"Make a story about a boy with a tangled mind"*), present a single clean intake prompt covering any missing items:

```markdown
To set up your VideoExpress production run, please confirm your preferences (or reply **Defaults** to use the recommended settings):

1. **Video Type:** Narrated Story (Default) | YouTube Short / Reel | Explainer / Documentary | Comedy Skit
2. **Visual Style:** 2D Stickman (Default) | 3D Pixar | Photorealistic | 2D Anime / Illustration | Claymation
3. **Aspect Ratio:** Landscape 16:9 (Default) | Vertical 9:16
4. **Target Length:** Short (15–30s) | Standard (45–60s) | Extended (75–120s) | Auto Story-Driven (Default)
5. **Input Mode:**
   - **Just Title & Context:** Give me a title/topic and brief notes, and I'll write the full script & storyboard.
   - **Full Script:** Paste your script and I'll map each line to continuous visual beats.
6. **Audio & Voice Route:** In-App CloneVoice (`Beau Whitaker` default) | Studio Mastered FFmpeg (Voice + Sidechain BGM + 4K Thumbnail)
```

---

## 3. Pre-Execution Production Brief & Single-Checkpoint Authorization

Once intake is complete:
1. Build the **Production Brief** internally (or display a concise summary when requested) locking:
   - **Project Title & Export Filename**
   - **Video Type, Visual Style & Aspect Ratio (`16:9` or `9:16`)**
   - **Protagonist Master Identity DNA** (fresh story-specific name—never automatically reuse "Milo"—plus anatomy, face, wardrobe, footwear, and proportions)
   - **Recurring Location Layouts** (camera side, left/center/right landmarks)
   - **Planned Scene Count ($N$), Target Duration, and Audio Route**
2. **Single-Scope Authorization:** A user request to produce the video (or a single `GO` confirmation after intake) authorizes the entire routine production run:
   - Creating the Master Character Reference (`Reference Photo 1`) and Environment References (`Reference Photo 2`);
   - Generating scene source images, repairing defective candidates (up to 3 attempts), generating narration, and submitting up to 5 concurrent video jobs at a time;
   - Assembling on the timeline, running `Auto Align Clips` (or local FFmpeg 0px mastering), saving the project, and exporting the final MP4.
3. **Out-of-Scope Actions (Always Pause & Ask):**
   - Purchasing credits, upgrading plans, or accepting new paid terms;
   - Deleting existing saved projects or unrelated library assets;
   - Publishing to public galleries or external accounts not specified in the workflow;
   - Solving CAPTCHAs or entering account passwords.
