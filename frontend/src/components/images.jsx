import { useState } from "react";
import { FaExpand, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

const Images = function({url, file}){
	const [open, setOpen] = useState(false);
	return(
		<div className="relative group w-full h-full flex flex-col border border-zinc-300/30 rounded overflow-hidden">
			<div className="w-full h-[92px] sm:h-[130px]">
				<img src={url+file} alt="" className="absolute w-full h-full object-cover transition duration-500 "/>
				<div className="absolute w-full h-full flex items-center justify-center group-hover:bg-black/30 cursor-pointer"
					onClick={() => setOpen(true)}
				>
					<FaExpand className="hidden group-hover:flex text-white text-xl"/>
				</div>
			</div>
			<div className="group-hover:relative bg-zinc-900/80 inset-0 top-0 flex flex-row gap-1 items-center p-1">
				<p className="line-clamp-1 whitespace-pre-wrap break-all">{file}</p>
				<a href={url+file} download target="_blank" rel="noopener noreferrer"
					className="text-blue-500 hover:underline bg-blue-500/30 sm:p-2 p-1 rounded hover:bg-blue-500/40 cursor-pointer font-semibold"
				>
					<FaExternalLinkAlt/>
				</a>
				
			</div>

			{open &&
			<div className="fixed backdrop-blur-sm w-full h-full p-2 sm:p-4 md:p-6 z-100 bg-black/40 flex items-center justify-center inset-0">
				<div className="fixed inset-0 left-auto text-xl text-white p-2">
					<FaTimes className="bg-zinc-200/30 hover:bg-zinc-200/40 rounded cursor-pointer p-1"
						onClick={() => setOpen(false)}
					/>
				</div>
				<img src={url+file} alt="" className="max-w-full max-h-full object-cover"/>
			</div>
			}
		</div>
	)
}

export default Images;