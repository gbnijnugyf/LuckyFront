export function formatTime(time: string) {
  if (!time) return "";
  time = time.slice(0, 10) + " " + time.slice(11, 16);
  return time;
}

/**
 *
 * @param path like `/path/to/location`
 * @param paramsRaw your Params
 * @returns like `/path/to/location?a=1&b=2`
 */
export function appendParams2Path(
  path: string,
  paramsRaw: string | URLSearchParams | string[][] | Record<string, string>
) {
  const params = new URLSearchParams(paramsRaw);
  return `${path}?${params.toString()}`;
}
