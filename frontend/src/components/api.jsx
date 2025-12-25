import { useEffect } from "react";
import { use } from "react";
import { useState } from "react";
import AddMedia from "./addMedia";
const API_URL = import.meta.env.VITE_API_URL;

const Api = function({user}){
	const api = `${API_URL}/api/${user._id}/`;
	const [data, setData] = useState("");
	const [apiList, setApiList] = useState([]);
	const [alert, setAlert] = useState(false);
	const [refresh, setRefresh] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getApis = async function(){
			try{
				setLoading(true);
				const res = await fetch(`${API_URL}/user/getApi/${user._id}`);
				const result = await res.json();
				if(res.ok){
					setApiList(e => [...result.api]);
				}
			} catch(err){
				console.log(err);
			} finally {
				setLoading(false);
			}
		}
		getApis();
	}, [refresh])

	useEffect(() => {
		if(data){
			setAlert(false);
		}
	}, [data])

	const handleInput = function(e){
		setData(e.target.value);
	}

	const handleAddApi = async function(){
		if(!data.trim()) return;
		const check = apiList.find((e) => e == data);
		if(check) {
			setAlert(true);
			return;
		}
		const res = await fetch(`${API_URL}/user/api/${user._id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({api: data})
		});
		if(res.ok){
			setApiList(e => [...e, data]);
			setData("");
		}
	}

	const handleDelete = async function(domain){
		try{
			const res = await fetch(`${API_URL}/user/deleteApi/${user._id}/${domain}`);
			if(res.ok){
				const newList = apiList.filter((i) => i != domain);
				setApiList(newList);
			}
		} catch(err){
			console.log(err);
		}
	}

	return(
		<div className="w-full h-full bg-zinc-900 p-2 sm:p-6 text-zinc-200">

			<div className="flex items-center justify-between mb-6">
				<h1 className="text-lg font-mono font-semibold">🔑 API Manager</h1>
				<button
					onClick={() => setRefresh((e) => e + 1)}
					className="px-3 py-1 text-sm rounded bg-zinc-300/10 hover:bg-zinc-300/20 transition"
				>
					Refresh
				</button>
			</div>

			<div className="bg-zinc-800/60 rounded-lg p-4 mb-6">
				<p className="text-sm text-zinc-400 mb-2">Add new domain</p>

				<div className="flex sm:flex-row flex-col sm:items-center gap-2">
					<pre className="bg-zinc-900/60 px-3 py-2 rounded text-sm line-clamp-2 overflow-auto custom-scrollbar">{api}
					</pre>
					<div className="flex flex-row gap-2">
						<input
							type="text"
							placeholder="domain-name"
							value={data}
							onChange={(e) => setData(e.target.value)}
							className={`flex-1 px-3 py-2 rounded bg-zinc-900 outline-none border text-sm
								${alert ? "border-red-400 text-red-300" : "border-zinc-700 focus:border-zinc-500"}
							`}
						/>
						<button
							onClick={handleAddApi}
							className="px-4 py-2 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-sm transition cursor-pointer"
						>
							Add
						</button>
					</div>
				</div>
			</div>

			<div className="bg-zinc-800/60 rounded-lg p-4">
				<p className="text-sm text-zinc-400 mb-3">Your APIs</p>

				{!loading ? (
					<div className="flex flex-col gap-2">
						{apiList.length === 0 && (
							<p className="text-sm text-zinc-500">No APIs added</p>
						)}
						{apiList.map((i, index) => (
							<div
								key={index}
								className="flex items-center gap-2 bg-zinc-900/60 rounded px-3 py-2"
							>
								<pre className="flex-1 text-sm overflow-auto custom-scrollbar">
									{api}{i}
								</pre>
								<button
									onClick={() => handleDelete(i)}
									className="px-3 py-1 text-sm rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 transition"
								>
									Delete
								</button>
							</div>
						))}
					</div>
				) : (
					<div className="flex justify-center py-6">
						<div className="w-8 h-8 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
					</div>
				)}
			</div>

			<div className="">
				<AddMedia api={api} apiList={apiList} user={user}/>
			</div>
		</div>
	)
}

export default Api;