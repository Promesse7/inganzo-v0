import { cn } from '@/lib/utils';

type Props = {
  current: number;
  total: number;
  timeLeft?: number; // seconds
  timeTotal?: number; // seconds
};

export default function ProgressBar({ current, total, timeLeft, timeTotal }: Props) {
  const progress = (current / total) * 100;
  const timeProgress = timeTotal && timeLeft ? ((timeTotal - timeLeft) / timeTotal) * 100 : 0;
  const isTimeLow = timeLeft !== undefined && timeLeft < 10;

  return (
    <div className="w-full space-y-2">
      {/* Question Progress */}
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-semibold text-foreground">
          Question {current} of {total}
        </span>
        <span className="text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            "bg-gradient-to-r from-primary to-accent",
            "shadow-lg shadow-primary/50"
          )}
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Timer Progress */}
      {timeLeft !== undefined && timeTotal && (
        <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden mt-2">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-linear",
              isTimeLow ? "bg-red-500" : "bg-accent",
              isTimeLow && "animate-pulse"
            )}
            style={{ width: `${timeProgress}%` }}
          />
          {isTimeLow && (
            <div className="absolute inset-0 bg-red-500/50 animate-pulse" />
          )}
        </div>
      )}
    </div>
  );
}
