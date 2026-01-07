import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Log = ({ user, dark }) => {
	const [logs, setLogs] = useState([]);
	const [keys, setKeys] = useState([]);
	const [message, setMessage] = useState(null);
	const [refresh, setRefresh] = useState(0);
	const [loading, setLoading] = useState(false);
	const [curr_user, setCurr_user] = useState(null);
	const [allData, setAllData] = useState([]);
	const [data, setData] = useState({});
	const [more, setMore] = useState(0);

	useEffect(() =>{
		getLog(user, 0);
		setCurr_user(user);
	}, [user])

	useEffect(() => {
		setLogs([]);
		getLog(curr_user, 0);
		setMore(0);
		if(user.role == "admin"){
			handleAdmin();
		}
	}, [refresh]);

	useEffect(() => {
		const statusCount = {};
		const typeCount = {};
		const apiCount = {};
		logs.forEach(log => {
			const s = log.status;
			const t = log.type;
			const a = log.api;
			statusCount[s] = (statusCount[s] || 0) + 1;
			typeCount[t] = (typeCount[t] || 0) + 1;
			apiCount[a] = (apiCount[a] || 0) + 1;
		});
		const new_data = {
			totalRequests: logs.length,
			status: statusCount,
			type: typeCount,
			api: apiCount
		};

		setData(new_data);
	}, [logs])

	const getLog = async (user, more_log) => {
		try {
			setLoading(true);
			setMessage(null);
			const res = await fetch(`${API_URL}/log/${user._id}?skip=${more_log}`);
			const data = await res.json();
			if (res.ok && data.logs?.length) {
				setLogs(e => [...e, ...data.logs]);
				setKeys(Object.keys(data.logs[0]));
			} else {
				setMessage(data.message);
			}
		} catch (e) {
			console.log(e);
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

	const deleteLogs = async () => {
		const res = await fetch(`${API_URL}/log/${curr_user._id}`, {
			method: "DELETE"
		});
		const result = await res.json();
		if (res.ok){
			setLogs([]);
		} else {
			setMessage(result.message);
		}
	};

	const getMore = async function(){
		try{
			getLog(curr_user, more+10);
			setMore(e => e+10);
		} catch(err){
			console.log(err);
		}
	}

	const formatDate = d =>
		new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "medium" });

	const statusColor = s =>
		s >= 200 && s < 300
			? `${dark ? "text-green-400 bg-green-400/10" : "text-green-700 bg-green-200/20"}`
			: s >= 400
			? `${dark ? "text-red-400 bg-red-400/10" : "text-red-700 bg-red-200/20"}`
			: `${dark ? "text-yellow-400 bg-yellow-400/10" : "text-yellow-700 bg-yellow-200/20"}`;

	const dialog = (text) => {
		return(
			<div className={`hidden absolute bottom-7 right-1 w-60 ${logs.length == 1 ? "max-h-10" : "max-h-15"} z-50 ml-auto group-hover:flex overflow-auto custom-scrollbar`}>
				<div className={`w-fit ml-auto text-xs ${dark ? "bg-zinc-800 hover:bg-zinc-700 border border-zinc-300/30" : "bg-zinc-200 hover:bg-zinc-300 border border-zinc-400/50"} p-1 rounded overflow-auto custom-scrollbar`}>
					<p className="break-all">{text}</p>
				</div>
			</div>
		)
	}

	const dialog_2 = (text) => {
		return(
			<div className="absolute left-15 top-2 w-60 z-50 ml-auto hidden group-hover:flex">
				<div className={`text-xs max-h-15 p-1 rounded overflow-auto custom-scrollbar ${dark ? "bg-zinc-800 hover:bg-zinc-700 border border-zinc-300/30" : "bg-zinc-200 hover:bg-zinc-300 border border-zinc-400/50"}`}>
					<p className="w-full break-all">{text}</p>
				</div>
			</div>
		)
	}

	const dialog_3 = (text) => {
		return(
			<div className={`hidden group-hover:flex absolute top-5 left-1/5 -translate-x-1/2 p-1 text-xs rounded shadow-lg z-50 ${dark ? "bg-zinc-800 hover:bg-zinc-700 border border-zinc-600" : "bg-zinc-200 hover:bg-zinc-300 border border-zinc-400"}`}>
				<p className="h-fit">{text}</p>
			</div>
		)
	}

	return (
		<div className={`p-2 sm:p-4 text-sm ${dark ? "text-zinc-200" : "text-zinc-900"}`}>
			<div className="flex gap-2 items-center justify-between text-lg mb-2">
				<p>Request Logs</p>
				{user?.role == "admin" &&
				<div className="ml-auto text-sm flex flex-row gap-2">
					<select name="" id="" className={`${dark ? "bg-zinc-800 text-zinc-200" : "bg-zinc-200 text-zinc-900"} outline-none border p-0.5 rounded border-zinc-400/20 hover:border-zinc-400/50`}
						value={curr_user?._id}
						onChange={(e) => {
							const u = allData.find(u => u._id == e.target.value);
							setCurr_user(u);
						}}
					>
						<option value="" disabled>select id</option>
						{allData?.map((i, index) => (
							<option value={i._id} key={index}>{i.name}</option>
						))}
					</select>
					<button className={`${dark ? "bg-blue-500/40 border-blue-400/50 hover:bg-blue-500/60 text-zinc-200" : "bg-blue-200/40 hover:bg-blue-300 border-blue-300 text-blue-600"} border px-2 p-0.5 rounded cursor-pointer`}
						onClick={() => {
							setLogs([]);
							getLog(curr_user, 0);
						}}
					>
						get
					</button>
				</div>
				}
				<button onClick={() => setRefresh(v => v + 1)} className={`${dark ? "bg-zinc-700/40 hover:bg-zinc-700/70 text-zinc-200" : "bg-zinc-300/40 hover:bg-zinc-400/70 text-zinc-900"} text-sm px-3 py-1 rounded transition`}>
					Refresh
				</button>
			</div>

			{data &&
			<div className={`backdrop-blur-xs flex flex-wrap gap-1 p-2 border rounded mb-2 ${dark ? "border-zinc-700" : "border-zinc-400"}`}>
				<div className={`w-fit flex flex-row gap-2 items-center p-0.5 rounded border ${dark ? "bg-zinc-400/10 border-zinc-700" : "bg-zinc-200/10 border-zinc-400"}`}>
					<p>Total Requests -</p>
					<p className={`${dark ? "text-green-500" : "text-green-700"} font-bold px-1`}>{data.totalRequests}</p>
				</div>
				<select name="" id="" className={`outline-none p-0.5 rounded border ${dark ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-zinc-200 border-zinc-400 text-zinc-900"}`}>
					<option value="">status</option>
					{data?.status &&
						Object.entries(data.status).map(([code, count], index) => (
							<option key={index} value={code} className={statusColor(code)} disabled>
								{code} - {count}
							</option>
						))
					}
				</select>
				<select name="" id="" className={`outline-none p-0.5 rounded border ${dark ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-zinc-200 border-zinc-400 text-zinc-900"}`}>
					<option value="">type</option>
					{data?.type &&
						Object.entries(data.type).map(([code, count], index) => (
							<option key={index} value={code} disabled>
								{code} - {count}
							</option>
						))
					}
				</select>
				<select name="" id="" className={`outline-none p-0.5 rounded border ${dark ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-zinc-200 border-zinc-400 text-zinc-900"}`}>
					<option value="">api</option>
					{data?.api &&
						Object.entries(data.api).map(([code, count], index) => (
							<option key={index} value={code} disabled>
								{code} : {count}
							</option>
						))
					}
				</select>
				{user?._id == curr_user?._id &&
					<button className={`ml-auto ${dark ? "bg-red-500/10 border-red-400/20 text-red-200 hover:bg-red-500/20" : "bg-red-200/20 border-red-400/50 text-red-700 hover:bg-red-300/40"} px-2 rounded border cursor-pointer`}
						onClick={() => deleteLogs()}
					>
						clear logs
					</button>
				}
				<button className={`${dark ? "bg-green-500/10 border-green-400/20 text-green-200 hover:bg-green-500/20" : "bg-green-200/20 border-green-400/50 text-green-700 hover:bg-green-300/40"} px-2 rounded border cursor-pointer`}
					onClick={() => getMore()}
				>
					more...
				</button>
			
			</div>
			}

			{loading && (
				<div className="h-40 flex items-center justify-center">
					<div className={`w-8 h-8 border-2 ${dark ? "border-zinc-400 border-t-transparent" : "border-zinc-600 border-t-transparent"} rounded-full animate-spin`}></div>
				</div>
			)}

			{!loading && logs.length > 0 && (
				<div className={`backdrop-blur-xs border rounded overflow-hidden overflow-y-auto custom-scrollbar ${dark ? "border-zinc-600" : "border-zinc-400"}`}>
					<div className={`border-b sticky top-0 z-10 grid grid-cols-9 text-xs font-semibold ${dark ? "bg-zinc-900 border-zinc-700" : "bg-zinc-200 border-zinc-400"} `}>
						{keys.map((k, i) => (
							<div key={i} className={`relative group cursor-pointer px-2 py-2 border-l ${dark ? "border-zinc-700" : "border-zinc-400"}`}>
								<p className="line-clmap-1 overflow-hidden">{k}</p>
								{i+1 == keys.length ? 
									dialog_3(k)
									:
									dialog_2(k)
								}
							</div>
						))}
					</div>

					<div className="max-h-[72vh]">
						{logs.map((l, i) => (
							<div key={i} className={`grid grid-cols-9 border-b ${dark ? "even:bg-zinc-800/20 border-zinc-800 hover:bg-zinc-800/40" : "even:bg-zinc-400/20 border-zinc-400 hover:bg-zinc-200/40"} transition`}>
								<div className="relative group cursor-pointer flex flex-col px-2 py-2">
									<p className="break-all line-clamp-1">{l.api}</p>
									{dialog_2(l.api)}
								</div>
								<div className="relative group flex flex-col cursor-pointer px-2 py-2">
									<p className="break-all line-clamp-1">{l.user}</p>
									{dialog_2(l.user)}
								</div>
								<div className="relative group flex flex-col cursor-pointer px-2 py-2">
									{l.method}
									{dialog_2(l.method)}
								</div>
								<div className="relative group flex flex-col cursor-pointer px-2 py-2">
									<p className="break-all line-clamp-1">{l.path}</p>
									{i+1 == logs.length ? 
										dialog(l.path)
										:
										dialog_2(l.path)
									}
								</div>
								<div className="relative group flex flex-col cursor-pointer px-2 py-2">
									{l.type}
									{dialog_2(l.type)}
								</div>
								<div className={`relative group flex flex-col cursor-pointer px-2 py-2 font-medium ${statusColor(l.status)}`}>
									{l.status}
									{dialog_2(l.status)}
								</div>
								<div className="relative group flex flex-col cursor-pointer px-2 py-2">
									{l.responseTime} ms	
									{dialog_2(`${l.responseTime} ms`)}
								</div>
								<div className="relative px-2 py-2 group cursor-pointer flex flex-col">
									{l.ip}
									{dialog(l.ip)}
								</div>
								<div className="relative px-2 py-2 whitespace-nowrap group cursor-pointer">
									<span className="line-clamp-1">{formatDate(l.createdAt)}</span>
									{dialog(formatDate(l.createdAt))}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{message && !loading && (
				<div className={`mt-3 p-3 rounded ${dark ? "bg-red-400/10 text-red-300" : "bg-red-200/30 text-red-700"}`}>
					{message}
				</div>
			)}
		</div>
	);
};

export default Log;
