import React, { useState } from 'react';
import { Scissors } from 'lucide-react';

interface SmartImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: string; // e.g. '4/5', '4/3', '16/9', '1/1'
  onClick?: () => void;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  aspectRatio,
  onClick,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [hasFailedCompletely, setHasFailedCompletely] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (!hasTriedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setHasTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasFailedCompletely(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Inline style for dynamic aspect ratio if supplied
  const aspectStyle = aspectRatio ? { aspectRatio } : undefined;

  return (
    <div
      style={aspectStyle}
      onClick={onClick}
      className={`relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F4EFE6] to-[#E8E0D2] select-none ${containerClassName}`}
    >
      {/* Subtle Shimmer Placeholder while loading */}
      {!isLoaded && !hasFailedCompletely && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
      )}

      {/* Branded Fallback if all sources fail */}
      {hasFailedCompletely ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF7F2] to-[#E8E0D2] text-[#1A1A1A]">
          <div className="w-12 h-12 rounded-full bg-white/80 border border-[#E8E0D2] flex items-center justify-center mb-2 shadow-xs">
            <Scissors className="w-5 h-5 text-[#B8572B]" />
          </div>
          <span className="font-display font-bold text-sm tracking-tight">Adel Barber</span>
          <span className="text-[11px] text-[#57534E] mt-0.5 font-medium">Huddersfield</span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}
    </div>
  );
};
