import React from "react";

type Props = {
	name: string;
	imageUrl?: string;
	level?: "beginner" | "intermediate" | "expert";
};

const levelToRing = {
	beginner: "ring-gray-300",
	intermediate: "ring-emerald-500",
	expert: "ring-amber-400",
};

const AvatarWithBadge: React.FC<Props> = ({ name, imageUrl, level = "beginner" }) => {
	const initials = name
		.split(" ")
		.map((p) => p[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
	return (
		<div className={`inline-flex h-14 w-14 items-center justify-center rounded-full ring-4 ${levelToRing[level]}`}>
			{imageUrl ? (
				<img src={imageUrl} alt={name} className="h-12 w-12 rounded-full object-cover" />
			) : (
				<div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-semibold">
					{initials}
				</div>
			)}
		</div>
	);
};

export default AvatarWithBadge;


