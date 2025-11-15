import { Trophy, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  currentXP: number;
  xpGained: number;
  nextLevelXP?: number;
  level?: number;
  animated?: boolean;
};

export default function XPBar({ 
  currentXP, 
  xpGained, 
  nextLevelXP = 100, 
  level = 1,
  animated = false 
}: Props) {
  const progress = (currentXP % nextLevelXP) / nextLevelXP * 100;
  const displayXP = currentXP % nextLevelXP;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-accent" />
          <span className="font-semibold">Level {level}</span>
        </div>
        <div className="flex items-center gap-2">
          {xpGained > 0 && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full",
              "bg-green-500/20 text-green-500 font-semibold",
              animated && "animate-scale-in"
            )}>
              <Zap className="h-3 w-3" />
              <span>+{xpGained} XP</span>
            </div>
          )}
          <span className="text-muted-foreground">
            {displayXP} / {nextLevelXP} XP
          </span>
        </div>
      </div>
      
      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            "bg-gradient-to-r from-accent to-primary",
            "shadow-lg shadow-accent/50"
          )}
          style={{ 
            width: animated ? `${progress}%` : '0%',
            transition: animated ? 'width 1s ease-out' : 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}

