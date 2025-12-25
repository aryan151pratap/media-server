import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const SideBar = function ({ showSide, setShowSide, user }) {
	const location = useLocation();
	const [currentLocation, setCurrentLocation] = useState("home");

	useEffect(() => {
		setCurrentLocation(location.pathname.split("/")[1] || "home");
	}, [location]);

	const handleLogout = () => {
		const email = localStorage.getItem("media-email");
		if (email) {
			localStorage.removeItem("media-email");
			window.location.reload();
		}
	};

	return (
		<div className="h-full flex flex-col bg-zinc-900/50 border-r border-zinc-300/20">
			<div className={`w-fit p-2 ml-auto cursor-pointer bg-zinc-300/20 hover:bg-zinc-600/40 ${showSide ? "rounded-bl" : ""}`} onClick={() => setShowSide(e => !e)}>
				<FaBars />
			</div>

			{showSide && (
				<div className="h-full w-[220px] flex flex-col gap-3 p-3 text-sm">
					<div className="bg-zinc-300/10 rounded px-3 py-2">
						{user ? <span className="capitalize text-zinc-200">{user.name}</span> : <Link to="/login" className="text-zinc-300 hover:underline">Sign in</Link>}
					</div>

					<div className="flex flex-col gap-1 font-mono">
						<Link to="/home" className={`px-3 py-2 rounded hover:bg-zinc-500/40 ${currentLocation === "home" && "bg-zinc-200/10"}`}>home</Link>
						<Link to="/media" className={`px-3 py-2 rounded hover:bg-zinc-500/40 ${currentLocation === "media" && "bg-zinc-200/10"}`}>media</Link>
						<Link to="/api" className={`px-3 py-2 rounded hover:bg-zinc-500/40 ${currentLocation === "api" && "bg-zinc-200/10"}`}>api</Link>
					</div>

					{user && 
					<button 
						onClick={handleLogout} 
						className="mt-auto text-left px-3 py-2 rounded font-mono text-red-400/80 bg-red-500/10 hover:bg-red-400/20"
					>
						logout
					</button>
					}
				</div>
			)}
		</div>
	);
};

export default SideBar;
