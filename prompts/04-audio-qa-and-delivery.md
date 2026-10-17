# Module 04: Audio Mastering, Quality Assurance & Final Delivery

This module defines the two supported audio/assembly routes (**Route A: In-App Integrated CloneVoice** and **Route B: Studio Mastered Hybrid FFmpeg Pipeline**), pre-assembly visual QA gates, and final export/dropzone delivery protocols.

---

## 1. Route A: In-App VideoExpress Integrated Narration & Export

When executing the standard browser-only route inside VideoExpress:
1. **Per-Scene Integrated TTS:**
   - Generate speech inside the `Create Video` → `CloneVoice` → `System Voice` dialog (defaulting to **`Beau Whitaker`** unless the user chose another system voice or provided speaker consent for a cloned voice).
   - Keep narration strictly inside the TTS field; keep visual motion strictly inside the Video Prompt field.
   - Defer detailed listening and visual playback until the single final review pass after all scenes are assembled.
2. **Final Pass Review & Export:**
   - After assembling scenes `1..N` in order and running **`Auto Align Clips`**, measure the total assembled timeline duration and verify it against any explicit user-requested runtime.
   - Save the project and verify save completion.
   - Click **`Export Video`** → select **`MP4`**, **`Full HD / 1080p`**, and **`High`** quality (using the highest tier included in the active account without purchasing an upgrade) in the locked aspect ratio (`16:9` or `9:16`).
   - Track the export job in `My Videos` / `/api/get_list_output` until completion, download when supported, and verify that the exported file exists and opens cleanly.

---

## 2. Route B: Studio Mastered Hybrid Pipeline (FFmpeg + Dynamic Sidechain BGM)

When producing broadcast-grade Shorts, Reels, or Widescreen Storybooks using local FFmpeg mastering (`scripts/studio_audio_assembler.py`):

### 2.1 Continuous Narration Calibration (`0.6s` Breath Margin)
1. **Zero Drop-Off Rule:** Spoken narration or character dialogue must be evenly distributed across **every single scene (`1..N`)** from `0:00` to the final second so viewer retention never drops during dead air.
2. **Per-Shot Speech Calibration:**
   - Measure each downloaded raw video clip's exact duration ($D_i$) via `ffprobe`.
   - Synthesize each scene's spoken line (`CloneVoice` or `Edge-TTS`, e.g., `en-US-ChristopherNeural`) and verify:
     $$\text{audio\_dur}_i \le D_i - 0.60\text{ s}$$
   - If a line exceeds $D_i - 0.60\text{ s}$, step speech rate progressively (`+0%` → `+6%` → `+12%` → `+18%`) or tighten the phrasing so every shot has a `0.15s` lead-in and at least `0.45s` of clean trailing breath before the cut.
3. **Vocal Presence & Loudness Mastering:**
   - Apply a `100 Hz` highpass filter to remove rumble, a `+3.5 dB` presence boost at `3.0 kHz` (`w=1.2`) for vocal clarity, and normalize peak/loudness to **`-14 LUFS` (`-0.5 dBFS` peak limiter)**.

### 2.2 Genre-Matched BGM & Dynamic Sidechain Ducking
Select or synthesize an instrumental background score matched to the story's genre:
- **Fable / Storybook / Fantasy:** Warm cinematic orchestral strings & woodwinds
- **Food / Science / Explainer:** Upbeat modern dynamic beat (`120–128 BPM`)
- **Mystery / Heist / Adventure:** Sneaky pizzicato strings & stealth bassline
- **Comedy / Satire Skit:** Bouncy acoustic brass & playful woodwinds
- **Bedtime / Calm / Nature:** Gentle kalimba, ambient piano & acoustic guitar

**FFmpeg Sidechain Ducking Filter Complex:**
BGM baseline volume is set to `0.22–0.28` (`-13 dBFS`) and dynamically ducks down to **`-20 dB` to `-24 dB`** whenever narration is active, rising smoothly during pauses and action transitions:
```bash
ffmpeg -y -i master_dialogue.wav -i bgm_track.mp3 \
  -filter_complex "\
    [1:a]aloop=loop=-1:size=2e+09,atrim=0:${TOTAL_DUR},volume=0.22[bgm_raw]; \
    [bgm_raw][0:a]sidechaincompress=threshold=0.03:ratio=10:attack=20:release=300[ducked_bgm]; \
    [ducked_bgm][0:a]amix=inputs=2:normalize=0,alimiter=limit=0.98[master_out]" \
  -map "[master_out]" -t "${TOTAL_DUR}" master_cinematic_mix.wav
```

---

## 3. Pre-Assembly Visual Quality & Style Contamination Audit

Before final timeline export or FFmpeg concatenation:
1. **Binary & Black-Frame Integrity:**
   - Verify every downloaded clip is `> 1 MB` and free of black-frame render dropouts (`ffmpeg -i scene_XX.mp4 -vf blackdetect=d=0.1:pix_th=0.10 -f null -`).
2. **Mid-Clip Review Frame Extraction (`t = 1.5s`):**
   - Extract a verification frame from each rendered clip:
     ```bash
     ffmpeg -y -ss 00:00:01.5 -i shots/shot_01.mp4 -vframes 1 review_frames/shot_01.jpg
     ```
   - Inspect frames to confirm:
     - **Zero Style Contamination** (e.g., no realistic humans in a 2D stickman video; no 3D cartoon leaks in a photorealistic video);
     - **Anatomical Integrity** (1 head, 1 torso, 2 arms/hands, 2 legs/feet; no extra limbs or duplicate props);
     - **Fixed Landmark Continuity** (background fixtures remain on their locked screen sides).
   - Re-render any failed or contaminated clip (up to 3 total attempts per scene) before final assembly.

---

## 4. High-CTR Cover Thumbnail & Atomic Dropzone Delivery

When delivering finished packages to local disk or an automated publisher (`YUploader/dropzone`):
1. **Cover Thumbnail Generation:**
   - Render a high-contrast **4K (`3840x2160` for `16:9`)** or **Vertical (`1080x1920` for `9:16`)** cover thumbnail (`<Project Title>.jpg`) using either Artistly's `BETA Perfect Text in Image Designer` (FLUX) or a hero review frame composited with bold, high-contrast title typography.
2. **Atomic Delivery Order (Mandatory for Watchfolder Uploaders):**
   Always write files to the dropzone in this exact sequence so automated watchers never ingest a video without its custom thumbnail:
   - **Step 1:** Write Cover Thumbnail (`<Project Title>.jpg`) **FIRST**.
   - **Step 2:** Write Master Video (`<Project Title>.mp4`) **SECOND**.
   - **Step 3:** Write SEO Metadata (`<Project Title>.md` — Title, Description, Timestamps, Tags) **LAST**.
