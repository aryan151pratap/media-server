import { useEffect } from "react";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const AddMedia = ({ api, apiList, user }) => {
	const [selectApi, setSelectApi] = useState("");
	const [mediaType, setMediaType] = useState("");
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState(null);
	const [data, setData] = useState(null);

	const getAcceptType = () => {
		if (mediaType === "videos")
			return ".mp4,.mkv,.avi,.mov,.webm,.flv";
		if (mediaType === "images")
			return "image/*";
		if (mediaType === "audios")
			return ".mp3,.wav,.ogg,.m4a";
		if (mediaType === "documents")
			return ".pdf,.doc,.docx,.txt";
		return "";
	};

	useEffect(() => {
		setProgress(0);	
		setFile(null);
	}, [mediaType])

	const handleAddMedia = () => {
		if (!file || !mediaType || !selectApi) return;

		const formData = new FormData();
		formData.append("file", file);

		const xhr = new XMLHttpRequest();
		xhr.open("POST", `${api}${selectApi}/${mediaType}`);
		xhr.responseType = "json";

		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) {
				setProgress(Math.round((e.loaded / e.total) * 100));
			}
		};

		xhr.onload = () => {
			if (xhr.status !== 200) {
				setMessage({ error: xhr.response?.error || "Upload failed" });
				setProgress(0);
				return;
			}
			setData(xhr.response);
			setMessage({ message: "Upload successful" });
			setProgress(100);
		};

		xhr.send(formData);
	};

	return (
		<div className="w-full bg-zinc-800/40 p-4 rounded-md flex flex-col gap-3 mt-4">
			<p className="text-zinc-300/60">Add Media</p>

			<select
				value={selectApi}
				onChange={(e) => {
					setSelectApi(e.target.value);
					setMediaType("");
					setFile(null);
					setProgress(0);
				}}
				className="bg-zinc-900 px-2 py-1 rounded outline-none border border-zinc-700"
			>
				<option value="" disabled>Select API</option>
				{apiList.map((i, idx) => (
					<option key={idx} value={i}>{api}{i}</option>
				))}
			</select>

			<div className="w-full flex flex-row justify-between">
				{selectApi && (
					<select
						value={mediaType}
						onChange={(e) => {
							setMediaType(e.target.value);
							setFile(null);
							setProgress(0);
						}}
						className="bg-zinc-900 px-2 py-1 rounded outline-none border border-zinc-700"
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
						onChange={(e) => setFile(e.target.files[0])}
						className="bg-zinc-900 px-2 py-1 rounded border border-zinc-700"
					/>
				)}

				{file && progress == 0 && (
					<button
						onClick={handleAddMedia}
						className="bg-green-600/20 text-green-400 px-3 py-1 rounded hover:bg-green-600/30 cursor-pointer"
					>
						Upload
					</button>
				)}
			</div>


			{progress > 0 && !message?.message && (
				<div className="w-full bg-zinc-700 rounded overflow-hidden h-2">
					<div
						className="bg-green-500 h-full transition-all"
						style={{ width: `${progress}%` }}
					/>
					<p>{progress}%</p>
				</div>
			)}

			{message?.message && (
				<p className="w-fit text-green-400 bg-green-600/20 px-2 py-1 rounded">
					{message.message}
				</p>
			)}

			{message?.error && (
				<p className="w-fit text-red-400 bg-red-600/20 px-2 py-1 rounded">
					{message.error}
				</p>
			)}

			{data && (
				<pre className="bg-zinc-900 p-2 rounded text-xs overflow-auto custom-scrollbar">
					{JSON.stringify(data, null, 2)}
				</pre>
			)}
		</div>
	);
};

export default AddMedia;
