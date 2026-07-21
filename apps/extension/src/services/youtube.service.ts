export type CurrentVideo = {
  title: string;
  videoId: string | null;
  timestamp: number;
};

export async function getCurrentVideo(): Promise<CurrentVideo | null> {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const tab = tabs[0];

  if (!tab?.id) {
    return null;
  }

  return new Promise((resolve) => {
    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "GET_VIDEO_INFO",
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);

          resolve(null);
          return;
        }

        resolve(response);
      }
    );
  });
}