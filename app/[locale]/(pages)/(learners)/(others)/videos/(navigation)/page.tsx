import { VideoProvider } from '@/modules/learners/context/list-video/VideoContext';
import { VideoList } from '@/modules/learners/components/other-page/list-video/VideoList';
import {
  getInitialHomePageTopChannels,
  getInitialHomePageTrendingVideos,
  getInitialHomePageVideos,
} from '@/app/[locale]/modules/learners/services/list-video/Videos.service';

export default async function Page() {
  const [initialVideos, trendingVideos, topChannels] = await Promise.all([
    getInitialHomePageVideos(),
    getInitialHomePageTrendingVideos(),
    getInitialHomePageTopChannels(),
  ]);

  return (
    <VideoProvider
      initialVideos={initialVideos?.data?.data || []}
      initialTrendingVideos={trendingVideos.data || []}
      initialTopChannels={topChannels.data || []}
    >
      <VideoList />
    </VideoProvider>
  );
}
