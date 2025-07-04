/**
 * extract parameter 'v' from url
 * @param {string} urlStr - Youtube Video URL (ex: https://www.youtube.com/watch?v=HRWakz9pnnY)
 * @returns {string|null} - v parameter or null
 */
export function getYouTubeVideoId(urlStr) {
  try {
    const url = new URL(urlStr);
    return url.searchParams.get("v");
  } catch (e) {
    console.error("Invalid video URL:", urlStr, e);
    return null;
  }
}

/**
 * extract parameter 'list' from url
 * @param {string} urlStr - YouTube URL
 * @returns {string|null} - list parameter or null
 */
export function getPlaylistId(urlStr) {
  try {
    const url = new URL(urlStr);
    return url.searchParams.get("list");
  } catch (e) {
    console.error("Invalid playlist URL:", urlStr, e);
    return null;
  }
}
