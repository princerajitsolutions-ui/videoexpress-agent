# Module 02: Story Architecture, Multi-Style Art Direction & Continuity Ledger

This module governs how the agent transforms either **Just Title & Context** or a **Full Script** into a visually continuous, zero-drift storyboard and motion sequence.

---

## 1. Script Construction & Beat Calibration

### Mode A: From Title & Context (Autonomous Scriptwriting)
- **Choose a Fresh Protagonist Name:** Select a name suited to the story's setting and tone (e.g., *Sir Whiskers*, *Leo*, *Finn*, *Aria*). Do not automatically reuse *Milo* unless requested.
- **Narrative Arc:**
  - **YouTube Shorts / Reels (9:16):** 0–3s scroll-stopping visual/verbal hook → escalating complication beats → climax payoff → final frame designed to loop seamlessly back into Scene 1.
  - **Narrated Story / Fable (16:9 or 9:16):** Clear establishing state → rising development → memorable emotional or comedic turn → cohesive resolution.
- **Beat Pacing (3–5s Rule):** Write one concise, natural spoken sentence per scene targeting **3 to 5 seconds** of speech. Never include scene numbers, timestamps, or stage directions inside the spoken TTS text.

### Mode B: From Full User Script (Beat Segmentation & Breath Calibration)
- Preserve the user's narrative voice and storyline.
- Break long paragraphs into individual **one-action visual beats** (1 sentence per clip, ~3–6 seconds each).
- **Breath Padding Rule (`0.6s` Margin):** Every scene's spoken line must finish at least **`0.6s` before the end of the video clip** (`audio_dur <= clip_dur - 0.6s`) with a `0.15s` lead-in margin so speech never clips at cuts or overlaps across transitions.

---

## 2. Multi-Style Art Direction & Purity Rules

Every asset in a run (Master Character Reference, Environment References, Scene Source Images, and Video Motion Prompts) must strictly use the single Visual Style chosen during Intake. **Never mix styles within a run.**

| Style Option | VideoExpress `select-type` | Mandatory Visual DNA & Prompt Rules |
| :--- | :--- | :--- |
| **2D Stickman** | `2D` (`2d`) | White circular head, expressive drawn eyes and eyebrows, clean outlined costume, **exactly two separate thin black arms with black hands, two thin black legs with clearly separated shoes**, crisp ink contours, flat matte cel colors, simple drawn shadows. **Every human in frame (including background crowds) must be a 2D stickman—never mix realistic humans.** |
| **3D Pixar / 3D Animated** | `3D` (`3d`) | Stylized 3D animated feature proportions, subsurface skin/fur scattering, tactile fabric weave and material reflections, soft volumetric rim lighting, ambient occlusion contact shadows, expressive animated eyes and brow rigging. |
| **Photorealistic** | `Photorealistic` (`photorealistic`) | Authentic optical lens physics (e.g., 35mm f/1.8 or 85mm macro), natural skin pores and material micro-textures, physically accurate global illumination, zero 3D/cartoon/illustrated artifacts. |
| **2D Illustration / Anime** | `2D` (`2d`) | Layered cel shading, expressive ink linework, rich painted atmospheric backgrounds, distinct foreground/midground/background parallax depth. |
| **Claymation** | `3D` (`3d`) | Handcrafted stop-motion plasticine clay material, subtle fingerprint surface micro-texture, warm miniature tabletop studio lighting, shallow depth of field. |

---

## 3. Master Character & Fixed Location References

### 3.1 Standalone Master Character (`Reference Photo 1`)
Before generating **any** story scene (including Scene 1):
1. Generate a standalone **Master Character Reference** showing **one full-body protagonist alone on a plain neutral studio background** in a relaxed three-quarter standing pose, both empty hands separated from the torso, and both feet fully visible.
2. Do **not** include story props, other characters, or complex scenery in the Master Character image.
3. Inspect anatomy, proportions, facial features, and wardrobe. Save to `My AI Images` as **`<Project Title> — Master Character`** and record its asset ID.
4. Enable **Consistent Character** and assign this exact saved image to **`Reference Photo 1`** for **every scene (`1..N`)**. Never replace `Reference Photo 1` with a scene image or a previous video's last frame.

### 3.2 Fixed Set Layouts & Environment References (`Reference Photo 2`)
For every recurring location:
1. Define a **Fixed Set Layout** before rendering any scene at that location:
   - Lock the **Camera Side** of the action axis (e.g., *South side looking North*).
   - Assign fixed screen zones (`LEFT`, `CENTER`, `RIGHT`, `FOREGROUND`, `BACKGROUND`) to every landmark, doorway, piece of furniture, barrier, or tree.
   - Repeat this exact spatial layout in every image and motion prompt at that location so fixtures never swap sides or mirror across cuts.
2. When supported by the active UI, generate a standalone **Environment Reference** (the set *without* the protagonist) and attach it as **`Reference Photo 2`** while keeping the Master Character in **`Reference Photo 1`**.

---

## 4. Full-Sequence Action & Continuity Ledger

Before generating Scene 1's image, plan the **entire video** as one connected chain of physical states using the Continuity Ledger:

