import { getFocusSettings } from "@/services/focus.service";
import { applyFocusMode } from "./index";

let observer: MutationObserver | null = null;

let timeout: number | null = null;

export function startFocusObserver() {
  if (observer) return;

  observer = new MutationObserver(() => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = window.setTimeout(async () => {
      const settings = await getFocusSettings();

      applyFocusMode(settings);
    }, 150);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("👀 TubeOS Focus Observer Started");
}