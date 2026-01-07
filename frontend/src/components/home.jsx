import { useEffect, useState } from "react";
import { FaCheck, FaCopy, FaFolder, FaUpload, FaLink, FaVideo, FaImage, FaFile, FaCode, FaServer, FaBackward, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = function ({ dark }) {
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

	const videoExample = `${BASE_URL}/load/id/mysite/videos/sample.mp4`;
	const imageExample = `${BASE_URL}/load/id/mysite/images/sample.jpg`;
	const documentExample = `${BASE_URL}/load/id/mysite/documents/sample.pdf`;

	const copy = (text, title) => {
		setCopyCheck(title);
		navigator.clipboard.writeText(text);
	};

	const uploadApiExample = `${BASE_URL}/api/id/mysite/videos`;

	const uploadFetchExample = `const formData = new FormData();
formData.append("file", file);

fetch("${BASE_URL}/api/id/mysite/videos", {
  method: "POST",
  body: formData
});`;

	useEffect(() => {
		if (!copyCheck) return;
		const timer = setTimeout(() => setCopyCheck(""), 1500);
		return () => clearTimeout(timer);
	}, [copyCheck]);

	const SectionHeader = ({ icon, title, subtitle }) => (
		<div className="mb-6">
			<div className="flex items-center gap-3 mb-2">
				<div className={`p-2 rounded-lg ${dark ? "bg-blue-900/30" : "bg-blue-100"} text-blue-500`}>
					{icon}
				</div>
				<h2 className="text-xl font-bold">{title}</h2>
			</div>
			<p className={`text-sm ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
				{subtitle}
			</p>
		</div>
	);

	const FeatureCard = ({ icon, title, description }) => (
		<div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${dark ? "bg-zinc-800/40 border-zinc-700 hover:border-blue-500/50" : "bg-gray-50 border-gray-200 hover:border-blue-300"}`}>
			<div className="flex items-start gap-3">
				<div className={`p-2 rounded-lg ${dark ? "bg-blue-900/20" : "bg-blue-100"} text-blue-500`}>
					{icon}
				</div>
				<div>
					<h3 className="font-semibold mb-1">{title}</h3>
					<p className={`text-sm ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
						{description}
					</p>
				</div>
			</div>
		</div>
	);

	const CodeBlock = ({ title, code, icon }) => (
		<div className={`relative group rounded-xl overflow-hidden transition-all duration-300 ${dark ? "bg-zinc-900/60 border border-zinc-800" : "bg-white border border-gray-200 shadow-sm"}`}>
			<div className={`flex justify-between items-center px-5 py-4 border-b ${dark ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-200"}`}>
				<div className="flex items-center gap-2">
					{icon && <span className={dark ? "text-zinc-400" : "text-gray-500"}>{icon}</span>}
					<span className={`font-mono text-sm font-medium ${dark ? "text-zinc-300" : "text-gray-700"}`}>
						{title}
					</span>
				</div>
				<button
					onClick={() => copy(code, title)}
					className={`flex items-center gap-2 text-xs rounded-lg cursor-pointer border px-3 py-2 transition-all duration-200 ${
						copyCheck === title
							? "bg-green-500/10 text-green-600 border-green-500/20"
							: dark
							? "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
							: "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
					}`}
				>
					{copyCheck === title ? <FaCheck className="animate-pulse" /> : <FaCopy />}
					{copyCheck === title ? "Copied!" : "Copy"}
				</button>
			</div>
			<pre className={`p-3 text-sm overflow-auto font-mono leading-relaxed ${dark ? "text-zinc-200" : "text-gray-800"}`}>
				<div className={`backdrop-blur-sm ${dark ? "bg-zinc-800/20" : "bg-zinc-200/50"} p-2 rounded`}>
					<code>{code}</code>
				</div>
			</pre>
		</div>
	);

	const ExampleBadge = ({ text, color }) => (
		<span className={`px-2 py-1 rounded text-xs font-medium ${dark ? `bg-${color}-900/30 text-${color}-300` : `bg-${color}-100 text-${color}-700`}`}>
			{text}
		</span>
	);

	return (
		<div className={`min-h-screen transition-colors duration-300`}>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
				<div className={`backdrop-blur-xs p-2 mb-4 rounded-lg border ${dark ? "border-blue-700/30 bg-blue-800/10" : "border-blue-300/50 bg-blue-200/30"}`}>
					<Link to={"/"} className={`text-sm rounded flex flex-row gap-1 items-center w-fit px-2 p-1 font-semibold border cursor-pointer ${dark ? "bg-blue-600/10 border-blue-800/50 hover:bg-blue-600/30 text-blue-100": "bg-blue-600/10 border-blue-300 text-blue-600 hover:bg-blue-500/20"}`}>
						Back <FaSignOutAlt/>
					</Link>
				</div>
				<div className={`relative overflow-hidden backdrop-blur-md rounded-2xl p-8 mb-10 border ${dark ? "bg-gradient-to-r from-blue-900/10 to-purple-900/10 border-blue-800/20" : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"}`}>
					<div className="flex items-center gap-4 mb-4 z-50 overflow-hidden">
						<div className={`p-3 rounded-xl ${dark ? "bg-blue-900/30" : "bg-white shadow"} text-blue-500`}>
							<FaServer size={28} />
						</div>
						<div>
							<h1 className="text-3xl font-bold">Media Server</h1>
							<p className={`mt-1 ${dark ? "text-blue-300" : "text-blue-600"}`}>
								REST API for file storage and streaming
							</p>
						</div>
					</div>
					<p className={`text-lg max-w-3xl ${dark ? "text-zinc-300" : "text-gray-700"}`}>
						A lightweight, folder-based media server designed for modern web applications.
						Stream videos, serve images, and manage documents with simple HTTP requests.
					</p>
				</div>

				<div className="flex flex-col gap-6">
					<div className="lg:col-span-2 space-y-10">
						<section>
							<SectionHeader 
								icon={<FaLink />} 
								title="Base URL" 
								subtitle="The root endpoint for all API requests"
							/>
							<CodeBlock 
								title="API Endpoint" 
								code={BASE_URL}
								icon={<FaCode />}
							/>
						</section>

						<section>
							<SectionHeader 
								icon={<FaCheck />} 
								title="Core Features" 
								subtitle="Everything you need for media management"
							/>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FeatureCard
									icon={<FaFolder />}
									title="Folder Organization"
									description="Organize media by sites and types. Keep everything structured and accessible."
								/>
								<FeatureCard
									icon={<FaVideo />}
									title="Video Streaming"
									description="HTTP Range support for smooth video playback. Perfect for web players."
								/>
								<FeatureCard
									icon={<FaImage />}
									title="Image Serving"
									description="Optimized image delivery with direct URLs. Works with CDNs."
								/>
								<FeatureCard
									icon={<FaUpload />}
									title="Easy Upload"
									description="Simple multipart upload API. Integrate in minutes."
								/>
							</div>
						</section>

						<section>
							<SectionHeader 
								icon={<FaFolder />} 
								title="Folder Structure" 
								subtitle="Logical organization for your media files"
							/>
							<CodeBlock 
								title="Directory Tree" 
								code={folderTree}
								icon={<FaCode />}
							/>
							<p className={`mt-3 text-sm ${dark ? "text-zinc-400" : "text-gray-600"}`}>
								Each site has its own folder with separate directories for videos, images, and documents.
							</p>
						</section>

						{/* Upload API */}
						<section>
							<SectionHeader 
								icon={<FaUpload />} 
								title="Upload Files" 
								subtitle="Add new media to your server"
							/>
							<div className="space-y-4">
								<div className={`p-4 rounded-lg ${dark ? "bg-zinc-800/50" : "bg-gray-100"}`}>
									<p className={`text-sm ${dark ? "text-zinc-300" : "text-gray-700"}`}>
										Upload files using multipart/form-data. The server accepts videos, images, and documents.
									</p>
								</div>
								
								<CodeBlock 
									title="POST Endpoint" 
									code={uploadApiExample}
									icon={<FaCode />}
								/>
								
								<CodeBlock 
									title="Frontend Implementation" 
									code={uploadFetchExample}
									icon={<FaCode />}
								/>

								<div className={`backdrop-blur-xs p-4 rounded-lg ${dark ? "bg-blue-900/20 border border-blue-800/30" : "bg-blue-50 border border-blue-200"}`}>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<ExampleBadge text="Parameters" color={"blue"}/>
									</h4>
									<ul className="space-y-2 text-sm">
										<li className="flex items-center gap-2">
											<span className={`w-2 h-2 rounded-full ${dark ? "bg-blue-500" : "bg-blue-400"}`}></span>
											<span><code className="px-2 py-1 rounded">:site</code> → Your site folder name</span>
										</li>
										<li className="flex items-center gap-2">
											<span className={`w-2 h-2 rounded-full ${dark ? "bg-blue-500" : "bg-blue-400"}`}></span>
											<span><code className="px-2 py-1 rounded">:type</code> → videos | images | documents</span>
										</li>
										<li className="flex items-center gap-2">
											<span className={`w-2 h-2 rounded-full ${dark ? "bg-blue-500" : "bg-blue-400"}`}></span>
											<span><code className="px-2 py-1 rounded">file</code> → Form data key for the file</span>
										</li>
									</ul>
								</div>
							</div>
						</section>

						{/* Get Folders */}
						<section>
							<SectionHeader 
								icon={<FaFolder />} 
								title="Browse Folders" 
								subtitle="List all media in a specific site"
							/>
							<CodeBlock 
								title="GET Folders" 
								code={fetchExample}
								icon={<FaCode />}
							/>
						</section>

						<section>
							<SectionHeader 
								icon={<FaLink />} 
								title="Direct Media URLs" 
								subtitle="Access your files directly"
							/>
							<div className="space-y-4">
								<div>
									<h4 className="font-medium mb-2 flex items-center gap-2">
										<FaVideo className="text-red-500" /> Video Files
									</h4>
									<CodeBlock title="MP4 Streaming" code={videoExample} />
								</div>
								
								<div>
									<h4 className="font-medium mb-2 flex items-center gap-2">
										<FaImage className="text-green-500" /> Images
									</h4>
									<CodeBlock title="JPG/PNG Serving" code={imageExample} />
								</div>
								
								<div>
									<h4 className="font-medium mb-2 flex items-center gap-2">
										<FaFile className="text-yellow-500" /> Documents
									</h4>
									<CodeBlock title="PDF Access" code={documentExample} />
								</div>
							</div>
						</section>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						<div className={`backdrop-blur-xs p-6 rounded-xl ${dark ? "bg-zinc-800/40 border border-zinc-700" : "bg-white border border-gray-200 shadow-sm"}`}>
							<h3 className="font-bold text-lg mb-4">🚀 Quick Start</h3>
							<ol className="space-y-3 text-sm">
								<li className="flex items-start gap-3">
									<span className={`px-2 py-1 rounded text-xs font-bold ${dark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"}`}>1</span>
									<span>Organize files in folder structure</span>
								</li>
								<li className="flex items-start gap-3">
									<span className={`px-2 py-1 rounded text-xs font-bold ${dark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"}`}>2</span>
									<span>Upload via POST /api/id/:site/:type</span>
								</li>
								<li className="flex items-start gap-3">
									<span className={`px-2 py-1 rounded text-xs font-bold ${dark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"}`}>3</span>
									<span>Access files with direct URLs</span>
								</li>
							</ol>
						</div>

						<div className={`backdrop-blur-xs p-6 rounded-xl ${dark ? "bg-amber-900/20 border border-amber-800/30" : "bg-amber-50 border border-amber-200"}`}>
							<h3 className="font-bold text-lg mb-4 flex items-center gap-2">
								<ExampleBadge text="Best Practices" color={"amber"}/>
							</h3>
							<ul className="space-y-3 text-sm">
								<li className="flex items-start gap-2">
									<span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${dark ? "bg-amber-500" : "bg-amber-400"}`}></span>
									<span>Use CDN for production traffic</span>
								</li>
								<li className="flex items-start gap-2">
									<span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${dark ? "bg-amber-500" : "bg-amber-400"}`}></span>
									<span>Add authentication for private files</span>
								</li>
								<li className="flex items-start gap-2">
									<span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${dark ? "bg-amber-500" : "bg-amber-400"}`}></span>
									<span>Keep folder names URL-safe</span>
								</li>
							</ul>
						</div>

						<div className={`backdrop-blur-xs p-6 rounded-xl ${dark ? "bg-emerald-900/20 border border-emerald-800/30" : "bg-emerald-50 border border-emerald-200"}`}>
							<h3 className="font-bold text-lg mb-4">📝 Use Cases</h3>
							<ul className="space-y-3 text-sm">
								<li className="flex items-start gap-2">
									<span className={`w-2 h-2 rounded-full mt-1.5 ${dark ? "bg-emerald-500" : "bg-emerald-400"}`}></span>
									<span>Video streaming platforms</span>
								</li>
								<li className="flex items-start gap-2">
									<span className={`w-2 h-2 rounded-full mt-1.5 ${dark ? "bg-emerald-500" : "bg-emerald-400"}`}></span>
									<span>Image galleries & portfolios</span>
								</li>
								<li className="flex items-start gap-2">
									<span className={`w-2 h-2 rounded-full mt-1.5 ${dark ? "bg-emerald-500" : "bg-emerald-400"}`}></span>
									<span>Document sharing systems</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;