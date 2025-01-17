export const playAudio = (url: string) => {
  new Audio(url).play().catch();
};
