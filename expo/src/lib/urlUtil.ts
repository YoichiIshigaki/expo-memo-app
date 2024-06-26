export const textToLink = (
  text: string,
): { text: string; isLink: boolean }[] => {
  const regStr = /(https?:\/\/[\S]+\.[a-zA-Z]+[\S]+)/;
  const parts = text.split(new RegExp(regStr, 'g')).filter((v) => v !== '');

  return parts.map((text) => ({
    text,
    isLink: !!text.match(new RegExp(regStr, 'i')),
  }));
};

export const isEncodedUrl = (url: string): boolean => {
  const decodedUrl = decodeURI(url);
  return url !== decodedUrl;
};
