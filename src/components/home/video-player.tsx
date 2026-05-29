'use client';

import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  posterTime: number;
  fallbackMessage: string;
};

export function VideoPlayer({ src, posterTime, fallbackMessage }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const seekToPoster = () => {
      if (!playedRef.current && Math.abs(video.currentTime - posterTime) > 0.1) {
        try {
          video.currentTime = posterTime;
        } catch {
          // Some browsers throw if metadata is not yet loaded — ignore.
        }
      }
    };

    const handlePlay = () => {
      if (!playedRef.current) {
        playedRef.current = true;
        video.currentTime = 0;
      }
    };

    video.addEventListener('loadedmetadata', seekToPoster);
    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('loadedmetadata', seekToPoster);
      video.removeEventListener('play', handlePlay);
    };
  }, [posterTime]);

  return (
    <video
      ref={ref}
      src={`${src}#t=${posterTime}`}
      controls
      preload="metadata"
      playsInline
      className="h-full w-full object-cover"
    >
      {fallbackMessage}
    </video>
  );
}
