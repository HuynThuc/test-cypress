'use client';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

import { IVideoDetail } from '@/modules/learners/types';
import { LoginResponse } from '@/modules/helenngolang/types';
import { RootState } from '@/modules/learners/store';
import { IVideoActivity } from '@/modules/learners/types/VideoContinue.types';
import CardRecomment from '@/modules/learners/components/other-page/learn/RecommentCard';
import { videosHistoryLocalService } from '@/modules/learners/services/landing';
interface VideoRecommentProps {
  videos: IVideoDetail[] | [] | null;
  error: string | null | undefined;
}

const VideoRecomment: React.FC<VideoRecommentProps> = ({ videos, error }) => {
  const t = useTranslations('Home');
  const session: LoginResponse | null = useSelector(
    (state: RootState) => state.session.data,
  );
  const handleOnclick = async (video: IVideoDetail) => {
    if (session === null) return;
    try {
      const videoHistory: IVideoActivity = {
        video: video,
        progressAtSeconds: 1,
        actionAt: new Date().toISOString(),
      };
      await videosHistoryLocalService.addVideoToHistory(
        videoHistory,
        session.user.id,
      );
    } catch (errors) {
      // eslint-disable-next-line no-console
      console.error('Error:', errors);
    }
  };
  // If there is an error or no videos, do not render
  if (error || !videos) return null;

  // If there is an error or no videos, do not render
  if (error || videos?.length === 0) return null;
  return (
    <div className="h-full w-full shadow-e1 bg-surface rounded-lg">
      <div className="p-4 ">
        <h2 className="text-lg mb-4">{t('youMayAlsoLike')}</h2>
        <div className="space-y-4">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => {
                if (!session) return;
                handleOnclick(video);
              }}
            >
              <CardRecomment video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoRecomment;
