export const textToLink = (text: string): { text: string; link: boolean }[] => {
  const regStr = /(https?:\/\/[\S]+\.[a-zA-Z]+[\S]+)/;
  const parts = text.split(new RegExp(regStr, 'g')).filter((v) => v !== '');

  return parts.map((text) => ({
    text,
    link: !!text.match(new RegExp(regStr, 'i')),
  }));
};
