import { useEffect, useState } from "react";
import Files from "./files";
import { FaExpand } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;

const Media = function ({ user, dark }) {
	const media = `${API_URL}/media/folder/`;
	const [domain, setDomain] = useState("");
	const [folders, setFolders] = useState({});
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [apiList, setApiList] = useState([]);
	const [currFolder, setCurrFolder] = useState("");
	const [allData, setAllData] = useState([]);
	const [currUser, setCurrUser] = useState(null);
	const [change, setChange] = useState(false);
	const [currId, setCurrId] = useState(null);
	const [fullMedia, setFullMedia] = useState(false);

	useEffect(() => {
		const getApis = async function(){
			try{
				setLoading(true);
				const res = await fetch(`${API_URL}/user/getApi/${user._id}`);
				const result = await res.json();
				if(res.ok){
					setApiList([...result.api]);
				}
			} catch(err){
				console.log(err);
			} finally {
				setLoading(false);
			}
		}
		getApis();
		setCurrUser(user);
		if(user.role === "admin") handleAdmin();
	}, [])

	useEffect(() => { setCurrFolder(""); }, [domain])

	const handleFolder = async function () {
		if (!domain) return;
		try {
			setLoading(true);
			setMessage(null);
			const res = await fetch(`${API_URL}/media/folder/${currUser._id}/${domain}`);
			const result = await res.json();
			if (res.ok) setFolders(e => ({...e, [domain]: result}));
			else setMessage(result.message || "Something went wrong");
		} catch (err) {
			console.log(err);
			setMessage("Server error");
		} finally {
			setLoading(false);
		}
	};

	const handleAdmin = async function(){
		try{
			const res = await fetch(`${API_URL}/user/admin/${user._id}`);
			const result = await res.json();
			if(res.ok) setAllData(result);
			else setMessage(result.message);
		} catch(err){
			console.log(err);
		}
	}

	const bgMain = dark ? "bg-zinc-900 text-zinc-200" : "text-zinc-900";
	const bgPanel = dark ? "bg-zinc-800/60 border border-zinc-700" : "bg-zinc-100/50 border border-zinc-300 hover:border-zinc-400";
	const bgFolder = dark ? "bg-zinc-900/70 border-r border-zinc-700" : "bg-white border-r border-zinc-300";
	const hoverFolder = dark ? "hover:bg-zinc-700/40" : "hover:bg-zinc-200/50";
	const msgError = dark ? "bg-red-500/20 text-red-300" : "bg-red-200/30 text-red-700";
	const msgInfo = dark ? "text-zinc-500" : "text-zinc-600";

	return (
		<div className={`w-full h-full p-2 sm:p-6 ${bgMain}`}>
			<div className={`text-sm ${bgPanel} rounded-lg p-3 flex gap-2 items-center mb-2 overflow-auto custom-scrollbar`}>
				<div className="shrink-0 text-lg">
					<span className="font-mono">📁 Media Explorer</span>
				</div>

				{user.role === "admin" &&
				<div className="w-full flex items-center gap-2">
					<button
						type="button"
						onClick={() => setChange(v => !v)}
						className={`ml-auto relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200
							${change ? "bg-green-500" : dark ? "bg-zinc-700" : "bg-zinc-400"} cursor-pointer`}
						aria-pressed={change}
					>
						<span
							className={`inline-block h-3 w-3 rounded-full bg-white shadow transform transition-transform duration-200
							${change ? "translate-x-4" : "translate-x-1"}`}
						/>
					</button>	
				</div>
				}

				{user.role == "admin" && change &&
				<select className="px-2 p-1 outline-none border border-zinc-300/30 focus:border-zinc-300/50 rounded"
					value={currId}
					onChange={(e) => {
						setCurrId(e.target.value);
						const user = allData.find(u => u._id == e.target.value);
						setCurrUser(user);
						setApiList(user.api);
						setDomain("");
					}}
				>
					<option value="">name</option>
					{allData.map((i, index) => (
						<option key={index} value={i._id}>{i.name}</option>
					))}
				</select>
				}

				{change || user.role === "user" ?
					<select
						className={`ml-auto outline-none px-2 p-1 rounded ${dark ? "bg-zinc-900/90 text-zinc-100 border border-zinc-700/20 focus:border-zinc-500/40" : "bg-zinc-50 text-zinc-900 border border-zinc-200/30 focus:border-blue-200"}`}
						value={domain}
						onChange={(e) => setDomain(e.target.value)}
					>
						<option value="">select domain</option>
						{apiList.map((i, index) => (
							<option key={index} value={i}>{i}</option>
						))}
					</select>
				: user.role === "admin" &&
					<select
						className={`ml-auto outline-none px-2 p-1 rounded ${dark ? "bg-zinc-900/90 text-zinc-100 border border-zinc-700/20 focus:border-zinc-500/40" : "bg-zinc-50 text-zinc-900 border border-zinc-200/30 focus:border-blue-200"}`}
						value={domain}
						onChange={(e) =>{
							setDomain(e.target.value);
							const user = allData.find(u => u?.api?.includes(e.target.value));
							setCurrUser(user);
						}}
					>
						<option value="">all User domain</option>
						{allData.map((i, index) => (
							i?.api?.map((j, index_2) => (
								<option key={index + index_2 + 1} value={j}>{j}</option>
							))
						))}
					</select>
				}

				<button
					onClick={handleFolder}
					className={`px-4 py-1 rounded ${dark ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300" : "bg-blue-600/50 hover:bg-blue-600 text-blue-200"} text-sm transition`}
				>
					{loading ? "Loading..." : "Get"}
				</button>
			</div>

			{ currUser &&
			<div className={`flex flex-row sm:gap-2 gap-1 items-center justify-between text-sm p-2 px-4 rounded-md ${dark ? "bg-zinc-700/30" : "bg-zinc-100/50"} mb-2 overflow-auto custom-scrollbar`}>
				<div className="shrink-0 flex flex-row items-center sm:gap-2 gap-1">
					<p>name:</p>
					<p className="text-green-400 bg-green-500/20 px-2 p-1 rounded">{currUser?.name}</p>
				</div>
				<div className="flex flex-row items-center sm:gap-2 gap-1">
					<p>Id:</p>
					<p className="text-green-400 bg-green-500/20 px-2 p-1 rounded">{currUser?._id}</p>
				</div>
				<div className="shrink-0 flex flex-row items-center sm:gap-2 gap-1">
					<p>api / folder:</p>
					<p className="text-green-400 bg-green-500/20 px-2 p-1 rounded">{domain}</p>
				</div>
			</div>
			}

			{domain &&
				<pre className={`sm:text-md text-xs line-clamp-2 px-2 p-2 rounded mb-4 overflow-auto custom-scrollbar ${dark ? "bg-zinc-500/10" : "bg-zinc-200/30"}`}>
					<span className="text-green-500 bg-green-500/20 rounded px-2 p-1">url:</span> {media}
					<span className="px-2 p-1 bg-zinc-500/20 rounded">{currUser?._id}</span>/
					<span className="px-2 p-1 bg-zinc-500/20 rounded">{domain}</span>
				</pre>
			}

			<div className={`${fullMedia ? "fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm p-4" : `w-full h-[60vh] ${bgPanel}`} rounded-lg`}>
				<div className={`${fullMedia && bgPanel} w-full h-full flex overflow-hidden rounded-lg`}>
					<div className={`shrink-0 ${bgFolder} w-[38%] sm:w-[26%] md:w-[20%] flex flex-col`}>
						<div className={`px-3 py-2 text-xs ${dark ? "text-zinc-400 border-b border-zinc-700" : "text-zinc-700 border-b border-zinc-300"}`}>
							Folders
						</div>
						<div className="backdrop-blur-xs flex flex-col h-full overflow-auto custom-scrollbar">
							{(!domain || !folders?.[domain]?.length) && (
								<div className={`px-3 py-2 text-sm ${msgInfo}`}>No folders</div>
							)}
							{domain && folders[domain]?.map((i, index) => (
								<button
									key={index}
									onClick={() => setCurrFolder(i)}
									className={`flex w-full text-left px-3 py-2 text-sm transition ${currFolder === i ? dark ? "bg-zinc-300/10" : "bg-zinc-200" : ""} ${hoverFolder}`}
								>
									<span className="shrink-0">📂 {i}</span>
								</button>
							))}
						</div>
						<div className="p-2">
							<button
								onClick={() => setFullMedia(e => !e)}
								className="p-1 rounded border border-zinc-300/30 hover:bg-zinc-300/30 cursor-pointer"
							>
								<FaExpand />
							</button>
						</div>
					</div>

					<div className="relative w-full h-full flex flex-col">
						<div className="w-full h-full overflow-hidden absolute z-50">
							{domain && currFolder ? (
								<Files currFolder={currFolder} domain={domain} user={currUser} dark={dark}/>
							) : (
								<div className="h-full flex justify-center items-center text-sm text-zinc-500">
									Select a folder to view media files
								</div>
							)}
						</div>
						<div className={`w-full h-full backdrop-blur-xs ${
						dark 
							? "bg-gradient-to-br from-zinc-900 via-zinc-800/10 to-zinc-900/10"
							: "bg-gradient-to-br from-zinc-50 via-zinc-100/10 to-zinc-50/10"
						}`}></div>
					</div>
				</div>
			</div>

			<div className={`border border-zinc-300/30 p-2 rounded mt-2 text-sm font-mono flex gap-2 items-center ${dark ? "text-zinc-200" : "text-zinc-900"}`}>
				<span className="text-zinc-400">Message:</span>
				{message ? (
					<span className={`${msgError} px-3 py-1 rounded`}>{message}</span>
				) : (
					<span className={msgInfo}>No message</span>
				)}
			</div>
		</div>
	);
};

export default Media;
