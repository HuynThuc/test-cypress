// Converts subtitle file content into array of objects: https://github.com/bazh/subtitles-parser/blob/master/index.js
export const parseSrt = (data: string) => {
  data = data.replace(/\r/g, '') as string;
  const regex =
    /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
  (data as unknown as string[]) = data.split(regex);
  (data as unknown as string[]).shift();

  const items = [];
  // let index = 1;
  for (let i = 0; i < data.length; i += 4) {
    // const text = data[i + 3].trim();
    // const containsNewLine = text.includes('\n');
    // if (containsNewLine) {
    //   text.split('\n').forEach((line) => {
    //     items.push({
    //       id: index,
    //       text: line,
    //     });
    //     index += 1;
    //   });
    // } else {
    //   items.push({
    //     id: index,
    //     text,
    //   });
    //   index += 1;
    // }
    items.push({
      id: data[i].trim(),
      startTime: timeMs(data[i + 1].trim()),
      endTime: timeMs(data[i + 2].trim()),
      text: data[i + 3].trim(),
    });
  }
  return items;
};

const timeMs = function (val: string) {
  const regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
  const parts: string[] | null = regex.exec(val);
  const newParts = [];

  if (parts === null) {
    return 0;
  }

  for (let i = 1; i < 5; i++) {
    newParts.push(parseInt(parts[i], 10));
    if (isNaN(newParts[i])) newParts[i] = 0;
  }

  // hours + minutes + seconds + ms
  return (
    newParts[1] * 3600000 +
    newParts[2] * 60000 +
    newParts[3] * 1000 +
    newParts[4]
  );
};
