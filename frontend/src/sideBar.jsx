import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	FaBars,
	FaHome,
	FaPhotoVideo,
	FaCode,
	FaUser,
	FaSignOutAlt,
	FaCheck
} from "react-icons/fa";

const SideBar = function ({ showSide, setShowSide, user, dark }) {
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
		{ to: "/home", key: "home", icon: <FaHome className="opacity-70" />, label: "home" },
		{ to: "/media", key: "media", icon: <FaPhotoVideo className="opacity-70" />, label: "media" },
		{ to: "/api", key: "api", icon: <FaCode className="opacity-70" />, label: "api" },
		{ to: "/log", key: "log", icon: <FaCheck className="opacity-70" />, label: "log" },
		{ to: "/account", key: "account", icon: <FaUser className="opacity-70" />, label: "account" },
	];

	const mapped = (i) => (
		<div className="flex justify-center">
			<span className={`w-full h-9 flex items-center justify-center
				font-semibold border-l-3 transition-colors duration-300
				${currentLocation === i.key 
					? dark ? "bg-blue-600 border-blue-200/80 text-white" : "bg-blue-400/50 border-blue-400 text-zinc-900" 
					: dark ? "bg-zinc-800 hover:border-blue-300/80 border-transparent text-white hover:bg-blue-500/40" 
						   : "bg-zinc-200/50 hover:border-blue-300/80 border-transparent text-zinc-900 hover:bg-blue-100/40"
				}`}>
				{i.icon}
			</span>
		</div>
	);

	const bgSide = dark ? "bg-zinc-900/50 border-zinc-300/20 text-white" : "bg-zinc-100/50 border-zinc-300/20 text-zinc-900";
	const btnBg = dark ? "bg-red-500/10 hover:bg-red-500/20" : "bg-red-200/30 hover:bg-red-200/50";
	const btnText = dark ? "text-red-400" : "text-red-700";

	return (
		<div className={`backdrop-blur-xs w-full h-full flex flex-col transition-colors duration-500 ${bgSide} border-r`}>
			<div className={`group flex flex-row items-center p-1 ${dark ? "bg-zinc-800/10" : "bg-zinc-200/20"}`}>
				{showSide &&
					<div className="p-2">
						<Link to={"/account"} className="capitalize flex flex-row items-center transition-all duration-300">
							<img src={user?.image} alt="" className="h-5 w-5 rounded"/>
							<span className="hover:underline group-hover:px-2 w-0 overflow-hidden whitespace-nowrap group-hover:w-full transition-w duration-300 text-sm">
								{user?.name || "User"}
							</span>				
						</Link>					
					</div>
				}
				<div className={`w-fit p-2 ml-auto cursor-pointer hover:bg-zinc-400/20 ${showSide ? "rounded" : ""}`} onClick={() => setShowSide(e => !e)}>
					<FaBars />
				</div>
			</div>

			{showSide ? (
				<div className="h-full flex flex-col text-sm font-mono">
					<div className="flex flex-col gap-0.5 overflow-hidden">
						{navItems.map((item) => (
							<Link
								key={item.key}
								to={item.to}
								className={`flex items-center gap-3 px-4 py-2 border-l-3 transition-colors duration-300
									${currentLocation === item.key
										? dark ? "border-blue-400 bg-zinc-800/50 text-white" : "border-blue-400 bg-blue-100 text-zinc-900"
										: dark ? "border-transparent hover:border-zinc-400/50 bg-zinc-800/20 hover:bg-zinc-700/30 text-white" 
											   : "border-transparent hover:border-zinc-400 bg-white hover:bg-blue-100/50 text-zinc-900"
									}`}>
								{item.icon}
								{item.label}
							</Link>
						))}
					</div>

					{user && (
						<button
							onClick={handleLogout}
							className={`mt-auto flex items-center gap-3 px-4 py-2 text-left rounded border-l-3 transition-colors duration-300 ${btnText} ${btnBg}`}
						>
							<FaSignOutAlt />
							logout
						</button>
					)}
				</div>
			) : (
				<div className="h-full flex flex-col gap-0.5 text-sm mt-[1px] font-mono">
					{navItems.map((item) => (
						<Link key={item.key} to={item.to} className="w-full transition">
							{mapped(item)}
						</Link>
					))}
					{user && (
						<button
							onClick={handleLogout}
							className={`mt-auto p-3 rounded cursor-pointer ${btnText} ${btnBg}`}
						>
							<FaSignOutAlt/>
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default SideBar;
