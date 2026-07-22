import { applyFocusMode } from "./focus";
import { startFocusObserver } from "./focus/observer";
import { getFocusSettings } from "@/services/focus.service";

console.log("✅ TubeOS Content Script Loaded");

async function initializeFocusMode() {
  const settings = await getFocusSettings();

  applyFocusMode(settings);

  startFocusObserver();
}

initializeFocusMode();

function getVideoInfo() {
  const video = document.querySelector("video") as HTMLVideoElement | null;

  const title =
    document
      .querySelector("h1.ytd-watch-metadata yt-formatted-string")
      ?.textContent?.trim() ??
    document.title.replace(" - YouTube", "");

  const videoId = new URL(location.href).searchParams.get("v");

  const timestamp = video ? Math.floor(video.currentTime) : 0;

  return {
    title,
    videoId,
    timestamp,
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_VIDEO_INFO") {
    sendResponse(getVideoInfo());
    return true;
  }

  if (message.type === "APPLY_FOCUS_MODE") {
    applyFocusMode(message.settings);

    sendResponse({
      success: true,
    });

    return true;
  }

  return true;
});