import { useEffect, useState } from "react";
import Audio from "./audio";
import Document from "./document";
import Images from "./images";
import Videos from "./videos";
import DocumentCard from "./document";
const API_URL = import.meta.env.VITE_API_URL;

const Files = function({currFolder, domain, user}){
	const loadApi = `${API_URL}/load/${user?._id}/${domain}/${currFolder}/`;
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [load, setLoad] = useState(false);

	const getFiles = async function(){
		try{
			setLoading(true);
			const res = await fetch(`${API_URL}/media/files/${user?._id}/${domain}/${currFolder}`);
			const result = await res.json();
			if(res.ok){
				setFiles(result);
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

	return(
		<div className="flex flex-col h-full w-full overflow-auto">
			{domain && 
				<div className="bg-zinc-900/80 px-3 py-2 text-xs text-zinc-400 border-b border-zinc-700">
					{domain} / {currFolder}
				</div>
			}
			{!loading ?
			<div className={`p-2 ${load ? `grid ${currFolder == "images" ? "md:grid-cols-6 grid-cols-2 sm:grid-cols-3" : "md:grid-cols-4 grid-cols-1 sm:grid-cols-2"} gap-1 ` : "flex flex-col gap-0.5"} overflow-auto custom-scrollbar`}>
				{files.map((i, index) => (
					<div key={index} className="text-xs">
						{load ?
							<div className="flex">
								{currFolder == "images" ?
									<div>										
										<Images url={loadApi} file={i}/>
									</div>
									:
									currFolder == "videos" ?
									<div>
										<Videos url={loadApi} i={i}/>
									</div>
									:
									currFolder == "audios" ?
									<div className="w-full flex flex-col">
										<Audio url={loadApi+i}/>
									</div>
									:
									<div className="w-full h-fit">
										<DocumentCard fileUrl={loadApi+i} filename={i}/>
									</div>
								}
							</div>
							:
							<pre className="w-full cursor-pointer bg-zinc-900/90 px-2 p-0.5 line-clamp-1 whitespace-pre-wrap break-all
									border border-zinc-600 hover:border-zinc-300 text-white
							">{i}</pre>
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
				<button className={`ml-auto px-2 p-1 border border-zinc-300/30 hover:border-zinc-300/50 ${!load ? "bg-zinc-300/10" : "bg-zinc-300/20"} focus:bg-zinc-200/20 hover:text-white cursor-pointer rounded`}
					onClick={() => setLoad(true)}
				>load</button>
				<button className={`px-2 p-1 border border-zinc-300/30 hover:border-zinc-300/50 ${load ? "bg-zinc-300/10" : "bg-zinc-300/20"} focus:bg-zinc-200/20 hover:text-white cursor-pointer rounded`}
					onClick={() => setLoad(false)}
				>name</button>
			</div>
		</div>
	)
}

export default Files;