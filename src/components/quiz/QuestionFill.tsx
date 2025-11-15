import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export type FillQuestion = {
  id: string;
  type: 'fill';
  prompt: string;
  correct: string;
  hint?: string;
  mediaRef?: string;
};

type Props = {
  question: FillQuestion;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
};

export default function QuestionFill({ question, onAnswer, disabled }: Props) {
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (disabled || !answer.trim()) return;
    
    const isCorrect = answer.trim().toLowerCase() === question.correct.toLowerCase();
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(answer.trim(), isCorrect);
      setShowFeedback(false);
      setAnswer('');
    }, isCorrect ? 1500 : 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
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

      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled || showFeedback}
            placeholder="Type your answer..."
            className={cn(
              "text-lg p-6 rounded-2xl border-2 transition-all duration-300",
              showFeedback && answer.trim().toLowerCase() === question.correct.toLowerCase() && "border-green-500 bg-green-500/20",
              showFeedback && answer.trim().toLowerCase() !== question.correct.toLowerCase() && "border-red-500 bg-red-500/20 animate-shake"
            )}
          />
          {showFeedback && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {answer.trim().toLowerCase() === question.correct.toLowerCase() ? (
                <CheckCircle2 className="h-6 w-6 text-green-500 animate-scale-in" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500 animate-scale-in" />
              )}
            </div>
          )}
        </div>

        {question.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {showHint ? 'Hide' : 'Show'} Hint
          </button>
        )}

        {showHint && question.hint && (
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-sm">
            💡 {question.hint}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={disabled || !answer.trim() || showFeedback}
          size="lg"
          className="w-full"
        >
          Submit Answer
        </Button>

        {showFeedback && answer.trim().toLowerCase() !== question.correct.toLowerCase() && (
          <div className="p-4 rounded-xl bg-muted border border-border">
            <p className="text-sm text-muted-foreground mb-1">Correct answer:</p>
            <p className="font-semibold text-foreground">{question.correct}</p>
          </div>
        )}
      </div>
    </div>
  );
}
