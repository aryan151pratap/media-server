import { useEffect, useState } from "react";
import Audio from "./audio";
import Document from "./document";
import Images from "./images";
import Videos from "./videos";
import DocumentCard from "./document";
import { FaBars, FaExpand, FaExternalLinkAlt, FaFileAlt, FaList } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;

const Files = function({currFolder, domain, user}){
	const loadApi = `${API_URL}/load/${user?._id}/${domain}/${currFolder}/`;
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [load, setLoad] = useState(false);
	const [totalSize, setTotalSize] = useState(0);
	const [filename, setFilename] = useState("");
	const [filterData, setFilterData] = useState([]);

	const getFiles = async function(){
		try{
			setLoading(true);
			const res = await fetch(`${API_URL}/media/files/${user?._id}/${domain}/${currFolder}`);
			const result = await res.json();
			console.log(result);
			if(res.ok){
				setFiles(result);
				setFilterData(result);
			}
		} catch(err){
			console.log(err);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getFiles();
	}, [currFolder])

	useEffect(() => {
		const total = files.reduce((sum, f) => sum + (f.size || 0), 0);
		setTotalSize(total);
	}, [files]);

	const size = function(totalSize){
		const newSize = totalSize > 1024 * 1024 * 1024
		? (totalSize / 1024 / 1024 / 1024).toFixed(2) + " GB"
		: totalSize >= 1024 * 1024
		? (totalSize / 1024 / 1024).toFixed(2) + " MB"
		: (totalSize / 1024).toFixed(2) + " KB";

		return newSize;
	}

	useEffect(() => {
		if(filename.trim() == "") {
			setFilterData(files);
			return;
		}
		const filtered = files.filter((i) => i.name.toLowerCase().includes(filename.toLowerCase()));
		setFilterData(filtered);
	}, [filename])

	return(
		<div className="flex flex-col h-full w-full overflow-auto">
			{domain && 
				<div className="flex flex-row items-center bg-zinc-900/80 px-3 py-1 text-xs text-zinc-400 border-b border-zinc-700">
					{domain} / {currFolder}
					<div className="ml-auto">
						<input 
						value={filename}
						onChange={(e) => setFilename(e.target.value)}
						type="text" placeholder="Enter File name ..."
						className="px-4 p-1 outline-none bg-zinc-300/10 focus:bg-zinc-300/20 text-white rounded"
						/>
					</div>
					<div className="ml-auto text-zinc-300/90 font-mono">
						{size(totalSize)}
					</div>
				</div>
			}
			{!loading ?
			<div className={`p-2 ${load ? `grid ${currFolder == "images" ? "lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2" : "md:grid-cols-4 grid-cols-1 sm:grid-cols-2"} gap-1 ` : "flex flex-col gap-0.5"} overflow-auto custom-scrollbar`}>
				{filterData.map((i, index) => (
					<div key={index} className="text-xs">
						{load ?
							<div className="flex">
								{currFolder == "images" ?
									<div className="w-full sm:h-50 h-30">										
										<Images url={loadApi} file={i} size={size(i.size)}/>
									</div>
									:
									currFolder == "videos" ?
									<div>
										<Videos url={loadApi} i={i.name} size={size(i.size)}/>
									</div>
									:
									currFolder == "audios" ?
									<div className="w-full flex flex-col">
										<Audio url={loadApi+i.name} size={size(i.size)}/>
									</div>
									:
									<div className="w-full h-fit">
										<DocumentCard fileUrl={loadApi+i.name} filename={i.name} size={size(i.size)}/>
									</div>
								}
							</div>
							:
							<div className="flex flex-row gap-2 w-full cursor-pointer bg-zinc-900/90 px-2 p-0.5
									border border-zinc-600 hover:border-zinc-300/90 text-white group
							">
								<pre className="line-clamp-1 whitespace-pre-wrap break-all">
									{i.name}
								</pre>
								<div className="shrink-0 font-mono text-zinc-200/50 w-fit ml-auto">{size(i.size)}</div>
								<div className="ml-2">
									<a href={loadApi+i.name} target="_blank">
										<FaExternalLinkAlt className="hidden group-hover:flex text-blue-500 hover:text-blue-400"/>
									</a>
								</div>
							</div>
						}
					</div>
				))}
				{files.length == 0 &&
					<div className="w-full h-full flex items-center justify-center">
						<p>no files found</p>
					</div>
				}
			</div>
			:
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-fit animate-spin p-4 border border-t-transparent rounded-full">
				</div>
			</div>
			}
			<div className="p-1 text-xs mt-auto flex flex-row gap-2 border-t border-zinc-700 bg-zinc-900/90">
				<button className={`ml-auto p-1.5 border border-zinc-300/30 hover:border-zinc-300/50 ${!load ? "bg-zinc-300/10" : "bg-zinc-300/20"} focus:bg-zinc-200/20 hover:text-white cursor-pointer rounded`}
					onClick={() => setLoad(true)}
				>
				<FaExpand/>
				</button>
				<button className={`p-1.5 border border-zinc-300/30 hover:border-zinc-300/50 ${load ? "bg-zinc-300/10" : "bg-zinc-300/20"} focus:bg-zinc-200/20 hover:text-white cursor-pointer rounded`}
					onClick={() => setLoad(false)}
				>
				<FaList/>
				</button>
			</div>
		</div>
	)
}

export default Files;