| Scene | Narration | Incoming State (Source Frame) | Persistent Subjects & Exact Counts | Principal New Action | Outgoing State (Endpoint) | Next Scene Handoff | Camera & Interaction Axis |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

### Core Continuity Invariants
1. **Outgoing State $N$ = Incoming State $N+1$:**
   - Scene $N+1$'s source image must depict the **exact physical state** where Scene $N$ ended (posture, location, occupied hands, wet/dry clothing, open/closed props).
   - Never reset the character to the Master Reference's neutral front-facing standing pose between connected beats, and never repeat an already-completed approach, reach, or greeting.
2. **Source Frame Shows Incoming State, Not Completed Action:**
   - If Scene 6 animates opening an umbrella, Scene 6's source image must show the umbrella **tightly folded as a narrow shaft**—never already open. Use concrete positive geometry (*"one tightly folded blue shaft held horizontally across the waist"*) rather than negative phrasing (*"not open"*).
3. **Interaction Axis & Eyeline Gate:**
   - Stage interacting characters in side-on or three-quarter two-shots facing each other across a readable depth plane (e.g., Protagonist `LEFT` facing `RIGHT`, Target `RIGHT` facing `LEFT`).
   - Reject source images where the protagonist stares directly into the camera lens (unless the script explicitly calls for a fourth-wall break) or where the interaction target is behind the protagonist's back.
4. **Strict Subject & Prop Inventory:**
   - Explicitly count every person, animal, plant, and story prop required in the frame (e.g., *1 protagonist, 1 orange cat, 1 folded blue umbrella*).
   - Reject candidates with duplicate props, phantom background limbs, or unannounced extra plants/objects.

---

## 5. Image Prompt Structure (10 Mandatory Elements)

Every scene image prompt must concretely specify:
1. **Scene ID, Aspect Ratio (`16:9` or `9:16`), Visual Style, and Exact Narrated Moment.**
2. **Character Identity, Count, Style-Specific Anatomy, Wardrobe, Expression, and Grounded Incoming Pose.**
3. **Screen Position (`LEFT`/`CENTER`/`RIGHT`), Body Facing, Gaze Target, and Spatial Relationship.**
4. **Prop Inventory:** Exact count, color, material, ownership, and hand/surface contact points.
5. **Depth Layering:** Distinct foreground, middle ground, and background elements.
6. **Fixed Location Landmarks** and travel direction.
7. **Camera Framing:** Shot size, camera height/angle, headroom, and movement space.
8. **Lighting & Atmosphere:** Time of day, key light direction, contact shadows, and surface texture.
9. **Action Readiness:** Clear room in frame for the planned motion to unfold.
10. **Continuity Lock:** Explicit handoff alignment with Scene $N-1$'s outgoing state.

---

## 6. Video Motion Prompt Rules & Mouth-Lock Protocol

### 6.1 Standard One-Paragraph Motion Prompt (In-App Narration Route)
- Write **one present-tense paragraph** containing visual and camera motion only (never put spoken dialogue, scene headers, brackets, or timestamps in the motion field).
- Lead with **Shot Framing & Camera Behavior**, then structure the physical progression using **`Initially..., then..., finally...`**:
  > *Example:* `Wide side-on 2D shot, the camera tracks slowly parallel to the shoreline until Finn and a spiral shell beside his right foot fill the frame. Initially Finn stands ankle-deep facing screen right with his yellow beach bag on dry sand behind him, then a gentle wave curls around his sandals and he lifts one heel, finally he relaxes with a warm smile as the water retreats and looks down at the shell. The lifeguard tower remains far left, umbrellas stay behind the dune, and the ocean extends right.`

### 6.2 Mouth-Locked Motion Prompt Protocol (Voiceover / Non-LipSync / Studio Hybrid Route)
Whenever narration is third-person voiceover or overlaid music/narration where characters should **not** exhibit uncanny random lip-flap:
- Establish a **single sealed closed-lip expression at the very beginning** and route all emotional expression into **eyes, eyebrows, head tilt, posture, and hands**:
  ```text
  Scene [N], [16:9 landscape / 9:16 vertical] ratio, [Visual Style]. Single continuous shot. At the very beginning, [Character Name] gently brings lips together into a small closed-lip smile, then holds that expression perfectly unchanged for the remainder of the clip. The lips stay sealed; the jaw, chin, cheeks, and lower face remain still, with no speaking, lip-sync, mouth opening, or visible teeth. Wearing [locked wardrobe], initially [incoming state & pose], then [one principal physical action], finally [outgoing state]. [Emotion] is expressed only through [eyes, eyebrow gestures, head movement, and body/hand posture]. [Fixed location landmarks and lighting]. [Shot framing and camera movement].
  ```
- Verify all 5 `mouth_lock_check` gates before submitting:
  1. Opening closed-lip smile established once at frame 0.
  2. Lower face (`lips, jaw, chin, cheeks`) explicitly sealed.
  3. Zero speech/vocal verbs (`speaks`, `talks`, `shouts`, `sings`, `whispers`, `laughs open-mouthed`) in the motion prompt.
  4. Emotion routed exclusively through eyes, eyebrows, head, hands, and posture.
  5. No later sentence introduces a second conflicting mouth expression.
