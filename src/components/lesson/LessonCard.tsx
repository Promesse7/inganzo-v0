import React from "react";
import Card from "../ui/Card";

export type LessonSummary = {
	id: string;
	title: string;
	era: string;
	durationMin?: number;
	difficulty?: "easy" | "medium" | "hard";
	points?: number;
};

type Props = {
	lesson: LessonSummary;
	onOpen?: (id: string) => void;
};

const LessonCard: React.FC<Props> = ({ lesson, onOpen }) => {
	return (
		<Card className="cursor-pointer transition hover:shadow-md" onClick={() => onOpen?.(lesson.id)}>
			<div className="flex items-start justify-between">
				<div>
					<div className="text-sm text-gray-500">{lesson.era}</div>
					<div className="mt-1 text-lg font-semibold">{lesson.title}</div>
				</div>
				{lesson.points ? <div className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-800">+{lesson.points} pts</div> : null}
			</div>
			<div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
				{lesson.durationMin ? <span>{lesson.durationMin}m</span> : null}
				{lesson.difficulty ? <span className="capitalize">{lesson.difficulty}</span> : null}
			</div>
		</Card>
	);
};

export default LessonCard;


