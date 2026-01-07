import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkMode from "./dark";

const Header = function ({ user, dark, setDark }) {
	const location = useLocation();
	const [currentLocation, setCurrentLocation] = useState("home");

	useEffect(() => {
		setCurrentLocation(location.pathname.split("/")[1] || "home");
	}, [location]);

	const handleLogout = function () {
		const email = localStorage.getItem("media-email");
		if (email) {
		localStorage.removeItem("media-email");
		window.location.reload();
		}
	};

	const linkClass = (page) =>
		`font-mono px-2 p-1 rounded cursor-pointer transition-colors duration-300 ${
		currentLocation === page
			? dark
			? "bg-zinc-700/40 text-white"
			: "bg-zinc-200/40 text-zinc-900"
			: dark
			? "text-zinc-300 hover:bg-zinc-600/50"
			: "text-zinc-700 hover:bg-zinc-200/50"
		}`;

	return (
		<div
			className={`w-full h-fit text-sm sm:text-md transition-colors duration-500 ${
				dark ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-300"
			} border-b`}
		>
			<div className="w-full flex flex-row items-center p-2">
				<div
					className={`px-1 p-1 rounded transition-colors duration-300 ${
						dark ? "bg-zinc-800/20 hover:bg-zinc-700/30" : "bg-zinc-200/10 hover:bg-zinc-300/20"
					}`}
				>
				{user ? (
					<Link
						to={"/account"}
						className="capitalize flex flex-row items-center group transition-all duration-300"
					>
						<img src={user?.image} alt="" className="h-5 w-5 rounded" />
						<span
							className={`group-hover:px-2 w-0 overflow-hidden whitespace-nowrap group-hover:w-full transition-all duration-300 ${
							dark ? "text-white" : "text-zinc-900"
							}`}
						>
							{user?.name || "User"}
						</span>
					</Link>
				) : (
					<Link
						to={"/login"}
						className={`${dark ? "text-white hover:text-zinc-300" : "text-zinc-900 hover:text-zinc-700"} cursor-pointer`}
					>
						Sign in
					</Link>
				)}
				</div>

				<DarkMode dark={dark} setDark={setDark}/>

				<div className="ml-auto flex flex-row gap-1">
					<Link to={"/home"} className={linkClass("home")}>home</Link>
					<Link to={"/media"} className={linkClass("media")}>media</Link>
					<Link to={"/api"} className={linkClass("api")}>api</Link>
					<Link to={"/log"} className={linkClass("log")}>log</Link>
					<Link to={"/account"} className={linkClass("account")}>account</Link>
				</div>

				{user && (
				<button
					className={`ml-1 font-mono px-2 p-1 rounded cursor-pointer transition-colors duration-300 ${
					dark
						? "text-red-400/80 bg-red-500/5 hover:bg-red-400/20 focus:bg-red-400/40"
						: "text-red-600/80 bg-red-100/20 hover:bg-red-200/40 focus:bg-red-300/40"
					}`}
					onClick={handleLogout}
				>
					logout
				</button>
				)}
			</div>
		</div>
	);
};

export default Header;
