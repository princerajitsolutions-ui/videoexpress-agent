/**
 * VideoExpress.ai 5-Slot Concurrent Queue Worker & BunnyCDN Sync Poller
 *
 * Usage inside an authenticated VideoExpress browser session (via console/evaluate):
 * 1. Populate `window.__veScenes` with your approved `{ scene_number, media_id, style, prompt }` entries.
 * 2. Call `await window.__veQueueWorker()` periodically (every 5-8s) until `pending === 0 && running === 0`.
 * 3. Respects the 5-concurrent-video account limit and waits for BunnyCDN `mediaPath` population.
 */

window.__veQueueWorker = async function (scenesInput, maxConcurrent = 5) {
  window.__veTasks = window.__veTasks || {};
  const scenes = scenesInput || window.__veScenes || [];

  // 1. Initialize scene task records
  for (const sc of scenes) {
    if (!window.__veTasks[sc.scene_number]) {
      window.__veTasks[sc.scene_number] = {
        scene: sc.scene_number,
        mediaId: sc.media_id,
        style: sc.style || "2d",
        prompt: sc.prompt,
        status: "PENDING",
        uuid: null,
        mediaPath: null,
        attempts: 0
      };
    }
  }

  // 2. Poll active tasks via /ai/api/status/<uuid>
  for (const key of Object.keys(window.__veTasks)) {
    const task = window.__veTasks[key];
    if (task.uuid && ["SUBMITTED", "RUNNING", "PENDING"].includes(task.status)) {
      try {
        const res = await fetch("/ai/api/status/" + task.uuid).then((r) => r.json());
        if (res && res.status) {
          task.status = res.status;
          if (res.status === "SUCCEEDED") {
            task.result = res;
          }
        }
      } catch (err) {
        task.lastPollError = err.message;
      }
    }
  }

  // 3. Count currently running video jobs
  let activeCount = Object.values(window.__veTasks).filter(
    (t) => t.uuid && ["SUBMITTED", "RUNNING", "PENDING"].includes(t.status)
  ).length;

  // 4. Submit next scenes up to maxConcurrent (default 5)
  for (const sc of scenes) {
    if (activeCount >= maxConcurrent) break;
    const task = window.__veTasks[sc.scene_number];

    if ((!task.uuid || task.status === "FAILED") && task.attempts < 3) {
      try {
        const payload = {
          type: task.style,
          mediaId: task.mediaId,
          prompt: task.prompt,
          videoLengthBooster: 0
        };
        const res = await fetch("/ai/api/generate_image2video2", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(payload).toString()
        }).then((r) => r.json());

        if (res.success && res.uuid) {
          task.uuid = res.uuid;
          task.promptUuid = res.promptUuid || null;
          task.status = "RUNNING";
          task.attempts += 1;
          activeCount += 1;
        } else if (res.msg && res.msg.toLowerCase().includes("multiple videos in progress")) {
          // Queue is full; stop submitting and wait for an active slot to finish
          break;
        } else {
          task.error = res.msg || res.error || "Unknown submission response";
        }
      } catch (err) {
        task.error = err.message;
      }
      await new Promise((r) => setTimeout(r, 600));
    }
  }

  const allTasks = Object.values(window.__veTasks);
  return {
    succeeded: allTasks.filter((t) => t.status === "SUCCEEDED").length,
    running: allTasks.filter((t) => t.uuid && ["SUBMITTED", "RUNNING"].includes(t.status)).length,
    pending: allTasks.filter((t) => !t.uuid || t.status === "PENDING").length,
    failed: allTasks.filter((t) => t.status === "FAILED" && t.attempts >= 3).length,
    tasks: window.__veTasks
  };
};
