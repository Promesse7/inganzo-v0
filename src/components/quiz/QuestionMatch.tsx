import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type MatchQuestion = {
  id: string;
  type: 'match';
  prompt: string;
  terms: string[];
  definitions: string[];
  correctPairs: Record<string, string>; // term -> definition
  mediaRef?: string;
};

type Props = {
  question: MatchQuestion;
  onAnswer: (pairs: Record<string, string>, isCorrect: boolean) => void;
  disabled?: boolean;
};

export default function QuestionMatch({ question, onAnswer, disabled }: Props) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [matchedTerms, setMatchedTerms] = useState<Set<string>>(new Set());
  const [matchedDefinitions, setMatchedDefinitions] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);

  const handleTermClick = (term: string) => {
    if (disabled || matchedTerms.has(term) || showFeedback) return;
    
    if (selectedTerm === term) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(term);
      if (selectedDefinition) {
        handlePair(term, selectedDefinition);
      }
    }
  };

  const handleDefinitionClick = (definition: string) => {
    if (disabled || matchedDefinitions.has(definition) || showFeedback) return;
    
    if (selectedDefinition === definition) {
      setSelectedDefinition(null);
    } else {
      setSelectedDefinition(definition);
      if (selectedTerm) {
        handlePair(selectedTerm, definition);
      }
    }
  };

  const handlePair = (term: string, definition: string) => {
    const isCorrect = question.correctPairs[term] === definition;
    
    if (isCorrect) {
      setPairs({ ...pairs, [term]: definition });
      setMatchedTerms(new Set([...matchedTerms, term]));
      setMatchedDefinitions(new Set([...matchedDefinitions, definition]));
      setSelectedTerm(null);
      setSelectedDefinition(null);
    } else {
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedTerm(null);
        setSelectedDefinition(null);
      }, 1000);
    }
  };

  const handleSubmit = () => {
    if (disabled || showFeedback) return;
    
    const allMatched = question.terms.every(term => pairs[term] !== undefined);
    const isCorrect = allMatched && 
      Object.entries(pairs).every(([term, def]) => question.correctPairs[term] === def);
    
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(pairs, isCorrect);
      setShowFeedback(false);
    }, isCorrect ? 1500 : 2000);
  };

  const availableTerms = question.terms.filter(t => !matchedTerms.has(t));
  const availableDefinitions = question.definitions.filter(d => !matchedDefinitions.has(d));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
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
          Click a term, then click its matching definition
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Terms Column */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4">Terms</h3>
          {question.terms.map((term) => {
            const isMatched = matchedTerms.has(term);
            const isSelected = selectedTerm === term;
            
            return (
              <button
                key={term}
                onClick={() => handleTermClick(term)}
                disabled={disabled || isMatched || showFeedback}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all duration-300",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  isMatched && "border-green-500 bg-green-500/20 opacity-60 cursor-not-allowed",
                  isSelected && !isMatched && "border-primary bg-primary/10 scale-[1.02]",
                  !isSelected && !isMatched && !disabled && "hover:border-primary/50 hover:bg-primary/5 border-border",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{term}</span>
                  {isMatched && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Definitions Column */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4">Definitions</h3>
          {question.definitions.map((definition) => {
            const isMatched = matchedDefinitions.has(definition);
            const isSelected = selectedDefinition === definition;
            
            return (
              <button
                key={definition}
                onClick={() => handleDefinitionClick(definition)}
                disabled={disabled || isMatched || showFeedback}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all duration-300",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  isMatched && "border-green-500 bg-green-500/20 opacity-60 cursor-not-allowed",
                  isSelected && !isMatched && "border-primary bg-primary/10 scale-[1.02]",
                  !isSelected && !isMatched && !disabled && "hover:border-primary/50 hover:bg-primary/5 border-border",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{definition}</span>
                  {isMatched && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={disabled || showFeedback || Object.keys(pairs).length !== question.terms.length}
        size="lg"
        className="w-full"
      >
        {showFeedback ? 'Checking...' : `Submit (${Object.keys(pairs).length}/${question.terms.length} matched)`}
      </Button>
    </div>
  );
}

