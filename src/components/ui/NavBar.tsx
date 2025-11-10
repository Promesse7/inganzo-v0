import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link to="/" className="text-xl font-semibold text-emerald-800">
					INGANZO
				</Link>
				<nav className="hidden gap-6 md:flex">
					<Link to="/lessons" className="text-sm font-medium text-gray-700 hover:text-emerald-800">
						Lessons
					</Link>
					<Link to="/upload" className="text-sm font-medium text-gray-700 hover:text-emerald-800">
						Upload
					</Link>
					<Link to="/profile" className="text-sm font-medium text-gray-700 hover:text-emerald-800">
						Profile
					</Link>
				</nav>
				<div className="flex items-center gap-3">
					<Link
						to="/login"
						className="rounded-2xl border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
					>
						Sign in
					</Link>
				</div>
			</div>
		</header>
	);
};

export default NavBar;


