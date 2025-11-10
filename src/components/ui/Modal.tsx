import React from "react";

type Props = {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ open, onClose, title, children }) => {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
			<div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-lg">
				<div className="flex items-center justify-between">
					<div className="text-lg font-semibold">{title}</div>
					<button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100" aria-label="Close">
						✕
					</button>
				</div>
				<div className="mt-3">{children}</div>
			</div>
		</div>
	);
};

export default Modal;


