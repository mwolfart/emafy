export const parseImages = (
  images?: { url: string }[],
): Array<string> | undefined => images?.map((item) => item.url)
