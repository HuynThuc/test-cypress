import { useState } from 'react';
import Image from 'next/image';
import { FaImages } from 'react-icons/fa6';

interface LazyImageProp {
  imageUrl: string;
  width?: number;
  height?: number;
}

import { Button } from '../shacdn-ui/Button.components';

export function LazyImage({ imageUrl, width, height }: LazyImageProp) {
  const [isLoading, setIsLoading] = useState(true);
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => openInNewTab(imageUrl)}
    >
      {isLoading && <FaImages className="mx-auto w-7 scale-150" />}
      <Image
        rel="preload"
        src={imageUrl}
        alt="slug_post"
        width={isLoading ? 0 : (width ?? 140)}
        height={isLoading ? 0 : (height ?? 20)}
        style={{
          opacity: isLoading ? 0 : 1,
          animationDuration: '1000ms',
          maxWidth: '100%',
          height: isLoading ? 0 : 'auto',
          objectFit: 'cover',
        }}
        loading="lazy"
        onLoad={() => setTimeout(() => setIsLoading(false), 3000)}
      />
    </Button>
  );
}
