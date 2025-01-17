import dynamic from 'next/dynamic';

import { ResponseData } from '@/shared/types/ApiResponse.types';

import { LoginResponse } from '@/modules/helenngolang/types';
import { handleApiResult } from '@/modules/learners/utils';
import {
  // IGetStreakResponse,
  IGetTopChannelResponse,
  IGetVideoCategoriesResponse,
  IGetVideoLearnersResponse,
  ITopChannelDetail,
  IVideoDetail,
} from '@/modules/learners/types';
import { getServerSession } from '@/modules/learners/services/auth/SessionSever.service';
import { fetchVideosData } from '@/modules/learners/services/landing';

// Dynamic imports
const TrendingVideo = dynamic(
  () =>
    import('@/modules/learners/components/landing-page/homepage/TrendingVideo'),
);
const ContinueVideo = dynamic(
  () =>
    import('@/modules/learners/components/landing-page/homepage/ContinueVideo'),
);
const VideoCategories = dynamic(
  () =>
    import(
      '@/modules/learners/components/landing-page/homepage/VideoCategories'
    ),
);
const TopChannels = dynamic(
  () =>
    import(
      '@/modules/learners/components/other-page/list-video/widgets/TopChannels'
    ),
);

const SliderChannels = dynamic(
  () =>
    import(
      '@/modules/learners/components/landing-page/homepage/SliderChannels'
    ),
);

export default async function LandingPage() {
  const session: LoginResponse | null = getServerSession();
  // Fetch data concurrently using the service function
  const [
    videosTrendingRes,
    videoCategoriesRes,
    channelsRes,
    // streakRes,
  ] = await fetchVideosData(session);
  // Use a common function to handle API results
  const { data: videosTrending, error: videosTrendingError } = handleApiResult(
    videosTrendingRes as PromiseSettledResult<IGetVideoLearnersResponse>,
    'Error fetching videos.',
  );
  // const {
  //   data: streakData,
  //   error: streakError,
  //   code: streakCode,
  // } = handleApiResult(
  //   streakRes as PromiseSettledResult<IGetStreakResponse>,
  //   'Error fetching streak data.',
  // );
  const { data: videoCategories, error: VideoCategoriesError } =
    handleApiResult(
      videoCategoriesRes as PromiseSettledResult<IGetVideoCategoriesResponse>,
      'Error fetching video categories.',
    );
  const { data: topChannels, error: topChannelsError } = handleApiResult(
    channelsRes as PromiseSettledResult<IGetTopChannelResponse>,
    'Error fetching top channels.',
  );
  // Map video and audio data
  const videoTrendingMap = (videosTrending as ResponseData<IVideoDetail[]>)
    ?.data;
  const channels = topChannels as ITopChannelDetail[];
  // Render the page
  return (
    <div className="w-full h-auto pb-8 flex flex-col gap-8">
      <div className="w-full h-auto flex flex-col gap-2">
        <SliderChannels topChannels={channels} error={topChannelsError} />
        {/* <BannerSection />
        <StreakBanner
          streakData={streakData}
          error={streakError}
          code={streakCode}
        /> */}
      </div>
      <VideoCategories
        videoCategories={videoCategories}
        error={VideoCategoriesError}
      />
      <ContinueVideo />
      <TrendingVideo videos={videoTrendingMap} error={videosTrendingError} />
      <TopChannels channels={channels} error={topChannelsError} />
    </div>
  );
}
