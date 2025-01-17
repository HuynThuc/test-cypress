import axios from 'axios';

async function fetchScriptSrt(url: string): Promise<string> {
  const data = await axios.get(url);
  return data.data;
}

export const youtubeService = {
  fetchScriptSrt,
};
