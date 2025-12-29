import { useEffect, useState } from "react";

const AddMedia = ({ api, apiList }) => {
	const [selectApi, setSelectApi] = useState("");
	const [mediaType, setMediaType] = useState("");
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState(null);
	const [data, setData] = useState(null);
	const [uploading, setUploading] = useState(false);

	const getAcceptType = () => {
		if (mediaType === "videos") return ".mp4,.mkv,.avi,.mov,.webm,.flv";
		if (mediaType === "images") return "image/*";
		if (mediaType === "audios") return ".mp3,.wav,.ogg,.m4a";
		if (mediaType === "documents") return ".pdf,.doc,.docx,.txt";
		return "";
	};

	useEffect(() => {
		// setFile(null);
		// setProgress(0);
		// setMessage(null);
		// setData(null);
		// setUploading(false);
	}, [mediaType, selectApi]);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
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
			if (xhr.status !== 200) {
				setMessage({ error: xhr.response?.error || "Upload failed" });
				setProgress(0);
				return;
			}
			setMessage({ success: "Upload successful" });
			setData(xhr.response);
			setProgress(100);
		};

		xhr.onerror = () => {
			setUploading(false);
			setMessage({ error: "Network error" });
			setProgress(0);
		};

		xhr.send(formData);
	};

	return (
		<div className="w-full bg-zinc-900/70 border border-zinc-700 rounded-xl p-4 flex flex-col gap-4 overflow-auto">
			<h2 className="text-sm text-zinc-300 font-semibold">Add Media</h2>

			<select
				value={selectApi}
				onChange={(e) => setSelectApi(e.target.value)}
				className="bg-zinc-800 px-3 py-2 rounded border border-zinc-700 text-sm"
			>
				<option value="" disabled>Select API</option>
				{apiList.map((i, idx) => (
					<option key={idx} value={i}>{api}{i}</option>
				))}
			</select>

			<div className="flex flex-row items-center gap-2">
				{selectApi && (
					<select
						value={mediaType}
						onChange={(e) => setMediaType(e.target.value)}
						className="bg-zinc-800 px-3 py-2 rounded border border-zinc-700 text-sm"
					>
						<option value="" disabled>Select Media Type</option>
						<option value="videos">Videos</option>
						<option value="images">Images</option>
						<option value="audios">Audios</option>
						<option value="documents">Documents</option>
					</select>
				)}

				{mediaType && (
					<input
						type="file"
						accept={getAcceptType()}
						onChange={handleFileChange}
						className="ml-auto file:bg-zinc-800 file:text-zinc-200 file:border-0 file:px-3 file:py-1 file:rounded text-sm"
					/>
				)}

				{file && !uploading && progress === 0 && (
					<button
						onClick={handleAddMedia}
						className="self-end bg-green-600/20 text-green-400 px-4 py-2 rounded hover:bg-green-600/30 text-sm"
					>
						Upload
					</button>
				)}

			</div>
			{uploading && (
				<div className="w-full">
					<div className="h-2 bg-zinc-700 rounded overflow-hidden">
						<div
							className="h-full bg-green-500 transition-all"
							style={{ width: `${progress}%` }}
						/>
					</div>
					<p className="text-xs text-zinc-400 mt-1">{progress}%</p>
				</div>
			)}

			{message?.success && (
				<p className="text-green-400 bg-green-600/20 px-3 py-1 rounded text-sm w-fit">
					{message.success}
				</p>
			)}

			{message?.error && (
				<p className="text-red-400 bg-red-600/20 px-3 py-1 rounded text-sm w-fit">
					{message.error}
				</p>
			)}

			{data && (
				<pre className="bg-zinc-950 p-3 rounded text-xs max-h-40 overflow-auto custom-scrollbar">
					{JSON.stringify(data, null, 2)}
				</pre>
			)}
		</div>
	);
};

export default AddMedia;
