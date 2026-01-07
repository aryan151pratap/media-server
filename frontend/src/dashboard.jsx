import Header from "./components/header";
import Home from "./components/home";
import Media from "./components/media";
import SideBar from "./sideBar";
import UserProfile from "./account";
import Api from "./components/api";
import Log from "./log";
import Working from "./working";
import MediaServerLanding from "./landing";

import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";


const Dashboard = function({user, setUser}){
	const location = useLocation();
	const route = location.pathname.split("/")[1];
	const [signup, setSignup] = useState(false);
	const [showSide, setShowSide] = useState(true);
	const [dark, setDark] = useState(false);
	const check = ["home", "media", "api", "log", "account"].includes(route);
	return(
		<div
			className={`h-screen flex flex-col w-full transition-colors duration-500 ${
			dark ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
			}`}
		>
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				{[...Array(10)].map((_, i) => (
				<div key={i} className={`absolute rounded-full opacity-5 ${dark ? "bg-white/40" : "bg-purple-900"}`}
					style={{
						width: Math.random() * 300 + 50,
						height: Math.random() * 300 + 50,
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
						animationDelay: `${Math.random() * 5}s`
					}}
				/>
				))}
			</div>

			{user && check &&
			<div className={`sticky top-0 z-50 w-full transition-colors duration-500 ${dark ? "bg-zinc-900" : "bg-white"}`}>
				<Header user={user} setSignup={setSignup} dark={dark} setDark={setDark}/>
			</div>
			}

			<div className="h-full w-full flex flex-row overflow-hidden">
			{user && check &&
				<div
					className={`hidden md:flex shrink-0 transition-all duration-300 ${
						showSide ? "w-64" : "w-10"
					}`}
				>
					<SideBar showSide={showSide} setShowSide={setShowSide} user={user} dark={dark} />
				</div>
			}

			<div className="flex-1 min-w-0 overflow-auto custom-scrollbar flex justify-center">
				<div className={`w-full ${!showSide ? "lg:max-w-[80%]" : ""} h-full transition-all duration-500`}>
					{user && ["home", "media", "api", "log", "account"].includes(route) ?
						<Routes>
							<Route path="/home" element={<Home user={user} dark={dark} />} />
							<Route path="/media" element={<Media user={user} dark={dark} />} />
							<Route path="/api" element={<Api user={user} dark={dark} />} />
							<Route path="/log" element={<Log user={user} dark={dark} />} />
							<Route path="/account" element={<UserProfile user={user} dark={dark} setDark={setDark} />} />			
						</Routes>
						:
						<Routes>
							<Route path="/home" element={<Home user={user} dark={dark} />} />
							<Route path="*" element={<MediaServerLanding user={user} setUser={setUser}/>} />
						</Routes>
					}	
				</div>
			</div>
			</div>
      </div>
	)
}

export default Dashboard;