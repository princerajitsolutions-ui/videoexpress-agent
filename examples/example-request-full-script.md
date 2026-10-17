# Example Request — Mode B: Full Script Provided (Beat Segmentation & Calibration)

When the user supplies a **Full Script**, the agent preserves their exact narrative text, segments it into 3–6 second visual beats, verifies that each line satisfies the `audio_dur <= clip_dur - 0.6s` breath-padding rule, and constructs the visual continuity ledger around the script.

## User Request
```text
Create a VideoExpress YouTube Short using my full script below:
- Video Type: YouTube Short / Reel
- Visual Style: 2D Stickman
- Aspect Ratio: Vertical 9:16
- Length: ~25 seconds (5 scenes)
- Input Mode: Full Script Provided
- Audio Route: In-App VideoExpress Integrated Narration (Voice: Beau Whitaker)

Script:
1. Every morning, Toby stared at a mountain of unfinished tasks on his desk.
2. Instead of panicking, he wrote down just one five-minute goal on a yellow sticky note.
3. Crossing off that first tiny line sparked a wave of momentum he didn't expect.
4. By sunset, the towering paper pile had moved cleanly into the finished tray.
5. Big transformations never start with a leap—they start with one small checkmark.
```

## How the Agent Processes Mode B

1. **Master Character (`Reference Photo 1`):** Generates standalone 2D Stickman **Toby** on a plain neutral background (white circular head, expressive drawn eyes/eyebrows, teal hoodie, dark trousers, 2 thin black arms/hands, 2 thin black legs/sneakers) and saves as `One Small Checkmark — Master Character`.
2. **Fixed Location (`Reference Photo 2`):** Study Desk Set (`LOC_DESK`) — Camera side-on `SOUTH`: Wooden desk `CENTER`, tall "To-Do" tray `LEFT`, empty "Done" tray `RIGHT`, window `BACK-CENTER` transitioning from morning daylight (Scenes 1–3) to warm sunset (Scenes 4–5).
3. **Strict Handoff Chain:**
   - **Scene 01:** Tall paper stack in `LEFT` tray; Toby seated `CENTER` leaning chin near desk staring at stack → sits upright.
   - **Scene 02:** Starts upright; picks up pen and writes on **one yellow sticky note** at desk center → places pen down beside note.
   - **Scene 03:** Starts with pen beside sticky note; draws one bold checkmark across the note → lifts head with energized eyes.
   - **Scene 04:** Sunset light through back window; places the final sheet into the `RIGHT` "Done" tray (`LEFT` tray now empty).
   - **Scene 05:** Holds up the checked yellow sticky note toward the desk lamp with a proud nod.
