import { Fragment } from 'react';

import { LoginResponse } from '@/modules/helenngolang/types';
import LessonCard from '@/modules/learners/components/other-page/learn/LessonCard';
import VideoInfo from '@/modules/learners/components/other-page/learn/VideoInfo';
import VideoPlayer from '@/modules/learners/components/other-page/learn/VideoPlayer';
import { getServerSession } from '@/modules/learners/services/auth';
import { fetchVideosDetailData } from '@/modules/learners/services/video-detail';
import {
  IGetVideoQuizResponse,
  IListVideoWords,
  ISubtitlesOfVideoDetail,
} from '@/modules/learners/types/video-detail/VideoDetail.types';
import { handleApiResult } from '@/modules/learners/utils';

export default async function LearnPage({
  searchParams,
}: {
  searchParams: { v?: string; t?: string; p?: string };
}) {
  const { v: videoId, t, p } = searchParams;
  const session: LoginResponse | null = getServerSession();

  // Early return for missing videoId
  if (!videoId)
    return <div className="text-center p-4">Please provide a video ID</div>;

  // Set start time, default to 0 if not provided
  const startTime = t ? parseInt(t, 10) : 0;

  // Fetch video data and trending videos
  const [videoDataRes, wordDataRes, easyDataRes, mediumDataRes] =
    await fetchVideosDetailData(session, videoId, p);

  // Handle API results

  const { data: videoData, error: videoDataError } = handleApiResult(
    videoDataRes as PromiseSettledResult<{ data: ISubtitlesOfVideoDetail }>,
    'Error fetching video data.',
  );
  const { data: wordData, error: wordDataError } = handleApiResult(
    wordDataRes as PromiseSettledResult<{ data: IListVideoWords[] }>,
    'Error fetching word data.',
  );
  const { data: easyData, error: easyDataError } = handleApiResult(
    easyDataRes as PromiseSettledResult<IGetVideoQuizResponse>,
    'Error fetching practice easy data.',
  );
  const { data: mediumData, error: mediumDataError } = handleApiResult(
    mediumDataRes as PromiseSettledResult<IGetVideoQuizResponse>,
    'Error fetching practice medium data.',
  );
  // Return error message if any of the results failed
  if (videoDataError || !videoData) return null;

  return (
    <Fragment>
      <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
        <div className="lg:col-span-3 md:col-span-1 col-span-1 flex flex-col justify-between md:h-[calc(100vh-100px)] md:min-h-[515px] md:max-h-[820px] h-[265px] gap-[2px]">
          <VideoPlayer
            videoIdParams={videoId}
            videoData={videoData as ISubtitlesOfVideoDetail}
            startTime={startTime}
          />
          <div className="hidden md:block">
            <VideoInfo
              video={(videoData as ISubtitlesOfVideoDetail).mediaInfo}
            />
          </div>
        </div>

        <div className="lg:col-span-2 md:col-span-1 col-span-1">
          <LessonCard
            wordData={wordData}
            wordDataError={wordDataError}
            easyData={easyData ?? []}
            easyDataError={easyDataError}
            mediumData={mediumData ?? []}
            mediumDataError={mediumDataError}
          />
        </div>
      </div>

      {/* <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 md:gap-4 gap-1 mt-4">
        <div className="lg:col-span-3 md:col-span-1 col-span-1">
          <Notes />
        </div>
        <div className="lg:col-span-2 md:col-span-1">
          <VideoRecomment videos={videosTrending} error={videosTrendingError} />
        </div>
      </div> */}
    </Fragment>
  );
}
