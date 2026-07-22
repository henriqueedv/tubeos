export type FocusSettings = {
  enabled: boolean;
  hideShorts: boolean;
  hideRecommendations: boolean;
  hideComments: boolean;
  hideHomeFeed: boolean;
  hideLiveChat: boolean;
};

const STORAGE_KEY = "tubeos_focus";

const defaultSettings: FocusSettings = {
  enabled: false,
  hideShorts: true,
  hideRecommendations: true,
  hideComments: false,
  hideHomeFeed: false,
  hideLiveChat: false,
};

export async function getFocusSettings(): Promise<FocusSettings> {
  return new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      resolve({
        ...defaultSettings,
        ...(result[STORAGE_KEY] ?? {}),
      });
    });
  });
}

export async function saveFocusSettings(
  settings: FocusSettings
): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set(
      {
        [STORAGE_KEY]: settings,
      },
      () => resolve()
    );
  });
}

export async function resetFocusSettings(): Promise<void> {
  return saveFocusSettings(defaultSettings);
}