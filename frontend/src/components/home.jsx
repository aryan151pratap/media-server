import { useEffect } from "react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Home = function () {
	const [copyCheck, setCopyCheck] = useState("");
	const BASE_URL = import.meta.env.VITE_API_URL;

	const folderTree = `Media-server
├── site1/
│   ├── videos/
│   ├── images/
│   └── docs/
└── site2/
    ├── videos/
    └── images/`;

	const fetchExample = `fetch("${BASE_URL}/media/folder/mysite")
  .then(res => res.json())
  .then(data => console.log(data));`;

	const videoExample = `${BASE_URL}/load/mysite/videos/sample.mp4`;
	const imageExample = `${BASE_URL}/load/mysite/images/sample.jpg`;
	const documentExample = `${BASE_URL}/load/mysite/documents/sample.pdf`;

	const copy = (text, title) => {
		setCopyCheck(title);
		navigator.clipboard.writeText(text);
	};
	
	useEffect(() => {
		if(copyCheck == "") return;
		const timer = setTimeout(() => {
			setCopyCheck("");
		}, 1000);

		return () => clearTimeout(timer);
	},[copyCheck])

	const CodeBlock = ({ title, code }) => (
		<div className="relative bg-[#0d1117] group border border-zinc-700 hover:border-zinc-500 transition duration-500 rounded-lg overflow-hidden">
			<div className="flex justify-between items-center px-4 py-2 bg-zinc-900 border-b border-zinc-700 group-hover:border-zinc-500 transition duration-500">
				<span className="text-xs group-hover:text-zinc-300 text-zinc-400">{title}</span>
				<button
					onClick={() => copy(code, title)}
					className={`text-xs border ${copyCheck === title ? "px-2 p-1.5 text-green-500 bg-green-500/20 border-green-400/50" : "px-2 p-1 text-blue-400 hover:text-blue-300 bg-blue-500/20 border-blue-400/50"} rounded cursor-pointer`}
				>
					{copyCheck === title ? 
					<FaCheck/>
					: 
					"copy"
					}
				</button>
			</div>
			<pre className="px-4 py-3 text-sm overflow-auto text-zinc-200 whitespace-pre">
				{code}
			</pre>
		</div>
	);

	return (
		<div className="p-2 sm:p-6 w-full h-full  text-zinc-200">
			<div className="max-w-5xl mx-auto flex flex-col gap-6">

				<div className="p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700">
					<h1 className="text-3xl font-semibold">📦 Media Server</h1>
					<p className="text-sm text-zinc-400 mt-2">
						REST-based media server for storing and streaming files
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">🌐 Base URL</h2>
					<CodeBlock title="Base URL" code={BASE_URL} />
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">🚀 Features</h2>
					<ul className="bg-zinc-800/40 border border-zinc-700 rounded-lg p-4 text-sm space-y-1">
						<li>📁 Folder-based media organization</li>
						<li>🎥 Video streaming with HTTP Range support</li>
						<li>🔗 Public direct media URLs</li>
						<li>🖼️ Images, 🎧 Audio, 📄 Documents</li>
						<li>⚡ Easy frontend & CDN integration</li>
					</ul>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">📂 Folder Structure</h2>
					<CodeBlock title="Directory Tree" code={folderTree} />
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">
						🔑 API – Get Folders by Site
					</h2>
					<CodeBlock
						title="GET /media/folder/:site"
						code={fetchExample}
					/>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">
						🎥 API – Access / Stream Media
					</h2>

					<CodeBlock title="Video URL" code={videoExample} />
					<div className="h-3" />
					<CodeBlock title="Image URL" code={imageExample} />
					<div className="h-3" />
					<CodeBlock title="Document URL" code={documentExample} />
				</div>

				<div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 border border-yellow-700/40 rounded-lg p-4 mb-4">
					<h2 className="text-sm font-semibold text-yellow-400 mb-2">
						⚠️ Notes
					</h2>
					<ul className="text-sm space-y-1 text-zinc-300">
						<li>• Videos support byte-range streaming</li>
						<li>• Use Nginx / Cloudflare in production</li>
						<li>• Add authentication for private files</li>
					</ul>
				</div>

			</div>
		</div>
	);
};

export default Home;
