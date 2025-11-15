import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ImageQuestion = {
  id: string;
  type: 'image';
  prompt: string;
  images: Array<{ url: string; label: string }>;
  correct: string; // label of correct image
  mediaRef?: string;
};

type Props = {
  question: ImageQuestion;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
};

export default function QuestionImage({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (label: string) => {
    if (disabled || selected) return;
    
    setSelected(label);
    const isCorrect = label === question.correct;
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(label, isCorrect);
      setShowFeedback(false);
      setSelected(null);
    }, isCorrect ? 1500 : 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {question.prompt}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {question.images.map((image, index) => {
          const isSelected = selected === image.label;
          const isCorrect = image.label === question.correct;
          const showCorrect = showFeedback && isCorrect;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleSelect(image.label)}
              disabled={disabled || !!selected}
              className={cn(
                "relative group aspect-square rounded-2xl overflow-hidden",
                "border-4 transition-all duration-300 transform",
                "hover:scale-[1.05] active:scale-[0.95]",
                isSelected && !showFeedback && "border-primary scale-[1.05]",
                showCorrect && "border-green-500 shadow-lg shadow-green-500/30",
                showIncorrect && "border-red-500 shadow-lg shadow-red-500/30 animate-shake",
                !selected && !disabled && "hover:border-primary/50 border-border",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <img
                src={image.url}
                alt={image.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-white font-semibold text-sm">{image.label}</span>
              </div>
              {showCorrect && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="h-6 w-6 text-green-500 bg-white rounded-full animate-scale-in" />
                </div>
              )}
              {showIncorrect && (
                <div className="absolute top-2 right-2">
                  <XCircle className="h-6 w-6 text-red-500 bg-white rounded-full animate-scale-in" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

