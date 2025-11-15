import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MCQQuestion = {
  id: string;
  type: 'mcq';
  prompt: string;
  options: string[];
  correct: string;
  mediaRef?: string;
};

type Props = {
  question: MCQQuestion;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
};

export default function QuestionMCQ({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (option: string) => {
    if (disabled || selected) return;
    
    setSelected(option);
    const isCorrect = option === question.correct;
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(option, isCorrect);
      setShowFeedback(false);
      setSelected(null);
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
      </div>

      <div className="grid gap-4">
        {question.options.map((option, index) => {
          const isSelected = selected === option;
          const isCorrect = option === question.correct;
          const showCorrect = showFeedback && isCorrect;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={disabled || !!selected}
              className={cn(
                "relative group w-full p-6 rounded-2xl text-left font-semibold text-lg",
                "border-2 transition-all duration-300 transform",
                "hover:scale-[1.02] active:scale-[0.98]",
                !selected && !disabled && "hover:border-primary/50 hover:bg-primary/5",
                isSelected && !showFeedback && "border-primary bg-primary/10 scale-[1.02]",
                showCorrect && "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/30",
                showIncorrect && "border-red-500 bg-red-500/20 shadow-lg shadow-red-500/30 animate-shake",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option}</span>
                {showCorrect && (
                  <CheckCircle2 className="h-6 w-6 text-green-500 animate-scale-in" />
                )}
                {showIncorrect && (
                  <XCircle className="h-6 w-6 text-red-500 animate-scale-in" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
