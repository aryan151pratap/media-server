import { useRef, useState } from "react";
import { FaPlay, FaPause, FaCopy, FaCheck, FaDownload, FaExpand, FaTimes, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const Videos = ({ url, i }) => {
	const videoRef = useRef(null);
	const [playing, setPlaying] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [copied, setCopied] = useState(false);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const [open, setOpen] = useState(false);
	const [volume, setVolume] = useState(1);
	const [muted, setMuted] = useState(false);


	const videoUrl = url + i;

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video) return;
		playing ? video.pause() : video.play();
		setPlaying(!playing);
	};

	const changeSpeed = (val) => {
		const video = videoRef.current;
		if (!video) return;
		video.playbackRate = val;
		setSpeed(val);
	};

	const copyUrl = async () => {
		await navigator.clipboard.writeText(videoUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	};

	const handleTimeUpdate = () => {
		const video = videoRef.current;
		if (!video) return;
		setProgress((video.currentTime / video.duration) * 100 || 0);
	};

	const handleSeek = (e) => {
		const video = videoRef.current;
		if (!video) return;
		const time = (e.target.value / 100) * duration;
		video.currentTime = time;
		setProgress(e.target.value);
	};

	const formatTime = (time) => {
		if (!time) return "0:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60).toString().padStart(2, "0");
		return `${minutes}:${seconds}`;
	};

	const toggleMute = () => {
		const video = videoRef.current;
		if (!video) return;
		!muted ? setVolume(0) : setVolume(100);
		video.muted = !muted;
		setMuted(!muted);
	};

	const changeVolume = (val) => {
		const video = videoRef.current;
		if (!video) return;
		video.volume = val;
		video.muted = val === 0;
		setMuted(val === 0);
		setVolume(val);
	};



	return (
		<div className="relative w-full max-w-xl group bg-zinc-900 rounded overflow-hidden shadow-lg border border-zinc-300/20 hover:border-zinc-300/50">
			<div className="absolute z-50 inset-0 top-20 left-[88%] h-fit w-fit p-3 flex flex-row items-center gap-2 rotate-[-90deg] group/volume">
			
				<button
					onClick={toggleMute}
					className="p-1 w-full absolute inset-0 left-18 z-50 flex items-center justify-center rounded-full bg-zinc-700/30 hover:bg-zinc-400/80 hover:text-zinc-900/90 cursor-pointer"
				>
					{muted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
				</button>
				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={volume}
					onChange={(e) => changeVolume(Number(e.target.value))}
					className="absolute inset-0 top-0 left-[8px] hidden group-hover/volume:flex w-16 accent-red-500 cursor-pointer"
				/>
			</div>
			<div className="hidden group-hover:flex group-hover:text-zinc-300 bg-zinc-900/90 absolute inset-0 h-6 bg-zinc-300/20 p-1 text-xs line-clamp-1 break-all">
				{i}
			</div>
			<video
				ref={videoRef}
				src={videoUrl}
				className="w-full aspect-video object-cover"
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={(e) => setDuration(e.target.duration)}
				onEnded={() => setPlaying(false)}
			/>


			<div className={`absolute inset-0 flex flex-col justify-end group-hover:opacity-100 ${!playing ? "opacity-100" : "opacity-0"} transition-opacity`}>
				<button
					onClick={togglePlay}
					className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl cursor-pointer"
				>
					{playing ? <FaPause /> : <FaPlay />}
				</button>

				<div className={`absolute inset-0 top-auto flex flex-col cursor-pointer`}>
					<div className="text-xs inset-0 top-auto flex justify-between px-2 py-1 text-white text-sm pointer-events-none">
						<div>{formatTime((progress / 100) * duration)}</div>
						<div>{formatTime(duration)}</div>
					</div>
					<input
						type="range"
						min="0"
						max="100"
						value={progress}
						onChange={handleSeek}
						className="hidden group-hover:flex w-full h-1 z-60 accent-red-500 cursor-pointer"
					/>
					<div className="hidden group-hover:flex flex flex-row items-center justify-between px-4 py-1 bg-black/40">
						<button
							onClick={togglePlay}
							className="p-2 rounded-full bg-zinc-700/30 hover:bg-zinc-900/80"
						>
							{playing ? <FaPause /> : <FaPlay />}
						</button>

						<select
							value={speed}
							onChange={(e) => changeSpeed(Number(e.target.value))}
							className="bg-zinc-900/30 hover:bg-zinc-900/80 text-xs px-2 py-1 rounded outline-none"
						>
							<option value={0.5} className="bg-zinc-900">0.5x</option>
							<option value={1} className="bg-zinc-900">1x</option>
							<option value={1.25} className="bg-zinc-900">1.25x</option>
							<option value={1.5} className="bg-zinc-900">1.5x</option>
							<option value={2} className="bg-zinc-900">2x</option>
						</select>

						<button
							onClick={copyUrl}
							className="p-2 rounded-full bg-zinc-700/30 hover:bg-zinc-900/80"
						>
							{copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
						</button>

						<a
							href={videoUrl}
							download
							target="_blank"
							className="p-2 rounded-full bg-zinc-700/30 hover:bg-zinc-900/80 flex items-center justify-center"
						>
							<FaDownload />
						</a>
						<button className="bg-zinc-700/30 hover:bg-zinc-900/80 p-1 rounded cursor-pointer"
							onClick={() => setOpen(true)}
						>
							<FaExpand/>
						</button>
					</div>
				</div>        
			</div>

			{open &&
			<div className="fixed backdrop-blur-sm w-full h-full p-2 sm:p-8 md:p-10 z-100 bg-black/40 flex items-center justify-center inset-0">
				<div className="fixed inset-0 left-auto text-xl text-white p-2">
					<FaTimes className="bg-zinc-200/30 hover:bg-zinc-200/40 rounded cursor-pointer p-1"
						onClick={() => setOpen(false)}
					/>
				</div>
				<video src={url+i} controls alt="" className="max-w-full max-h-full object-cover"/>
			</div>
			}
		</div>
	);
};

export default Videos;
