import React from "react";
import Button from "../ui/Button";

export type Fill = {
	id: string;
	type: "fill";
	prompt: string;
	answer: string;
	points?: number;
};

type Props = {
	question: Fill;
	onAnswer: (text: string, msTaken: number) => void;
	disabled?: boolean;
};

const QuestionFill: React.FC<Props> = ({ question, onAnswer, disabled }) => {
	const [text, setText] = React.useState("");
	const startedAtRef = React.useRef<number>(Date.now());
	const submit = () => {
		const msTaken = Date.now() - startedAtRef.current;
		onAnswer(text, msTaken);
	};
	return (
		<div>
			<div className="text-lg font-semibold">{question.prompt}</div>
			<input
				className="mt-4 w-full rounded-2xl border px-4 py-2"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Type your answer"
				disabled={disabled}
			/>
			<Button className="mt-3" onClick={submit} disabled={disabled || !text.trim()}>
				Submit
			</Button>
		</div>
	);
};

export default QuestionFill;


