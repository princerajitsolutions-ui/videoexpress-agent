# 🎬 VideoExpress Agent (`videoexpress-agent`)

An autonomous, modular production agent for **VideoExpress.ai** (`https://app.videoexpress.ai/`). Trigger it anytime by saying **"Create a VideoExpress Video"** or **"Use VideoExpress Agent"**.

Whether the output is a **Standard Widescreen Video (`16:9`)** or a **Vertical Short / Reel (`9:16`)** is determined directly by your **Aspect Ratio** choice during intake. Built from hands-on production experience across **2D Stickman**, **3D Pixar**, **Photorealistic**, **2D Anime**, and **Claymation** workflows, this repository enforces a **5-Layer Continuity System**, Backbone/jQuery DOM & 5-slot queue automation, and dual audio pipelines (**In-App CloneVoice TTS** + **Studio FFmpeg Sidechain Mastering**).

---

## 🏗️ Restructured Repository Hierarchy

```text
videoexpress-agent/
├── README.md                              # Architecture overview, intake guide, and quickstart
├── SKILL.md                               # Global Antigravity Skill definition ("Create a VideoExpress Video")
├── SYSTEM_PROMPT.md                       # Consolidated Master System Prompt (ready to load into any browser agent)
├── config/
│   ├── intake-schema.json                 # JSON Schema for the 6 interactive intake dimensions & defaults
│   └── prompt-book.schema.json            # JSON Schema for master references, fixed set layouts, continuity & mouth-lock
├── prompts/                               # Modular prompt specifications by production phase
│   ├── 01-intake-and-brief.md             # Phase 0: Interactive Intake (Video Type, Ratio [16:9 vs 9:16], Style, Length, Input Mode)
│   ├── 02-story-and-continuity.md         # Phase 1–2: 5-Layer Continuity, Multi-Style Art Direction, Master/Location Locks & Mouth-Lock
│   ├── 03-videoexpress-mechanics.md       # Phase 3–4: VideoExpress Modal DOM hooks, 5-slot Queue Poller & BunnyCDN Latency Guard
│   └── 04-audio-qa-and-delivery.md        # Phase 5–6: In-App CloneVoice vs Studio FFmpeg Sidechain BGM, Frame QA & Atomic Dropzone
├── scripts/                               # Battle-tested automation & post-production utilities
│   ├── ve_queue_worker.js                 # Browser 5-slot concurrent image2video queue worker & status poller
│   └── studio_audio_assembler.py          # Local FFmpeg 0px sync, -14 LUFS voice calibration, sidechain ducking & atomic delivery
├── templates/                             # Standardized markdown templates for runs
│   ├── production-brief.template.md       # Pre-execution Production Brief template
│   └── continuity-ledger.template.md      # Scene-by-scene Incoming -> Action -> Outgoing continuity & UUID ledger
├── evals/
│   └── acceptance-checklist.md            # End-to-end QA checklist covering Intake, 5-Layer Continuity, DOM Mechanics & Export
└── examples/
    ├── example-request-title-context.md   # Mode A: Just Title & Context -> Full autonomous story & storyboard
    ├── example-request-full-script.md     # Mode B: Full Script Provided -> Beat segmentation & 0.6s breath calibration
    ├── cat-knight-3d-pixar.md             # 20-shot 3D Pixar Widescreen story + sidechain orchestral audio example
    ├── continuous-cat-story.md            # Continuous action handoff storyboard example (Outgoing N = Incoming N+1)
    ├── beach-visit.md                     # 3D stylized coastal continuity & master character reference example
    ├── zoo-visit-2d.md                    # 14-clip 2D Stickman fixed-location layout & interaction axis example
    └── example-request.md                 # Classic quick-start request example
```

---

## 🎯 Phase 0: What the Agent Asks at Intake

When you say **"Create a VideoExpress Video"** or **"Use VideoExpress Agent"**, the agent checks which parameters you already provided and asks once for any missing choices:

| # | Dimension | Supported Options | Default (When Unspecified) |
| :-: | :--- | :--- | :--- |
| **1** | **Video Type** | `Narrated Story / Fable`, `Explainer / Documentary`, `Comedy / Satire`, `Adventure / Action`, `Educational` | `Narrated Story / Fable` |
| **2** | **Aspect Ratio (Format)** | `Landscape (16:9) — Standard Video` or `Vertical (9:16) — Short / Reel` *(never `1:1`)* | `Landscape (16:9) — Standard Video` |
| **3** | **Visual Style** | `2D Stickman`, `3D Pixar`, `Photorealistic`, `2D Anime / Illustration`, `Claymation` | `2D Stickman` *(or user choice)* |
| **4** | **Target Length** | `Concise (~30s)`, `Standard (~45–60s)`, `Extended (~75–120s+)`, `Story-Driven Auto` | `Story-Driven Auto` (~3–5s/beat) |
| **5** | **Input Mode** | **Mode A: Just Title & Context** *(Agent writes script)* \| **Mode B: Full Script** *(Agent segments & calibrates)* | Inferred from user input |
| **6** | **Audio Route** | **Route A:** In-App CloneVoice (`Beau Whitaker`) \| **Route B:** Studio FFmpeg (`-14 LUFS` + Sidechain BGM + Dropzone) | **Route A** (`Beau Whitaker`) |

---

## 🔗 5-Layer Continuity System Built Into Every Run

1. **Layer 1 — Standalone Master Character (`Reference Photo 1`):** Generates 1 full-body character on a plain neutral studio background before Scene 1, saves as `<Title> — Master Character`, turns **Consistent Character ON**, and locks it into `Reference Photo 1` for every scene (`1..N`).
2. **Layer 2 — Fixed Location Layout & Set Reference (`Reference Photo 2`):** Locks the camera side (`SOUTH`, etc.) and fixed landmark screen positions (`LEFT`, `CENTER`, `RIGHT`, `FOREGROUND`, `BACKGROUND`) for every recurring set, attaching a standalone empty set reference to `Reference Photo 2`.
3. **Layer 3 — Outgoing State $N$ = Incoming State $N+1$ Handoff Chain:** Every scene starts in the exact physical pose, position, hand occupancy, and prop state where the prior scene ended—preventing neutral pose resets and repeated approach/reach cycles.
4. **Layer 4 — Incoming Prop State & Interaction Eyeline Gates:** Source frames show the pre-action state of props (e.g., tightly folded umbrella shaft before opening) and keep interacting participants facing each other across a readable axis rather than staring at the camera lens.
5. **Layer 5 — Pre-Video Source Check & `t=1.5s` Frame Audit:** Verifies anatomy (2 arms/hands, 2 legs/feet), exact prop count, and zero style contamination before final assembly.
