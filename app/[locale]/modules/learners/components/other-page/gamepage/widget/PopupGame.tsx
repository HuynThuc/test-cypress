'use client';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { LoadingIndicator } from '@/shared/components';

import { RootState } from '@/modules/learners/store';

type PopupGameProps = {
  onClose: () => void;
};

const PopupGame = ({ onClose }: PopupGameProps) => {
  const session = useSelector((state: RootState) => state.session.data);
  const accessToken = session?.authorization.accessToken;

  const [isLoading, setIsLoading] = useState(true);
  // Ref to track the iframe
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && iframe) {
          setIsLoading(true);
          iframe.src = `/game/index.html?access_token=${accessToken}`;
        }
      });
    });

    if (iframe) observer.observe(iframe);

    return () => {
      if (iframe) observer.unobserve(iframe);
    };
  }, [accessToken]);

  // Load game script when necessary
  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    const loadGameScript = () => {
      if (!script) {
        script = document.createElement('script');
        script.src = '/game/Build/Build.loader.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadGameScript();

    return () => {
      if (script) {
        document.body.removeChild(script);
        script = null;
      }
    };
  }, [accessToken]);

  return (
    <div className="w-full h-full relative max-w-[940px] max-h-[570px] bg-background bg-opacity-75">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <LoadingIndicator />
        </div>
      )}
      <div className="w-full h-full relative">
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>

      <div className="absolute top-2 right-2">
        <button
          className="p-2 bg-red-500 text-white rounded-full w-10 h-10"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default PopupGame;
