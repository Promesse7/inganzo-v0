import React from "react";

type QueueItem =
	| { type: "quizAttempt"; payload: { quizId: string; data: any } }
	| { type: "uploadMetadata"; payload: { data: any } };

const KEY = "inganzo_offline_queue_v1";

function load(): QueueItem[] {
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? (JSON.parse(raw) as QueueItem[]) : [];
	} catch {
		return [];
	}
}

function save(items: QueueItem[]) {
	try {
		localStorage.setItem(KEY, JSON.stringify(items));
	} catch {
		// ignore
	}
}

export function useOfflineQueue() {
	const [items, setItems] = React.useState<QueueItem[]>(() => load());

	const enqueue = (item: QueueItem) => {
		setItems((prev) => {
			const next = [...prev, item];
			save(next);
			return next;
		});
	};

	const dequeue = () => {
		setItems((prev) => {
			const next = prev.slice(1);
			save(next);
			return next;
		});
	};

	return { items, enqueue, dequeue };
}


