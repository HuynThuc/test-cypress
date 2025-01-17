import { ChannelVideoList } from '@/modules/learners/components/other-page/list-video/ChannelVideoList';
import { getInitalChannelVideos } from '@/modules/learners/services/list-video/Videos.service';

interface ChannelPageProps {
  params: {
    channel: string;
  };
}

async function fetchInitialData(channel: string) {
  const response = await getInitalChannelVideos({ channel });

  return {
    initialVideos: response.data?.data || [],
    initialMetadata: response.data?.metaData || null,
    initialChannelInfo: response.data?.channelInfo || null,
  };
}

export default async function ChannelVideosPage({ params }: ChannelPageProps) {
  const { channel } = params;
  const { initialVideos, initialMetadata, initialChannelInfo } =
    await fetchInitialData(channel);

  return (
    <ChannelVideoList
      channel={channel}
      initialVideos={initialVideos}
      initialMetadata={initialMetadata}
      channelInfo={initialChannelInfo}
    />
  );
}
