import React from "react";

type Entry = { userId: string; points: number };

export function useLeaderboard(limit = 10) {
	const [entries, setEntries] = React.useState<Entry[]>([]);
	React.useEffect(() => {
		// TODO: fetch from backend
		setEntries([
			{ userId: "alice", points: 120 },
			{ userId: "bob", points: 95 },
		].slice(0, limit));
	}, [limit]);
	return { entries };
}


