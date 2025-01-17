'use client';

import { useEffect, useRef, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import type { YouTubeProps, YouTubeEvent, YouTubePlayer } from 'react-youtube';

import { RootState } from '@/modules/learners/store';
import { ISubtitlesOfVideoDetail } from '@/modules/learners/types/video-detail/VideoDetail.types';
import VideoController from '@/modules/learners/components/other-page/learn/video-controller/VideoController';
import {
  setPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setPlaybackRate,
  clearSeekTime,
  setSubtitles,
  setProcessedSubtitles,
  setVideoId,
} from '@/modules/learners/store/slice';
import {
  setCurrentSubtitleIdx,
  setPlayingWithRepeatTime,
} from '@/modules/learners/store/slice/video-detail';
import { handleKeyDownVideoPlayer } from '@/modules/learners/utils/handleKeyDownVideoPlayer.utils';

const YouTube = dynamic<YouTubeProps>(
  () =>
    import('react-youtube').then((mod) => {
      const YouTube = mod.default;
      return forwardRef<YouTubePlayer, YouTubeProps>((props, ref) => (
        <YouTube {...props} ref={ref} />
      ));
    }),
  { ssr: false },
);

type VideoPlayerProps = {
  videoData: ISubtitlesOfVideoDetail;
  startTime: number;
  videoIdParams: string;
};

export default function VideoPlayer({
  videoData,
  startTime,
  videoIdParams,
}: VideoPlayerProps) {
  const dispatch = useDispatch();
  const playerRef = useRef<YouTubePlayer | null>(null);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentTime, seekTime, volume, playbackRate, isPlaying, repeatTime } =
    useSelector((state: RootState) => state.youtubePlayer);
  const { currentSubtitleIdx, isPlayingWithRepeatTime, levelIdx } = useSelector(
    (state: RootState) => state.practiceStage,
  );
  const { videoId } = useSelector((state: RootState) => state.youtubePlayer);
  const { currentStageIndex } = useSelector(
    (state: RootState) => state.learningStage,
  );
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    playerRef.current && playerRef.current.pauseVideo();
    dispatch(setPlaying(false));
    dispatch(setCurrentSubtitleIdx(0));
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updateTime = () => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        dispatch(setCurrentTime(currentTime));
      }
      animationFrameId = requestAnimationFrame(updateTime);
    };

    animationFrameId = requestAnimationFrame(updateTime);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (playerRef.current && !isInitialized) {
      playerRef.current.seekTo(startTime, true);
      dispatch(setCurrentTime(startTime));
      playerRef.current.setVolume(volume);
      setIsInitialized(true);
    }
  }, [startTime, dispatch, volume, isInitialized]);

  useEffect(() => {
    dispatch(setSubtitles(videoData.subtitles));
    dispatch(setProcessedSubtitles(videoData.subtitles));
    if (videoIdParams) dispatch(setVideoId(videoIdParams));

    // return () => {
    //   dispatch(setVideoId(null));
    // };
  }, [videoData, dispatch]);

  useEffect(() => {
    if (seekTime !== null) {
      playerRef.current && playerRef.current.seekTo(seekTime, true);
      playerRef.current && playerRef.current.pauseVideo();
      dispatch(clearSeekTime());
    }
  }, [seekTime, dispatch]);

  useEffect(() => {
    if (playerRef.current && isInitialized) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, isInitialized]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(playbackRate);
    }
  }, [playbackRate]);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) playerRef.current.playVideo();
      else {
        playerRef.current.pauseVideo();
        if (isPlayingWithRepeatTime) {
          clearTimeout(timeOutRef.current as NodeJS.Timeout);
          dispatch(setPlayingWithRepeatTime(false));
        }
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlayingWithRepeatTime) {
      handleRepeatSubtitle(levelIdx === 1 ? repeatTime : 1);
      playerRef.current && playerRef.current.playVideo();
    } else {
      playerRef.current && playerRef.current.pauseVideo();
      clearTimeout(timeOutRef.current as NodeJS.Timeout);
    }
  }, [isPlayingWithRepeatTime]);

  useEffect(() => {
    if (currentStageIndex === 1 && playerRef.current) {
      playerRef.current.pauseVideo();
    }
  }, [currentStageIndex]);

  // Handle event when the user presses the 'Space' key
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isInputElement = event.target instanceof HTMLTextAreaElement;
      if (currentStageIndex == 1 && event.code === 'Space' && !isInputElement) {
        event.preventDefault();
        handleKeyDownVideoPlayer(event, playerRef, isPlaying, dispatch);
        return;
      }
    };
    // Listen to keyboard events
    window.addEventListener('keydown', onKeyDown);

    // Clean up when component unmounts
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isPlaying, currentStageIndex]);

  if (!videoId) return <div>Invalid video URL</div>;

  const handlePlay = () => {
    playerRef.current?.playVideo();
    dispatch(setPlaying(true));
  };

  const handlePause = () => {
    playerRef.current?.pauseVideo();
    dispatch(setPlaying(false));
    clearTimeout(timeOutRef.current as NodeJS.Timeout);
  };

  const handleVolumeChange = (newVolume: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      dispatch(setVolume(newVolume));
    }
  };

  const handlePlaybackRateChange = (newRate: number) => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(newRate);
      dispatch(setPlaybackRate(newRate));
    }
  };

  const handleSeek = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      dispatch(setCurrentTime(time));
    }
  };

  const handleReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    dispatch(setDuration(event.target.getDuration()));
    event.target.setVolume(volume);
    setIsLoading(false);
  };

  const handlePreviousSubtitle = () => {
    const currentSubtitleIndex = videoData.subtitles.findIndex(
      (subtitle) =>
        currentTime * 1000 >= subtitle.startTime &&
        currentTime * 1000 < subtitle.endTime,
    );
    if (currentSubtitleIndex > 0) {
      const newTime =
        videoData.subtitles[currentSubtitleIndex - 1].startTime / 1000;
      handleSeek(newTime);
    }
  };

  const handleNextSubtitle = () => {
    const currentSubtitleIndex = videoData.subtitles.findIndex(
      (subtitle) =>
        currentTime * 1000 >= subtitle.startTime &&
        currentTime * 1000 < subtitle.endTime,
    );
    if (currentSubtitleIndex < videoData.subtitles.length - 1) {
      const newTime =
        videoData.subtitles[currentSubtitleIndex + 1].startTime / 1000;
      handleSeek(newTime);
    }
  };

  const handleRepeatSubtitle = (iterations: number) => {
    if (currentSubtitleIdx !== -1) {
      const startTime =
        videoData.subtitles[currentSubtitleIdx].startTime / 1000;
      const endTime = videoData.subtitles[currentSubtitleIdx].endTime / 1000;
      const repeat = (count: number) => {
        if (count > 0) {
          handleSeek(startTime);
          playerRef.current && playerRef.current.playVideo();
          timeOutRef.current = setTimeout(
            () => {
              repeat(count - 1);
            },
            (endTime - startTime) * 1000,
          );
        } else {
          dispatch(setPlayingWithRepeatTime(false));
          playerRef.current && playerRef.current.pauseVideo();
        }
      };

      repeat(iterations);
    }
  };

  return (
    <div className="flex flex-col w-full md:h-[calc(100vh-180px)]">
      <div className="aspect-video md:h-3/4 h-1/6 relative w-full md:min-h-[306px] min-h-[202px] md:max-h-[550px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <YouTube
          videoId={videoId}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 0,
              start: startTime,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              cc_load_policy: 3,
            },
          }}
          className="absolute top-0 left-0 w-full h-full"
          iframeClassName="w-full h-full"
          onReady={handleReady}
          onPlay={() => dispatch(setPlaying(true))}
          onPause={() => dispatch(setPlaying(false))}
        />
      </div>
      <VideoController
        onPlay={handlePlay}
        onPause={handlePause}
        onVolumeChange={handleVolumeChange}
        onPlaybackRateChange={handlePlaybackRateChange}
        onSeek={handleSeek}
        onPreviousSubtitle={handlePreviousSubtitle}
        onNextSubtitle={handleNextSubtitle}
      />
    </div>
  );
}
