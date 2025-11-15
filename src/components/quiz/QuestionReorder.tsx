import { useState } from 'react';
import { CheckCircle2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type ReorderQuestion = {
  id: string;
  type: 'reorder';
  prompt: string;
  items: string[];
  correctOrder: string[];
  mediaRef?: string;
};

type Props = {
  question: ReorderQuestion;
  onAnswer: (order: string[], isCorrect: boolean) => void;
  disabled?: boolean;
};

export default function QuestionReorder({ question, onAnswer, disabled }: Props) {
  const [items, setItems] = useState<string[]>(() => 
    [...question.items].sort(() => Math.random() - 0.5)
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDragStart = (index: number) => {
    if (disabled || showFeedback) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSubmit = () => {
    if (disabled || showFeedback) return;
    
    const isCorrect = JSON.stringify(items) === JSON.stringify(question.correctOrder);
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(items, isCorrect);
      setShowFeedback(false);
    }, isCorrect ? 1500 : 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {question.prompt}
        </h2>
        {question.mediaRef && (
          <img 
            src={question.mediaRef} 
            alt="Question media" 
            className="mx-auto rounded-xl max-h-64 object-cover shadow-lg"
          />
        )}
        <p className="text-sm text-muted-foreground mt-2">
          Drag items to reorder them chronologically
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            draggable={!disabled && !showFeedback}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border-2 cursor-move",
              "bg-card hover:bg-accent/5 transition-all duration-200",
              draggedIndex === index && "opacity-50 scale-95",
              showFeedback && items[index] === question.correctOrder[index] && "border-green-500 bg-green-500/20"
            )}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1 font-medium">{item}</span>
            <span className="text-muted-foreground font-bold w-8 text-center">
              {index + 1}
            </span>
            {showFeedback && items[index] === question.correctOrder[index] && (
              <CheckCircle2 className="h-5 w-5 text-green-500 animate-scale-in" />
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={disabled || showFeedback}
        size="lg"
        className="w-full"
      >
        {showFeedback ? 'Checking...' : 'Submit Order'}
      </Button>
    </div>
  );
}

