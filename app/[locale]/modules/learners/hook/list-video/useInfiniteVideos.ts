import { useState, useCallback, useRef } from 'react';

import { IMetaData } from '@/app/[locale]/shared/types';

interface FetchVideosFunction<T> {
  /* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
  (
    page: number,
    sortBy?: string,
  ): Promise<{
    data: T[];
    metadata: IMetaData;
  }>;
  /* eslint-enable no-unused-vars */
}

export function useInfiniteVideos<T>(
  initialVideos: T[],
  initialMetadata: IMetaData | null,
  fetchVideosFunction: FetchVideosFunction<T>,
) {
  const [videos, setVideos] = useState<T[]>(initialVideos);
  const [metadata, setMetadata] = useState<IMetaData | null>(initialMetadata);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef(2);

  const fetchVideos = useCallback(
    async (sortBy?: string) => {
      if (loading || (metadata && pageRef.current > metadata.totalPages))
        return;

      setLoading(true);
      setError(null);

      try {
        const { data, metadata: newMetadata } = await fetchVideosFunction(
          pageRef.current,
          sortBy,
        );
        setVideos((prevVideos) => [...prevVideos, ...data]);
        setMetadata(newMetadata);
        pageRef.current += 1;
      } catch (err) {
        setError('Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    },
    [fetchVideosFunction, loading, metadata],
  );

  const resetVideos = useCallback(() => {
    setVideos([]);
    pageRef.current = 2;
    setMetadata(null);
  }, []);

  return {
    videos,
    setVideos,
    metadata,
    loading,
    error,
    fetchVideos,
    resetVideos,
  };
}
