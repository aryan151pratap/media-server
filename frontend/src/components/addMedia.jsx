import { useEffect, useState } from "react";
import { FaUpload, FaCheck, FaTimes, FaFile, FaVideo, FaImage, FaFileAudio, FaFilePdf } from "react-icons/fa";

const AddMedia = ({ api, apiList, dark }) => {
	const [selectApi, setSelectApi] = useState("");
	const [mediaType, setMediaType] = useState("");
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState(null);
	const [data, setData] = useState(null);
	const [uploading, setUploading] = useState(false);

	const mediaTypes = [
		{ value: "videos", label: "Videos", icon: <FaVideo />, accept: ".mp4,.mkv,.avi,.mov,.webm,.flv" },
		{ value: "images", label: "Images", icon: <FaImage />, accept: "image/*" },
		{ value: "audios", label: "Audios", icon: <FaFileAudio />, accept: ".mp3,.wav,.ogg,.m4a" },
		{ value: "documents", label: "Documents", icon: <FaFilePdf />, accept: ".pdf,.doc,.docx,.txt" }
	];

	useEffect(() => {
		setFile(null);
		setProgress(0);
		setMessage(null);
		setData(null);
		setUploading(false);
	}, [mediaType, selectApi]);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		setProgress(0);
		setMessage(null);
		setData(null);
		setUploading(false);
	};

	const handleAddMedia = () => {
		if (!file || !mediaType || !selectApi || uploading) return;

		setUploading(true);
		const formData = new FormData();
		formData.append("file", file);

		const xhr = new XMLHttpRequest();
		xhr.open("POST", `${api}${selectApi}/${mediaType}`);
		xhr.responseType = "json";

		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) {
				setProgress(Math.floor((e.loaded / e.total) * 100));
			}
		};

		xhr.onload = () => {
			setUploading(false);
			if (xhr.status === 200) {
				setMessage({ success: "Upload successful" });
				setData(xhr.response);
				setProgress(100);
			} else {
				setMessage({ error: xhr.response?.error || "Upload failed" });
				setProgress(0);
			}
		};

		xhr.onerror = () => {
			setUploading(false);
			setMessage({ error: "Network error" });
			setProgress(0);
		};

		xhr.send(formData);
	};

	const selectedType = mediaTypes.find(t => t.value === mediaType);

	return (
		<div className={`p-4 rounded-xl border ${dark ? "bg-zinc-800/30 border-zinc-700" : "bg-white/20 border-zinc-200 shadow-sm"}`}>
			<h2 className="font-bold mb-6 flex items-center gap-2">
				<FaUpload className={dark ? "text-blue-400" : "text-blue-500"} />
				Upload Media
			</h2>

			<div className="space-y-4">
				<div>
					<label className={`block text-sm font-medium mb-2 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>Select Domain</label>
					<select
						value={selectApi}
						onChange={(e) => setSelectApi(e.target.value)}
						className={`w-full px-4 py-3 rounded-lg border outline-none text-sm ${dark ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-zinc-300 text-zinc-900"}`}
					>
						<option value="" disabled>Choose a domain</option>
						{apiList.map((i, idx) => (
						<option key={idx} value={i}>{api}{i}</option>
						))}
					</select>
				</div>

				{selectApi && (
				<div>
					<label className={`block text-sm font-medium mb-2 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>Media Type</label>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
					{mediaTypes.map((type) => (
						<button
							key={type.value}
							onClick={() => setMediaType(type.value)}
							className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
								mediaType === type.value
								? dark
									? "bg-blue-500/20 border-blue-500/50 text-blue-400"
									: "bg-blue-50 border-blue-300 text-blue-600"
								: dark
								? "bg-zinc-900 border-zinc-700 hover:border-zinc-600"
								: "bg-white border-zinc-200 hover:border-zinc-300"
							}`}
						>
							<div className="text-lg mb-1">{type.icon}</div>
							<span className="text-xs">{type.label}</span>
						</button>
					))}
					</div>
				</div>
				)}

				{mediaType && (
				<div>
					<label className={`block text-sm font-medium mb-2 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>Choose File</label>
					<div className="flex flex-col sm:flex-row gap-3">
						<label className={`flex-1 cursor-pointer p-4 rounded-lg border-2 border-dashed text-center transition-all ${
							dark
							? "border-zinc-700 hover:border-zinc-600 bg-zinc-900/50"
							: "border-zinc-300 hover:border-zinc-400 bg-zinc-50/50"
						}`}>
							<input
								type="file"
								accept={selectedType?.accept}
								onChange={handleFileChange}
								className="hidden"
							/>
							<div className="flex flex-col items-center">
								<FaFile className={`text-2xl mb-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`} />
								<span className={`text-sm ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
									{file ? file.name : "Click to select file"}
								</span>
								<span className={`text-xs mt-1 ${dark ? "text-zinc-500" : "text-zinc-500"}`}>
									{selectedType?.accept}
								</span>
							</div>
						</label>
					
						{file && !uploading && (
							<button
								onClick={handleAddMedia}
								className={`w-fit h-fit mt-auto flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-all ${
									dark
									? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
									: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
								} text-white`}
							>
								<FaUpload />
								Upload Now
							</button>
						)}
					</div>
				</div>
				)}

				{uploading && (
				<div>
					<div className="flex justify-between text-xs mb-1">
						<span className={dark ? "text-zinc-400" : "text-zinc-600"}>Uploading...</span>
						<span className="font-medium">{progress}%</span>
					</div>
					<div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-zinc-700" : "bg-zinc-200"}`}>
						<div
							className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>
				)}

				{message && (
				<div className={`p-3 rounded-lg flex items-center gap-2 ${
					message.success
					? dark ? "bg-green-900/20 text-green-400" : "bg-green-50 text-green-700"
					: dark ? "bg-red-900/20 text-red-400" : "bg-red-50 text-red-700"
				}`}>
					{message.success ? <FaCheck /> : <FaTimes />}
					<span className="text-sm">{message.success || message.error}</span>
				</div>
				)}

				{data && (
				<div className="">
					<h3 className={`text-sm font-medium mb-2 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>Response</h3>
					<pre className={`p-3 rounded-lg text-xs max-h-40 overflow-auto custom-scrollbar ${
						dark ? "bg-zinc-900 text-zinc-300" : "bg-zinc-100 text-zinc-800"
						}`}>
						{JSON.stringify(data, null, 2)}
					</pre>
				</div>
				)}
			</div>
		</div>
	);
};

export default AddMedia;