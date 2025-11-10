import React from "react";
import Button from "../ui/Button";

export type MCQ = {
	id: string;
	type: "mcq";
	prompt: string;
	options: string[];
	correct: string;
	points?: number;
};

type Props = {
	question: MCQ;
	onAnswer: (choice: string, msTaken: number) => void;
	disabled?: boolean;
};

const QuestionMCQ: React.FC<Props> = ({ question, onAnswer, disabled }) => {
	const startedAtRef = React.useRef<number>(Date.now());
	const handle = (choice: string) => {
		const msTaken = Date.now() - startedAtRef.current;
		onAnswer(choice, msTaken);
	};
	return (
		<div>
			<div className="text-lg font-semibold">{question.prompt}</div>
			<div className="mt-4 grid gap-3">
				{question.options.map((opt) => (
					<Button key={opt} onClick={() => handle(opt)} disabled={disabled} className="justify-start">
						{opt}
					</Button>
				))}
			</div>
		</div>
	);
};

export default QuestionMCQ;


