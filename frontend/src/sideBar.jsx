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

	const navItems = [
		{ to: "/home", key: "home", label: "H" },
		{ to: "/media", key: "media", label: "M" },
		{ to: "/api", key: "api", label: "A" },
		{ to: "/account", key: "account", label: "U" },
	];

	const mapped = (i) => (
		<div className="flex justify-center">
			<span className={`w-full h-9 flex items-center justify-center
				text-white font-semibold
				hover:bg-blue-500 transition ${currentLocation === i.key ? "bg-blue-600" : "bg-zinc-800"}`}>
			{i.label}
			</span>
		</div>
	);


	return (
		<div className="w-full h-full flex flex-col bg-zinc-900/50 border-r border-zinc-300/20">
			<div className="bg-zinc-300/10 flex flex-row items-center p-1">
				{showSide &&
					<div className="p-2">
						<Link to={"/account"} className="capitalize flex flex-row items-center group transition-all duration-300">
							<img src={user?.image} alt="" className="h-5 w-5 rounded"/>
							<span className="hover:underline group-hover:px-2 w-0 overflow-hidden whitespace-nowrap group-hover:w-full transition-w duration-300 text-sm text-white">
								{user?.name || "User"}
							</span>				
						</Link>					
					</div>
				}
				<div className={`w-fit p-2 ml-auto cursor-pointer hover:bg-zinc-600/40 ${showSide ? "rounded" : ""}`} onClick={() => setShowSide(e => !e)}>
					<FaBars />
				</div>
			</div>

			{showSide ? (
				<div className="h-full flex flex-col gap-3 text-sm">

					<div className="flex flex-col font-mono">
						<Link to="/home" className={`px-3 py-2 hover:bg-zinc-500/40 ${currentLocation === "home" && "bg-zinc-200/10"}`}>home</Link>
						<Link to="/media" className={`px-3 py-2 hover:bg-zinc-500/40 ${currentLocation === "media" && "bg-zinc-200/10"}`}>media</Link>
						<Link to="/api" className={`px-3 py-2 hover:bg-zinc-500/40 ${currentLocation === "api" && "bg-zinc-200/10"}`}>api</Link>
						<Link to="/account" className={`px-3 py-2 hover:bg-zinc-500/40 ${currentLocation === "account" && "bg-zinc-200/10"}`}>account</Link>
					</div>

					{user && 
					<button 
						onClick={handleLogout} 
						className="mt-auto text-left px-3 py-2 font-mono text-red-400/80 bg-red-500/10 hover:bg-red-400/20"
					>
						logout
					</button>
					}
				</div>
			)
			:
			<div className="h-full flex flex-col gap-3 text-sm">
				<div className="w-full flex flex-col gap-2 mt-2 font-mono">
					{navItems.map((item) => (
						<Link
							key={item.key}
							to={item.to}
							className={`w-full transition`}
						>
							{mapped(item)}
						</Link>
					))}
				</div>

				{user && (
					<button
					onClick={handleLogout}
					className="mt-auto px-3 py-2 font-mono text-red-400/80 bg-red-500/10 hover:bg-red-400/20 cursor-pointer"
					>
					l
					</button>
				)}
			</div>
			}
		</div>
	);
};

export default SideBar;
