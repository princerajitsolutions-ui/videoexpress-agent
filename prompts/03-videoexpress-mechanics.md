# Module 03: VideoExpress UI, Backbone DOM & Concurrent Queue Mechanics

This module codifies our battle-tested operational mechanics for **VideoExpress.ai** (`https://app.videoexpress.ai/`), combining the visible browser UI controls with deterministic Backbone/jQuery DOM hooks and concurrent job polling.

---

## 1. Dialog Setup & Pre-Submit Guards

### 1.1 Opening the Generation Panel
- UI Route: `Create with AI` → `Create Video From Prompt`
- Backbone Event Trigger (if opening programmatically in the active session):
  ```javascript
  window.app.vent.trigger('generateFromPrompt');
  ```
- **Persistent Panel Rule:** Keep the same browser tab and `Create Video From Prompt` panel open across all scene submissions (`1..N`). Closing a subdialog (such as integrated TTS or image preview) is normal—return immediately to the open generation panel without reloading the page or visiting the Media Library mid-run.

### 1.2 Mandatory Pre-Submit Setting Checks (Before Every Scene)
VideoExpress modals can silently reset specific controls after a rerender. Immediately before clicking `Create Image` for **every scene**, verify:
1. **Dialog Aspect Ratio Selector:**
   - The `Create Video From Prompt` modal has its own aspect-ratio toggle independent of the main project bar and frequently resets to `Vertical 9:16` even in a `16:9` project.
   - Confirm the modal's ratio button matches the locked project ratio (`16:9` or `9:16`); restore it if reset. Never select `1:1`.
2. **Image Prompt Auto-Enhancement OFF:**
   - Confirm **`Automatically enhance my image prompt`** is **UNCHECKED (OFF)**. It often re-checks itself after a dialog rerender—uncheck it before every submission so it does not rewrite your locked character/layout prompt.
3. **Style Selector (`select[name="select-type"]`):**
   - Confirm the `Image Type` matches the run's locked style (`2D`, `3D`, `Photorealistic`, etc.):
     ```javascript
     const select = document.querySelector('select[name="select-type"], select.select-type');
     if (select) {
       select.value = targetStyleValue; // e.g., '2d', '3d', 'photorealistic'
       select.dispatchEvent(new Event('change', { bubbles: true }));
     }
     ```
