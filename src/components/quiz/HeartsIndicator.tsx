import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  hearts: number;
  maxHearts?: number;
  onHeartLost?: () => void;
};

export default function HeartsIndicator({ hearts, maxHearts = 5, onHeartLost }: Props) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: maxHearts }).map((_, index) => {
        const isActive = index < hearts;
        const isLost = index >= hearts;
        
        return (
          <div
            key={index}
            className={cn(
              "transition-all duration-500",
              isLost && "animate-shake opacity-0 scale-0"
            )}
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-colors duration-300",
                isActive ? "fill-red-500 text-red-500" : "fill-gray-300 text-gray-300"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

