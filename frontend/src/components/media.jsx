import { useEffect, useState } from "react";
import Files from "./files";
const API_URL = import.meta.env.VITE_API_URL;

const Media = function ({ user }) {
	const media = "http://localhost:3000/media/folder/";
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
		if(user.role === "admin"){
			handleAdmin();
		}
	}, [])

	// useEffect(() => {
	// 	setCurrFolder("");
	// }, [domain])

	const handleFolder = async function () {
		if (!domain) return;
		try {
			setLoading(true);
			setMessage(null);
			const res = await fetch(`${API_URL}/media/folder/${currUser._id}/${domain}`);
			const result = await res.json();

			if (res.ok) {
				setFolders(e => ({...e, [domain]: result}));
			} else {
				setMessage(result.message || "Something went wrong");
			}
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
			if(res.ok){
				setAllData(result);
			}else{
				setMessage(result.message);
			}
		} catch(err){
			console.log(err);
		}
	}

	return (
		<div className="w-full h-full p-2 sm:p-6 bg-zinc-900 text-zinc-200">

			<div className="flex items-center justify-between mb-4">
				<h1 className="font-mono text-lg">📁 Media Explorer</h1>
			</div>

			
			<div className="text-sm bg-zinc-800/60 rounded-lg p-3 flex gap-2 items-center mb-2 overflow-auto custom-scrollbar">
				<div>
					<pre>Select:</pre>
				</div>
				{user.role === "admin" &&
				<div className="w-full flex items-center gap-2">
					<button
						type="button"
						onClick={() => setChange(v => !v)}
						className={`ml-auto relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200
							${change ? "bg-green-500" : "bg-zinc-600"} cursor-pointer`}
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
					<option value="" className="bg-zinc-900/80">name</option>
					{allData.map((i, index) => (
						<option key={index} value={i._id} className="bg-zinc-900/80">
							{i.name}
						</option>
					))}
				</select>
				}

				{change || user.role === "user" ?
					<select name="" id=""
						className="ml-auto outline-none bg-zinc-900/90 text-zinc-100 border border-zinc-200/10 px-2 p-1 focus:border-zinc-200/40 rounded"
						value={domain}
						onChange={(e) => {
							setDomain(e.target.value);
						}}
					>
						<option value="" className="">select domain</option>
						{apiList.map((i, index) => (
							<option key={index} value={i} className="">{i}</option>
						))}
					</select>

				: user.role === "admin" &&
					<select name="" id=""
						className="ml-auto outline-none bg-zinc-900/90 text-zinc-100 border border-zinc-200/10 px-2 p-1 focus:border-zinc-200/40 rounded"
						value={domain}
						onChange={(e) =>{
							setDomain(e.target.value);
							const user = allData.find(u => u?.api?.includes(e.target.value));
							setCurrUser(user);
						}}
					>
						<option value="" className="" >all User domain</option>
						{allData.map((i, index) => (
							i?.api?.map((j, index_2) => (
								<option key={index + index_2 + 1} value={j} className="">{j}</option>
							))
						))}
					</select>
				}
				<button
					onClick={handleFolder}
					className="px-4 py-1 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm transition"
				>
					{loading ? "Loading..." : "Get"}
				</button>

			</div>
			{ currUser &&
			<div className="flex flex-row sm:gap-2 gap-1 items-center justify-between text-sm p-2 px-4 rounded-md bg-zinc-700/30 mb-2">
				<div className="flex flex-row items-center sm:gap-2 gap-1">
					<p>name:</p>
					<p className="text-green-400 bg-green-500/10 px-2 p-1 rounded">{currUser?.name}</p>
				</div>
				<div className="flex flex-row items-center sm:gap-2 gap-1">
					<p>Id:</p>
					<p className="text-green-400 bg-green-500/10 px-2 p-1 rounded">{currUser?._id}</p>
				</div>
				<div className="flex flex-row items-center sm:gap-2 gap-1">
					<p>api / folder:</p>
					<p className="text-green-400 bg-green-500/10 px-2 p-1 rounded">{domain}</p>
				</div>
			</div>
			}
			{domain &&
				<pre className="sm:text-md text-xs line-clamp-2 overflow-auto px-2 p-2 bg-zinc-500/10 rounded mb-4">
					<span className="text-green-500 bg-green-900/30 rounded px-2 p-1">url:</span> {media}
					<span className="px-2 p-1 bg-zinc-500/20 rounded">{currUser?._id}</span>/
					<span className="px-2 p-1 bg-zinc-500/20 rounded">{domain}</span>
				</pre>
			}

			<div className="w-full flex h-[60vh] bg-zinc-800/60 rounded-lg overflow-hidden border border-zinc-700">

				<div className="shrink-0 w-[40%] sm:w-[25%] md:w-[20%] border-r border-zinc-700 bg-zinc-900/60">
					<div className="px-3 py-2 text-xs text-zinc-400 border-b border-zinc-700">Folders</div>
					{(!domain || !folders?.[domain] || folders[domain].length === 0) && (
						<div className="px-3 py-2 text-sm text-zinc-500">
							No folders
						</div>
					)}
					{domain && folders?.[domain]?.map((i, index) => (
						<button
							key={index}
							onClick={() => setCurrFolder(i)}
							className={`shrink-0 ${currFolder == i ? "bg-zinc-300/10" : ""} w-full text-left px-3 py-2 text-sm hover:bg-zinc-700/40 transition cursor-pointer`}
						>
							📂 {i}
						</button>
					))}
				</div>

				<div className="w-[60%] sm:w-[75%] md:w-[80%] h-full flex flex-col text-sm text-zinc-400 overflow-auto">
					
					<div className="w-full h-full">
						{domain && currFolder ? 
						<div className="h-full">
							<Files currFolder={currFolder} domain={domain} user={currUser}/>
						</div>
						:
						<div className="p-4">
							Select a folder to view media files
						</div>
						}
					</div>
				</div>
			</div>

			<div className="mt-3 text-sm font-mono flex gap-2 items-center">
				<span className="text-zinc-400">Message:</span>
				{message ? (
					<span className="px-3 py-1 rounded bg-red-500/20 text-red-300">
						{message}
					</span>
				) : (
					<span className="text-zinc-500">No message</span>
				)}
			</div>
		</div>
	);
};

export default Media;
