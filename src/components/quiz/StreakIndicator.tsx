import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  streak: number;
  show?: boolean;
};

export default function StreakIndicator({ streak, show = true }: Props) {
  if (!show || streak < 3) return null;

  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full",
      "bg-gradient-to-r from-orange-500 to-red-500 text-white",
      "shadow-lg shadow-orange-500/50 animate-glow",
      "animate-fade-in"
    )}>
      <Flame className="h-5 w-5 animate-pulse" />
      <span className="font-bold text-lg">{streak}</span>
      <span className="font-semibold">Streak!</span>
    </div>
  );
}

