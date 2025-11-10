import React from "react";
import Card from "./Card";

type Badge = { id: string; name: string; description?: string };

type Props = {
	badges: Badge[];
};

const BadgeList: React.FC<Props> = ({ badges }) => {
	if (!badges?.length) {
		return <div className="text-sm text-gray-500">No badges yet. Keep learning to unlock some!</div>;
	}
	return (
		<div className="grid grid-cols-2 gap-3 md:grid-cols-3">
			{badges.map((b) => (
				<Card key={b.id} className="flex items-center gap-3">
					<div className="h-10 w-10 rounded-full bg-amber-100" />
					<div>
						<div className="font-semibold">{b.name}</div>
						<div className="text-xs text-gray-500">{b.description}</div>
					</div>
				</Card>
			))}
		</div>
	);
};

export default BadgeList;


