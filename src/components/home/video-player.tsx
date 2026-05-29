'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

type Props = {
  src: string;
  posterTime: number;
  fallbackMessage: string;
};

export function VideoPlayer({ src, posterTime, fallbackMessage }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || started) return;

    const seekToPoster = () => {
      if (Math.abs(video.currentTime - posterTime) > 0.1) {
        try {
          video.currentTime = posterTime;
        } catch {
          // Some browsers throw if metadata is not yet loaded — ignore.
        }
      }
    };

    if (video.readyState >= 1) seekToPoster();
    video.addEventListener('loadedmetadata', seekToPoster);

    return () => {
      video.removeEventListener('loadedmetadata', seekToPoster);
    };
  }, [posterTime, started]);

  const handleStart = () => {
    const video = ref.current;
    if (!video) return;
    setStarted(true);
    video.currentTime = 0;
    // Ensure controls render before playback starts
    requestAnimationFrame(() => {
      void video.play();
    });
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        src={`${src}#t=${posterTime}`}
        controls={started}
        preload="metadata"
        playsInline
        className="h-full w-full object-cover"
      >
        {fallbackMessage}
      </video>

      {!started && (
        <button
          type="button"
          onClick={handleStart}
          aria-label="Play video"
          className="group absolute inset-0 flex items-center justify-center bg-ink-0/25 transition-colors duration-500 hover:bg-ink-0/40"
        >
          <span className="relative flex h-20 w-20 items-center justify-center bg-acid-2 text-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:bg-acid-3 sm:h-24 sm:w-24">
            {/* Corner ticks */}
            <span className="pointer-events-none absolute -left-2 -top-2 h-3 w-3 border-l border-t border-white/70" />
            <span className="pointer-events-none absolute -right-2 -top-2 h-3 w-3 border-r border-t border-white/70" />
            <span className="pointer-events-none absolute -left-2 -bottom-2 h-3 w-3 border-b border-l border-white/70" />
            <span className="pointer-events-none absolute -right-2 -bottom-2 h-3 w-3 border-b border-r border-white/70" />
            <Play className="h-7 w-7 translate-x-0.5 fill-current sm:h-8 sm:w-8" strokeWidth={0} />
          </span>
        </button>
      )}
    </div>
  );
}
