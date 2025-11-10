import React from "react";

type Props = { value: number };

const ProgressBar: React.FC<Props> = ({ value }) => {
	return (
		<div className="h-2 w-full rounded bg-gray-200">
			<div className="h-2 rounded bg-emerald-600 transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
		</div>
	);
};

export default ProgressBar;


