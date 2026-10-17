# Example Request — Mode A: Just Title & Context (Autonomous Scriptwriting)

When the user supplies only a **Title & Context**, the agent resolves any missing intake fields (Video Type, Visual Style, Aspect Ratio, Length, Audio Route) and autonomously constructs the complete story arc, fresh protagonist Master Character, Fixed Location Layouts, and scene-by-scene narration.

## User Request
```text
Create a narrated VideoExpress story video:
- Video Type: Narrated Story / Fable
- Visual Style: 3D Pixar
- Aspect Ratio: Landscape 16:9
- Length: Standard (~45–60 seconds, 10 scenes)
- Input Mode: Just Title & Context
- Title: "The Firefly Who Feared the Dark"
- Context: A tiny lantern-bug named Lumi is afraid of turning on his glow in the deep whisper-woods until a lost baby owl needs his light to find her branch.
- Audio Route: Studio Hybrid Master (Christopher voiceover + warm cinematic orchestral BGM ducked at -22dB + 4K thumbnail)
```

## Resulting Production Brief & Opening Continuity Plan

- **Protagonist Master (`Reference Photo 1`):** `The Firefly Who Feared the Dark — Master Character` — One full-body 3D Pixar animated firefly named **Lumi** on a neutral studio background: warm amber eyes, expressive dark eyebrows, soft olive-green tunic vest, tiny leather boots, two articulated arms with empty hands, translucent iridescent wings folded neatly, unlit glass tail-lantern.
- **Location `LOC_01` (Whisper-Woods Hollow — `Reference Photo 2`):** Camera on SOUTH side looking NORTH. Ancient mossy oak trunk `LEFT`, glowing blue mushrooms along a curved root path `CENTER`, fern thicket `RIGHT`, starlit canopy `BACKGROUND`.

| Scene | Spoken Narration (Calibrated $\le D_i - 0.6\text{s}$) | Incoming State (Source Frame) | One Principal Action (Mouth-Locked) | Outgoing State → Next Handoff |
| :---: | :--- | :--- | :--- | :--- |
| **01** | "Deep in the Whisper-Woods, every firefly sparkled like a falling star—except little Lumi." | Lumi perched on mossy oak root `LEFT` facing `RIGHT`, tail-lantern unlit, wings tucked. | Initially Lumi holds a sealed gentle smile while looking up at distant lights, then pulls his tiny vest collar tighter and steps behind a mushroom cap, finally peeking out with wide hesitant eyes. | Crouched behind center mushroom cap, looking `RIGHT` → starts Scene 02 in that exact crouch. |
| **02** | "Whenever darkness fell, Lumi worried his tiny lantern wasn't bright enough to matter." | Crouched behind the blue mushroom cap `CENTER`, hands resting on its rim. | Initially Lumi glances back at his unlit tail-lantern, then gently taps the glass bulb with one finger, finally lowering his antennae in quiet self-doubt. | Seated beside mushroom cap, hand on lantern → starts Scene 03 when a rustle comes from the right ferns. |
| **03** | "Then a soft sniffle echoed from the shadowy fern thicket just ahead." | Lumi seated `CENTER` facing `RIGHT`; fern leaves on `RIGHT` trembling. | Initially Lumi's antennae perk straight up and his eyes widen toward the right ferns, then he rises onto both feet and takes two cautious steps right, finally pausing at the fern edge. | Standing at `RIGHT` fern edge facing `RIGHT` → reveals Pip the baby owl in Scene 04. |
