import { useState } from "react";
import { FaExpand, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

const Images = function({url, file, size, dark}){
	const [open, setOpen] = useState(false);
	return(
		<div className={`w-full h-full relative group flex flex-col border rounded overflow-hidden
			${dark ? "border-zinc-300/30" : "border-zinc-600/40"}`}>
			<div className="w-full h-full relative">
				<div className="w-full h-full">
					<img src={url+file.name} alt="" 
						className={`absolute w-full h-full object-cover transition duration-500 
							${dark ? "bg-zinc-800" : "bg-zinc-200"}`}
					/>
					<div className="absolute w-full h-full flex items-center justify-center group-hover:bg-black/20 cursor-pointer"
						onClick={() => setOpen(true)}
					>
						<FaExpand className="hidden group-hover:flex text-white text-xl"/>
					</div>
				</div>
				<div className={`hidden absolute mt-auto h-fit group-hover:flex inset-0 top-0 flex flex-row gap-1 items-center p-1
					${dark ? "bg-zinc-900/80 text-zinc-200" : "bg-zinc-100/80 text-zinc-900"}`}>
					<p className="line-clamp-1 whitespace-pre-wrap break-all">{file.name}</p>
					<a href={url+file.name} download target="_blank" rel="noopener noreferrer"
						className={`ml-auto text-blue-500 hover:underline sm:p-2 p-1 rounded font-semibold
							${dark ? "bg-blue-500/30 hover:bg-blue-500/40" : "bg-blue-200/30 hover:bg-blue-300/40"}`}
					>
						<FaExternalLinkAlt/>
					</a>
				</div>
			</div>
			<div className={`flex flex-row justify-between p-1
				${dark ? "bg-zinc-900/90 text-zinc-200" : "bg-zinc-100/90 text-zinc-900"}`}>
				<span>size</span>
				<span>{size}</span>
			</div>

			{open &&
			<div className={`fixed backdrop-blur-sm w-full h-full p-2 sm:p-4 md:p-6 z-100 flex items-center justify-center inset-0
				${dark ? "bg-black/40" : "bg-white/30"}`}>
				<div className="fixed inset-0 left-auto text-xl p-2">
					<FaTimes className={`rounded cursor-pointer p-1
						${dark ? "bg-zinc-200/30 hover:bg-zinc-200/40 text-black" : "bg-zinc-700/30 hover:bg-zinc-700/40 text-white"}`}
						onClick={() => setOpen(false)}
					/>
				</div>
				<img src={url+file.name} alt="" className="max-w-full max-h-full object-cover"/>
			</div>
			}
		</div>
	)
}

export default Images;