4. **Consistent Character & Reference Photos:**
   - **Use Creative mode:** `OFF`
   - **Consistent Character:** `ON`
   - **`Reference Photo 1`:** Protagonist Master Character (verify thumbnail is retained; restore only if visibly reset).
   - **`Reference Photo 2`:** Approved standalone Location/Environment Reference for the current scene's set (update only when the scene moves to a new location).
   - *Do not confuse `Reference Photo 1/2` with `Use from Library` (which replaces the scene's source image).*
5. **Mode Toggles:**
   - **Video prompt enhancement:** `OFF`
   - **Advanced Mode:** `OFF` (for standard integrated narration runs)
   - **Lipsync HD:** `OFF` (unless explicitly requested)
   - **Public gallery sharing:** `OFF`

---

## 2. Reliable Image-to-Video Submission Sequence

Direct raw POST calls to `/ai/api/image2video` without an active prepared source image fail with `"Source image is empty"`. Always follow the verified 7-step panel flow:

1. **Populate Image & Motion Prompts:**
   - Image Prompt field (`#opt_prompt` or `textareas[0]`): enter the 10-point scene image prompt and dispatch `input` + `change` events.
   - Video Motion Prompt field (`#opt_video_prompt` or `textareas[1]`): enter the one-paragraph visual motion prompt (`Initially..., then..., finally...`) and dispatch `input` + `change` events.
2. **Trigger Image Generation:**
   - Verify Dialog Ratio and Auto-Enhance `OFF`, then click `.button-generate-image-submit` (`Create Image`).
3. **Wait for Swiper Preview & Perform Brief Suitability Check:**
   - Wait for the generated image preview to populate `.swiper-slide img`.
   - Perform **one brief source-image suitability check** (correct character identity, 2 arms/hands & 2 legs/feet, required prop count, incoming pose—not completed action, proper interaction eyeline, and fixed landmark sides).
   - If unusable, simplify conflicting wording and retry (up to **3 total attempts** for that scene).
4. **Select the Usable Swiper Slide:**
   - Click the approved `.swiper-slide` element so the `Create Video` button (`.button-generate-video-submit`) transitions from `disabled = true` to `disabled = false`.
5. **Attach Narration (Route A) or Submit Video Directly (Route B):**
   - **Route A (In-App Integrated Narration):**
     1. Select **`Narration Video (Choose my Audio)`**.
     2. Click **`Create Video`** to open the integrated TTS dialog.
     3. Select **`CloneVoice` (`CloneVoice.ai`) → `System Voice` (`Category: System`) → `Beau Whitaker`** (or the user's selected voice).
     4. Paste **only** the scene's clean narration line into the TTS text box.
     5. Click to generate/create speech, confirm completion status and duration (without pausing for manual audio playback on every scene), then click **`Import Speech` / `Create Narration Video`**.
   - **Route B (Studio Hybrid / Mouth-Locked Video Only):**
     1. Click `.button-generate-video-submit` directly once enabled.
6. **Capture Job UUID Immediately:**
   - Record the returned `uuid` from the `/ai/api/image2video` or `/ai/api/generate_image2video2` response (or the active queue item) in the scene ledger.
7. **Pipeline Next Scene Immediately:**
   - Do **not** wait for Scene $N$'s video render to finish before preparing Scene $N+1$'s image. Immediately stay in the open panel and start Scene $N+1$ while prior video jobs render concurrently in the background.

---

## 3. Concurrent Queue Management (5-Slot Limit) & BunnyCDN Latency Guard

### 3.1 Respecting the Active Concurrency Limit
- VideoExpress accounts typically allow up to **5 concurrent video generations** at once.
- When all 5 slots are occupied (or if the API returns `"multiple videos in progress"`), **do not treat the full queue as a failed submission and never submit a duplicate job**.
- Pause new video submissions, poll active job UUIDs via `/ai/api/status/<uuid>` every 5–10 seconds (while continuing independent planning or image prep), and submit the next scene as soon as an active slot completes.

### 3.2 BunnyCDN Packaging & `mediaPath` Sync Latency Rule
- When a video render finishes, `/ai/api/status/<uuid>` reports `SUCCEEDED` and `/api/library/get_media/4?categoryId=<catId>` marks `status: "completed"`, **but `mediaPath` may remain `null` for 10–25 seconds** while BunnyCDN packaging finishes.
- **Mandatory Guard:** Never attempt to download or timeline-insert an asset until:
  1. `status === 'completed'` (or `'SUCCEEDED'`), **AND**
  2. `mediaPath` is populated (`https://cdn-ny-b.videoexpress.ai/video/<fileName>.mp4`) or `/userfiles/input/<userId>/<fileName>.mp4` responds with a valid binary MP4 payload `> 1 MB`.

---

## 4. Device-Agnostic DOM Primitives & Timeline Assembly

VideoExpress is a **Backbone + jQuery + jQuery-UI** application. Never use hardcoded screen pixel coordinates; always use DOM selectors, bounding rects, or jQuery events.

### 4.1 Adding Completed Clips in Story Order
1. After all scene renders complete, open **`Media Library` → `My Media` → `My AI Videos`** (`window.app.vent.trigger('mediaLibraryAiVideosOpen')`).
2. Match each completed clip to its planned scene using its recorded **Job UUID / Asset ID** (never rely purely on newest-first display order).
3. In strict **Scene 1 → Scene $N$** story order, right-click the video card and choose **`Add to Timeline`**.
4. Verify that **exactly one new `.brick.video`** appears on Track 1 before adding the next scene. If an action's result is uncertain, inspect `.tracks-wrapper .track-row` before clicking again to prevent duplicate bricks.

### 4.2 Cleaning Unsaved Duplicate Timeline Bricks
If an extra unsaved brick accidentally lands on the timeline:
1. Map `.brick.video` elements to recorded scene IDs and identify the duplicate copy.
2. Remove only the verified extra brick using the native jQuery context event:
   ```javascript
   $(extraBrick).trigger('ctxmenu:delete');
   ```
3. Recount `.brick.video` elements to verify exact story order (`1..N`).

### 4.3 Auto Align, Playhead Endpoint Matching & Project Save
1. **Auto Align:** Press **`Auto Align Clips`** on all populated tracks and verify zero unintended gaps, overlaps, or shifted narration.
   *(Note: recurring `1px` visual seams every ~5 bricks are floating-point CSS rounding of contiguous model times, not real timeline gaps.)*
2. **Exact Playhead Trim (When Aligning Video Tail to Audio Endpoint):**
   - Read audio endpoint pixel `audioEndPx = parseFloat(audioBrick.style.left) + parseFloat(audioBrick.style.width)`.
   - Move the ruler slider: `$(ruler).slider('value', audioEndPx)` (on `.timeline-header .ruler.ui-slider`) and trigger `slide`/`slidechange`/`change`.
   - Select the overhanging final video brick, trigger the Cut tool (`$('button:has(i.bi-scissors)').trigger('click')`), and delete the surplus tail brick (`$(tailBrick).trigger('ctxmenu:delete')`).
3. **Verified Save:** Save the project under its exact Project Title and verify persistence via `document.title` or the saved-project API record (not a transient toast notification alone).
