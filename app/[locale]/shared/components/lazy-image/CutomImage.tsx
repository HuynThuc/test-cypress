import Image from 'next/image';
import { useState, useEffect } from 'react';

import { checkImage, cn } from '@/shared/utils';

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string; // URL fallback if the image fails to load
  className?: string; // CSS classes
  priority?: boolean; // Next.js image optimization
}

export const CustomImage = ({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/images/err-img.jpg',
  className = '',
  priority = false,
}: CustomImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState('/images/loading-image.png');

  useEffect(() => {
    const loadImage = async () => {
      const isValid = await checkImage(src);
      if (!isValid) setCurrentSrc(fallbackSrc);
      else setCurrentSrc(src);

      setIsLoading(false);
    };

    loadImage();
  }, [src, fallbackSrc]);

  return (
    <div
      className={`relative w-[${width}px] h-[${height}px] flex items-center justify-center ${className}`}
    >
      <Image
        fill
        rel="preload"
        src={currentSrc}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt}
        priority={priority}
        className={cn(
          `w-[${width}px] h-[${height}px] rounded transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`,
          className,
        )}
        onLoad={() => setIsLoading(false)}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};
