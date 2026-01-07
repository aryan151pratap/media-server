import { useEffect, useState } from "react";
import AddMedia from "./addMedia";
import { FaPlus, FaTrash, FaSync, FaKey, FaLink, FaGlobe } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Api = ({ user, dark }) => {
	const api = `${API_URL}/api/${user._id}/`;
	const [data, setData] = useState("");
	const [apiList, setApiList] = useState([]);
	const [alert, setAlert] = useState(false);
	const [refresh, setRefresh] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getApis = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${API_URL}/user/getApi/${user._id}`);
				if (res.ok) {
					const result = await res.json();
					setApiList([...result.api]);
				}
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		getApis();
	}, [refresh]);

	useEffect(() => {
		if (data) setAlert(false);
	}, [data]);

	const handleAddApi = async () => {
		if (!data.trim()) return;
		if (apiList.includes(data)) {
			setAlert(true);
			return;
		}
		const res = await fetch(`${API_URL}/user/api/${user._id}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ api: data }),
		});
		if (res.ok) {
			setApiList(e => [...e, data]);
			setData("");
		}
	};

	const handleDelete = async (domain) => {
		const res = await fetch(`${API_URL}/user/deleteApi/${user._id}/${domain}`);
		if (res.ok) setApiList(apiList.filter(i => i !== domain));
	};

	return (
		<div className={`min-h-screen p-4 sm:p-6 ${dark ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"}`}>
			<div className="w-full">
				
				{/* Header */}
				<div className="backdrop-blur-xs flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<div className={`p-2 rounded-lg ${dark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
							<FaKey />
						</div>
						<div>
							<h1 className="text-xl font-bold">API Manager</h1>
							<p className={`text-xs ${dark ? "text-zinc-400" : "text-zinc-600"}`}>Manage your domains</p>
						</div>
					</div>
					<button
						onClick={() => setRefresh(e => e + 1)}
						className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${dark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-zinc-100 hover:bg-zinc-200"}`}
					>
						<FaSync className={loading ? "animate-spin" : ""} />
						Refresh
					</button>
				</div>

				{/* Base URL */}
				<div className={`backdrop-blur-xs p-4 rounded-xl border mb-6 ${dark ? "bg-zinc-800/50 border-zinc-700" : "bg-zinc-50/20 border-zinc-200"}`}>
					<div className="flex items-center gap-2 mb-3">
						<FaGlobe className={dark ? "text-blue-400" : "text-blue-500"} />
						<span className="font-medium">Base URL</span>
					</div>
						<code className={`p-3 rounded text-sm block overflow-x-auto ${dark ? "bg-zinc-900 text-zinc-300" : "bg-zinc-100 text-zinc-800"}`}>
						{api}
					</code>
				</div>

				{/* Add Domain */}
				<div className={`backdrop-blur-xs p-4 rounded-xl border mb-6 ${dark ? "bg-zinc-800/50 border-zinc-700" : "bg-zinc-50/20 border-zinc-200"}`}>
					<h2 className="font-semibold mb-4 flex items-center gap-2">
						<FaPlus className={dark ? "text-green-400" : "text-green-500"} />
						Add New Domain
					</h2>
					
					{alert && (
						<div className={`p-2 rounded mb-4 text-sm ${dark ? "bg-red-900/30 text-red-300" : "bg-red-50 text-red-600"}`}>
							Domain already exists
						</div>
					)}

					<div className="flex flex-col sm:flex-row gap-3 mb-3">
						<div className={`flex-1 p-3 rounded text-sm ${dark ? "bg-zinc-900 text-zinc-400" : "bg-zinc-100 text-zinc-600"}`}>
							{api}
						</div>
						<input
							type="text"
							placeholder="domain-name"
							value={data}
							onChange={(e) => setData(e.target.value)}
							className={`flex-1 px-4 py-3 rounded border ${alert ? (dark ? "border-red-500" : "border-red-400") : (dark ? "border-zinc-700" : "border-zinc-300")} ${dark ? "bg-zinc-900" : "bg-white"}`}
						/>
						<button
							onClick={handleAddApi}
							disabled={!data.trim()}
							className={`w-fit px-2  py-3 rounded font-medium ${!data.trim() ? (dark ? "bg-zinc-800 text-zinc-500" : "bg-zinc-200 text-zinc-400") : (dark ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600")} text-white`}
						>
							Add Domain
						</button>
					</div>
					
				</div>

				{/* Domain List */}
				<div className={`backdrop-blur-xs p-4 rounded-xl border mb-6 ${dark ? "bg-zinc-800/50 border-zinc-700" : "bg-zinc-50/20 border-zinc-200"}`}>
					<div className="flex items-center justify-between mb-4">
						<h2 className="font-semibold flex items-center gap-2">
							<FaLink className={dark ? "text-blue-400" : "text-blue-500"} />
							Your Domains ({apiList.length})
						</h2>
					</div>

					{loading ? (
						<div className="flex justify-center py-8">
							<div className={`w-8 h-8 border-2 rounded-full animate-spin ${dark ? "border-zinc-600 border-t-blue-500" : "border-zinc-300 border-t-blue-500"}`}></div>
						</div>
					) : apiList.length === 0 ? (
						<div className={`py-8 text-center ${dark ? "text-zinc-500" : "text-zinc-600"}`}>
							No domains added yet
						</div>
					) : (
						<div className="space-y-3">
							{apiList.map((domain, index) => (
								<div
									key={index}
									className={`p-3 rounded border ${dark ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`}
								>
									<div className="flex items-center justify-between">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-1">
												<div className={`w-2 h-2 rounded-full ${dark ? "bg-green-500" : "bg-green-400"}`}></div>
												<span className="text-xs text-zinc-500">Domain {index + 1}</span>
											</div>
											<code className="text-sm break-all">
												{api}{domain}
											</code>
										</div>
										<button
											onClick={() => handleDelete(domain)}
											className={`ml-3 p-2 rounded ${dark ? "bg-red-900/30 hover:bg-red-900/50 text-red-300" : "bg-red-50 hover:bg-red-100 text-red-500"}`}
										>
											<FaTrash />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="backdrop-blur-xs">
					<AddMedia api={api} apiList={apiList} user={user} dark={dark} />
				</div>
			</div>
		</div>
	);
};

export default Api;