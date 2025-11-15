import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TFQuestion = {
  id: string;
  type: 'truefalse';
  prompt: string;
  correct: boolean;
  mediaRef?: string;
};

type Props = {
  question: TFQuestion;
  onAnswer: (answer: boolean, isCorrect: boolean) => void;
  disabled?: boolean;
};

export default function QuestionTF({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (answer: boolean) => {
    if (disabled || selected !== null) return;
    
    setSelected(answer);
    const isCorrect = answer === question.correct;
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(answer, isCorrect);
      setShowFeedback(false);
      setSelected(null);
    }, isCorrect ? 1500 : 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
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

      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => handleSelect(true)}
          disabled={disabled || selected !== null}
          className={cn(
            "relative group p-12 rounded-2xl text-2xl font-bold",
            "border-4 transition-all duration-300 transform",
            "hover:scale-[1.05] active:scale-[0.95]",
            selected === true && !showFeedback && "border-primary bg-primary/10 scale-[1.05]",
            selected === true && showFeedback && question.correct && "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/30",
            selected === true && showFeedback && !question.correct && "border-red-500 bg-red-500/20 shadow-lg shadow-red-500/30 animate-shake",
            selected === false && showFeedback && question.correct && "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/30",
            !selected && !disabled && "hover:border-primary/50 hover:bg-primary/5 border-border",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-green-500">✓</span>
            <span>True</span>
            {selected === true && showFeedback && question.correct && (
              <CheckCircle2 className="absolute top-4 right-4 h-6 w-6 text-green-500 animate-scale-in" />
            )}
            {selected === true && showFeedback && !question.correct && (
              <XCircle className="absolute top-4 right-4 h-6 w-6 text-red-500 animate-scale-in" />
            )}
          </div>
        </button>

        <button
          onClick={() => handleSelect(false)}
          disabled={disabled || selected !== null}
          className={cn(
            "relative group p-12 rounded-2xl text-2xl font-bold",
            "border-4 transition-all duration-300 transform",
            "hover:scale-[1.05] active:scale-[0.95]",
            selected === false && !showFeedback && "border-primary bg-primary/10 scale-[1.05]",
            selected === false && showFeedback && !question.correct && "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/30",
            selected === false && showFeedback && question.correct && "border-red-500 bg-red-500/20 shadow-lg shadow-red-500/30 animate-shake",
            selected === true && showFeedback && !question.correct && "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/30",
            !selected && !disabled && "hover:border-primary/50 hover:bg-primary/5 border-border",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-red-500">✗</span>
            <span>False</span>
            {selected === false && showFeedback && !question.correct && (
              <CheckCircle2 className="absolute top-4 right-4 h-6 w-6 text-green-500 animate-scale-in" />
            )}
            {selected === false && showFeedback && question.correct && (
              <XCircle className="absolute top-4 right-4 h-6 w-6 text-red-500 animate-scale-in" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

