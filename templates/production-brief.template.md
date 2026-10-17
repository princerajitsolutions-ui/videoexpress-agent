# Production Brief: {{PROJECT_TITLE}}

## 1. Intake & Configuration Summary
| Parameter | Selected Value |
| :--- | :--- |
| **Video Type** | {{VIDEO_TYPE}} *(e.g., Narrated Story / YouTube Short / Explainer / Comedy Skit)* |
| **Visual Style (`select-type`)** | {{VISUAL_STYLE}} *(e.g., 2D Stickman / 3D Pixar / Photorealistic / 2D Anime / Claymation)* |
| **Aspect Ratio (Locked)** | {{ASPECT_RATIO}} *(`16:9` Landscape or `9:16` Vertical)* |
| **Target Length & Scene Count** | {{TARGET_DURATION}} across **{{SCENE_COUNT}} scenes** (~3–5s per beat) |
| **Script Input Mode** | {{INPUT_MODE}} *(Mode A: Title & Context Autonomous Script | Mode B: User Full Script)* |
| **Audio & Assembly Route** | {{AUDIO_ROUTE}} *(Route A: In-App CloneVoice [`{{NARRATOR_VOICE}}`] | Route B: Studio FFmpeg + Sidechain BGM)* |
| **Mouth-Lock Protocol** | {{MOUTH_LOCK_STATUS}} *(ON for third-person voiceover / OFF only if explicit LipSync requested)* |

---

## 2. Protagonist Master Character DNA (`Reference Photo 1`)
- **Character Name:** {{PROTAGONIST_NAME}} *(Fresh story-specific name)*
- **Saved Asset Name:** `{{PROJECT_TITLE}} — Master Character`
- **Visual Medium & Anatomy:** {{STYLE_ANATOMY}} *(e.g., 2D stickman with circular white head, 2 thin black arms/hands, 2 thin black legs/shoes; OR 3D Pixar stylized character)*
- **Facial Features & Expression:** {{FACIAL_FEATURES}}
- **Locked Wardrobe & Footwear:** {{WARDROBE}}
- **Master Generation Prompt:**
  > {{MASTER_CHARACTER_PROMPT}}

---

## 3. Recurring Locations & Fixed Camera Layouts (`Reference Photo 2`)
| Location ID | Set Name | Camera Side / Axis | Left Landmarks | Center / Action Zone | Right Landmarks | Background / Lighting |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `LOC_01` | {{LOC_01_NAME}} | {{LOC_01_AXIS}} | {{LOC_01_LEFT}} | {{LOC_01_CENTER}} | {{LOC_01_RIGHT}} | {{LOC_01_BG}} |
| `LOC_02` | {{LOC_02_NAME}} | {{LOC_02_AXIS}} | {{LOC_02_LEFT}} | {{LOC_02_CENTER}} | {{LOC_02_RIGHT}} | {{LOC_02_BG}} |

---

## 4. Narrative Arc Overview
- **Hook / Opening (Scenes 1–{{HOOK_END}}):** {{ARC_BEGINNING}}
- **Development / Escalation (Scenes {{DEV_START}}–{{DEV_END}}):** {{ARC_DEVELOPMENT}}
- **Climax / Memorable Turn (Scenes {{TURN_START}}–{{TURN_END}}):** {{ARC_TURN}}
- **Resolution / Ending (Scenes {{END_START}}–{{SCENE_COUNT}}):** {{ARC_ENDING}}
