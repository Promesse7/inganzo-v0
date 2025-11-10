import React from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";

type Props = {
	title: string;
	summary: string;
	transcript?: string;
	onStartQuiz?: () => void;
};

const LessonDetail: React.FC<Props> = ({ title, summary, transcript, onStartQuiz }) => {
	return (
		<div className="grid gap-6 md:grid-cols-3">
			<Card className="md:col-span-2">
				<h1 className="text-2xl font-bold">{title}</h1>
				<p className="mt-3 text-gray-700">{summary}</p>
				{transcript ? (
					<div className="mt-6">
						<div className="font-semibold">Transcript</div>
						<p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{transcript}</p>
					</div>
				) : null}
			</Card>
			<div className="space-y-4">
				<Card>
					<div className="text-lg font-semibold">Ready to test yourself?</div>
					<Button className="mt-3 w-full" onClick={onStartQuiz}>
						Take Quiz
					</Button>
				</Card>
			</div>
		</div>
	);
};

export default LessonDetail;


