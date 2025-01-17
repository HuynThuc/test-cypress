export function checkImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    // const request = new XMLHttpRequest();
    const image = new Image();
    image.onload = function () {
      resolve(true);
    };
    image.onerror = function () {
      resolve(false);
    };
    image.src = url;
  });
}
