import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Award, TrendingUp, ArrowRight } from "lucide-react";

type Lesson = { 
  id: string; 
  title: string; 
  era: string; 
  duration: string; 
  difficulty: string; 
  points: number;
}

type Props = {
  lesson: Lesson;
  onOpen?: (id: string) => void;
}

export default function LessonCard({ lesson, onOpen }: Props) {
  const difficultyColors = {
    Beginner: "text-green-400",
    Intermediate: "text-yellow-400",
    Advanced: "text-red-400"
  };

  return (
    <Card 
      className="group relative overflow-hidden glass-dark border-border/50 hover:border-primary/50 transition-all duration-300 card-hover cursor-pointer"
      onClick={() => onOpen?.(lesson.id)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-accent/10 transition-all duration-500" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 shimmer" />
      
      <CardHeader className="relative z-10 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
            {lesson.era}
          </span>
          <div className="flex items-center gap-1 text-accent">
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold">+{lesson.points}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {lesson.title}
        </h3>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration}</span>
          </div>
          <div className={`flex items-center gap-1.5 ${difficultyColors[lesson.difficulty as keyof typeof difficultyColors] || "text-muted-foreground"}`}>
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">{lesson.difficulty}</span>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full group/btn justify-between hover:bg-primary/10 hover:text-primary transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onOpen?.(lesson.id);
          }}
        >
          <span>Start Lesson</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
