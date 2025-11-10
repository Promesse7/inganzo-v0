import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<footer className="border-t bg-white">
			<div className="container mx-auto grid gap-4 px-4 py-8 text-sm text-gray-600 md:grid-cols-3">
				<div>
					<div className="font-semibold text-emerald-800">INGANZO</div>
					<p className="mt-2">Learning Rwanda’s history through stories, lessons, and quizzes.</p>
				</div>
				<div className="space-y-2">
					<div className="font-semibold text-gray-800">Links</div>
					<ul className="space-y-1">
						<li><Link to="/lessons" className="hover:text-emerald-800">Lessons</Link></li>
						<li><Link to="/upload" className="hover:text-emerald-800">Upload</Link></li>
						<li><Link to="/profile" className="hover:text-emerald-800">Profile</Link></li>
					</ul>
				</div>
				<div className="space-y-2">
					<div className="font-semibold text-gray-800">Legal</div>
					<ul className="space-y-1">
						<li><a className="hover:text-emerald-800" href="#">Privacy</a></li>
						<li><a className="hover:text-emerald-800" href="#">Terms</a></li>
						<li><a className="hover:text-emerald-800" href="#">Contact</a></li>
					</ul>
				</div>
			</div>
			<div className="border-t py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Inganzo</div>
		</footer>
	);
};

export default Footer;


