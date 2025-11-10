import React from "react";
import ProgressBar from "./ProgressBar";
import QuestionMCQ, { MCQ } from "./QuestionMCQ";
import QuestionFill, { Fill } from "./QuestionFill";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { getQuizByLessonId } from "../../lib/mockData";
import { postQuizAttempt } from "../../lib/api";
import { useOfflineQueue } from "../../hooks/useOfflineQueue";
import { useAuth } from "../../hooks/useAuth";

type AnyQ = MCQ | Fill;

const calcSpeedBonus = (ms: number) => {
	const s = ms / 1000;
	if (s < 10) return 5;
	if (s < 30) return 2;
	return 0;
};

const QuizRunner: React.FC<{ lessonId: string }> = ({ lessonId }) => {
	const quiz = React.useMemo(() => getQuizByLessonId(lessonId), [lessonId]);
	const [idx, setIdx] = React.useState(0);
	const [streak, setStreak] = React.useState(0);
	const [score, setScore] = React.useState(0);
	const [answers, setAnswers] = React.useState<{ id: string; given: string; correct: boolean; ms: number; points: number }[]>([]);
	const [showSummary, setShowSummary] = React.useState(false);
	const queue = useOfflineQueue();
	const { user } = useAuth();

	if (!quiz) return <div>No quiz found.</div>;
	const question = quiz.questions[idx] as AnyQ | undefined;

	const onAnswer = (choiceOrText: string, ms: number) => {
		if (!question) return;
		const isCorrect =
			(question as MCQ).type === "mcq"
				? (question as MCQ).correct === choiceOrText
				: choiceOrText.trim().toLowerCase() === (question as Fill).answer.trim().toLowerCase();
		const base = isCorrect ? 10 : 0;
		const bonus = isCorrect ? calcSpeedBonus(ms) : 0;
		const multiplier = isCorrect ? Math.min(2, 1 + 0.1 * Math.max(0, (isCorrect ? streak + 1 : 0) - 1)) : 1;
		const pts = Math.round((base + bonus) * multiplier);
		const nextStreak = isCorrect ? streak + 1 : 0;
		setStreak(nextStreak);
		setScore((s) => s + pts);
		setAnswers((a) => [...a, { id: question.id, given: choiceOrText, correct: isCorrect, ms, points: pts }]);
		if (idx + 1 < quiz.questions.length) {
			setIdx((i) => i + 1);
		} else {
			setShowSummary(true);
		}
	};

	const submitAttempt = async () => {
		const payload = {
			userId: user?.uid || "anonymous",
			quizId: quiz.id,
			answers: answers,
			timestamps: { startedAt: 0, finishedAt: Date.now() },
		};
		try {
			await postQuizAttempt(quiz.id, payload);
		} catch {
			queue.enqueue({ type: "quizAttempt", payload: { quizId: quiz.id, data: payload } });
		}
	};

	return (
		<div className="mx-auto max-w-2xl">
			<Card>
				<div className="mb-4">
					<ProgressBar value={(idx / quiz.questions.length) * 100} />
				</div>
				{question?.type === "mcq" ? (
					<QuestionMCQ question={question as MCQ} onAnswer={onAnswer} />
				) : (
					<QuestionFill question={question as Fill} onAnswer={onAnswer} />
				)}
			</Card>
			<Modal
				open={showSummary}
				onClose={() => setShowSummary(false)}
				title="Quiz Summary"
			>
				<div className="space-y-2">
					<div className="text-2xl font-bold">Score: {score}</div>
					<div className="text-sm text-gray-600">Questions: {quiz.questions.length}</div>
					<Button
						className="mt-3 w-full"
						onClick={async () => {
							await submitAttempt();
							setShowSummary(false);
						}}
					>
						Submit to Leaderboard
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default QuizRunner;


