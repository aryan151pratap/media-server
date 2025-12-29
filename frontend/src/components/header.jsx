import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = function({user, setSignup}){
	const location = useLocation();
	const [currentLocation, setCurrentLocation] = useState("home");

	useEffect(() => {
		setCurrentLocation(location.pathname.split("/")[1]);
	}, [location])

	const handleLogout = function(){
		const email = localStorage.getItem("media-email");
		if(email){
			localStorage.removeItem("media-email");
			window.location.reload();
		}
	}
	return(
		<div className="w-full h-fit text-sm sm:text-md">
			<div className="w-full flex flex-row items-center p-2 border-b border-zinc-600">
				<div className="px-1 p-1 bg-zinc-300/10 rounded hover:bg-zinc-200/20">
					{user ?
					<Link to={"/account"} className="capitalize flex flex-row items-center group transition-all duration-300">
						<img src={user?.image} alt="" className="h-5 w-5 rounded"/>
						<span className="group-hover:px-2 w-0 overflow-hidden whitespace-nowrap group-hover:w-full transition-w duration-300 text-sm text-white">
							{user?.name || "User"}
						</span>				
					</Link>
					:
					<Link to={"/login"} className="cursor-pointer"
					>Sign in</Link>
					}
				</div>
				
				<div className="ml-auto flex flex-row gap-1">
					<Link to={"/home"} className={`${currentLocation == "home" && "bg-zinc-200/10"} text-zinc-300 font-mono hover:bg-zinc-500/50 rounded px-2 p-1 cursor-pointer`}>home</Link>
					<Link to={"/media"} className={`${currentLocation == "media" && "bg-zinc-200/10"} text-zinc-300 font-mono hover:bg-zinc-500/50 rounded px-2 p-1 cursor-pointer`}>media</Link>
					<Link to={"/api"} className={`${currentLocation == "api" && "bg-zinc-200/10"} text-zinc-300 font-mono hover:bg-zinc-500/50 rounded px-2 p-1 cursor-pointer`}>api
					</Link>
					<Link to={"/account"} className={`${currentLocation == "account" && "bg-zinc-200/10"} text-zinc-300 font-mono hover:bg-zinc-500/50 rounded px-2 p-1 cursor-pointer`}>account
					</Link>
				</div>
				{user &&
				<button className="ml-1 font-mono text-red-400/80 bg-red-500/5 px-2 p-1 hover:bg-red-400/20 focus:bg-red-400/40 rounded cursor-pointer"
					onClick={handleLogout}
				>
					logout
				</button>
				}
			</div>
		</div>
	)
}

export default Header;	