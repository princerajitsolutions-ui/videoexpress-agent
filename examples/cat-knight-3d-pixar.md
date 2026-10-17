# The Cat Knight & The Crimson Demon — 3D Pixar Multi-Act Production Example

This example demonstrates a complete **20-shot Widescreen (`16:9`) 3D Pixar** story produced in VideoExpress.ai using **Mouth-Locked prompts**, **5-slot concurrent queue polling**, and **Studio Hybrid FFmpeg Audio Mastering** (`en-US-ChristopherNeural` + `Teller of the Tales` orchestral BGM sidechain-ducked to `-24 dBFS`).

---

## 1. Intake Configuration
- **Video Type:** Narrated Story / Comedy Fable (5 Acts, 20 Shots)
- **Visual Style:** `3D Pixar` (`select-type: 3d`)
- **Aspect Ratio:** `Landscape 16:9` (`1920x1080` master video, `3840x2160` 4K cover thumbnail)
- **Target Runtime:** ~90 seconds (`92.84s` actual measured timeline across 20 clips of `4.04s–6.04s`)
- **Audio Route:** Studio Hybrid Master (`0.60s` per-shot breath margin, `100Hz` highpass, `+3.5dB @ 3kHz` presence boost, `-0.5 dBFS` peak limiter, sidechain compression `ratio=10:attack=20:release=300`)

---

## 2. Protagonist Master DNA (`Sir Whiskers`)
- **Character:** **Sir Whiskers**, ginger tabby cat paladin with emerald-green eyes, wearing miniature polished silver plate armor with gold filigree, a royal blue velvet cape, and carrying a gleaming miniature silver broadsword.
- **Mouth-Lock Rule:** Every shot opens with Sir Whiskers holding a sealed, noble closed-lip expression; all emotion (shock, feline focus, heroic valor, sleepy contentment) is channeled through emerald eyes, ear angles, whiskers, tail motion, and armored posture.

---

## 3. 5-Act Continuity & Calibrated Narration Plan (Excerpt)

| Shot | Act | Clip Dur | Spoken Narration (Calibrated $\le D_i - 0.6\text{s}$) | Incoming State → Principal Action → Outgoing State |
| :---: | :--- | :---: | :--- | :--- |
| **01** | Act I: Holy Vigil | `6.04s` | "In the grand sunlit halls of Castle Hearthfire, peace reigned supreme." | Hearth `LEFT`, velvet rug `CENTER`, armchair `RIGHT`. Sir Whiskers stands center-left on rug → surveys hall nobly. |
| **04** | Act I: Holy Vigil | `4.04s` | "Until... the ancient Crimson Demon materialized upon the rug!" | Sir Whiskers poised `LEFT` → bright red laser dot appears on rug `RIGHT`; he freezes in wide-eyed shock. |
| **07** | Act II: Skirmish | `6.04s` | "He commenced the sacred feline combat ritual: the battle wiggle." | Sword drawn, crouched `LEFT` facing dot `RIGHT` → lowers hindquarters and performs rhythmic feline pounce-wiggle. |
| **11** | Act III: Siege | `4.04s` | "Undaunted, our armored hero scaled the draperies in pursuit." | Clinging to crimson velvet curtain mid-height → climbs rapidly upward toward the brass curtain rod. |
| **16** | Act IV: Dive | `4.04s` | "A celestial dive in slow motion through beams of golden sunlight!" | Perched atop tall oak bookshelf `LEFT` → leaps gracefully through dusty sunbeams toward silk pillows below. |
| **20** | Act V: Truce | `4.04s` | "Slumber embraced the brave paladin by the warm hearthfire embers." | Curled on silk cushion before glowing hearth `LEFT` → eyes gently close as warm firelight flickers across his armor. |
