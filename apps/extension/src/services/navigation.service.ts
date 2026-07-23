export async function openVideoAtTime(
  videoId: string,
  timestamp: number
): Promise<void> {
  if (!videoId) return;

  const url = `https://www.youtube.com/watch?v=${videoId}&t=${timestamp}s`;

  await chrome.tabs.create({
    url,
  });
}