import { useRef, useState, useEffect } from "react";
import { FaCheck, FaCopy, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";


const Audio = function ({ url, size, dark }) {
	const audioRef = useRef(null);

	const [playing, setPlaying] = useState(false);
	const [current, setCurrent] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [muted, setMuted] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [copyCheck, setCopyCheck] = useState("");

	useEffect(() => {
		const audio = audioRef.current;

		const loaded = () => setDuration(audio.duration);
		const timeUpdate = () => setCurrent(audio.currentTime);
		const ended = () => setPlaying(false);

		audio.addEventListener("loadedmetadata", loaded);
		audio.addEventListener("timeupdate", timeUpdate);
		audio.addEventListener("ended", ended);

		return () => {
			audio.removeEventListener("loadedmetadata", loaded);
			audio.removeEventListener("timeupdate", timeUpdate);
			audio.removeEventListener("ended", ended);
		};
	}, []);

	const togglePlay = () => {
		if (playing) audioRef.current.pause();
		else audioRef.current.play();
		setPlaying(!playing);
	};

	const seek = (e) => {
		const value = e.target.value;
		audioRef.current.currentTime = value;
		setCurrent(value);
	};

	const changeVolume = (e) => {
		const value = e.target.value;
		audioRef.current.volume = value;
		setVolume(value);
		if (value > 0 && muted) setMuted(false);
	};

	const toggleMute = () => {
		audioRef.current.muted = !muted;
		!muted? setVolume(0) : setVolume(100);
		setMuted(e => !e);
	};

	const changeSpeed = (e) => {
		const value = e.target.value;
		audioRef.current.playbackRate = value;
		setSpeed(value);
	};

	const format = (t) => {
		const m = Math.floor(t / 60);
		const s = Math.floor(t % 60);
		return `${m}:${s < 10 ? "0" : ""}${s}`;
	};

	useEffect(() => {
		if(!copyCheck) return;
		const timer = setTimeout(() => {
			setCopyCheck(false);
		}, 1000);

		return () => clearTimeout(timer);
	},[copyCheck])

	return (
		<div className={`w-full max-w-xl ${dark ? "bg-zinc-900 border-zinc-700" : "bg-blue-200/40 border-blue-300"} border rounded-xl p-2 text-zinc-200`}>
			<audio ref={audioRef} src={url} />

			<div className="flex items-center gap-4">
				<div className="flex flex-col gap-0.5 items-center bg-blue-400 rounded p-0.5">
					<button
						onClick={togglePlay}
						className="w-12 p-0.5 flex flex-col items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 transition"
					>
						<span className="text-xl">{playing ? "⏸" : "▶️"}</span>
					</button>
					<span className="w-full text-center rounded bg-blue-600 p-0.5 text-[10px] text-blue-100">{size}</span>

				</div>
				<div className="flex-1">
					<input
						type="range"
						min="0"
						max={duration || 0}
						value={current}
						onChange={seek}
						className="w-full accent-blue-500"
					/>
					<div className="flex justify-between text-xs text-zinc-400">
						<span>{format(current)}</span>
						<span>{format(duration)}</span>
					</div>
				</div>
			</div>

			<div className="flex items-center sm:gap-3 gap-1 overflow-auto custom-scrollbar p-1">
				<button
					onClick={toggleMute}
					className={`${dark ? "" : "text-blue-500"} text-sm`}
				>
					{muted || volume === 0 ? 
					<FaVolumeMute/>
					:
					<FaVolumeUp/>
					}
				</button>

				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={volume}
					onChange={changeVolume}
					className="sm:w-20 w-10 accent-blue-500 flex-1"
				/>

				<select
					value={speed}
					onChange={changeSpeed}
					className={`outline-none ${dark ? "bg-zinc-800 border-zinc-700 text-zinc-200 focus:border-zinc-500" : "bg-white/80 text-blue-500 focus:border-blue-500 border-blue-300"} border text-xs rounded px-2 py-1`}
				>
					<option value={0.5}>0.5×</option>
					<option value={0.75}>0.75×</option>
					<option value={1}>1×</option>
					<option value={1.25}>1.25×</option>
					<option value={1.5}>1.5×</option>
					<option value={2}>2×</option>
				</select>

				<button
					onClick={() => {
						setCopyCheck(true);
						navigator.clipboard.writeText(url);
					}}
					className={`ml-auto text-xs ${copyCheck ? "text-green-400 bg-green-500/30" : "text-blue-400 hover:text-blue-300 bg-blue-500/30"} p-2 rounded cursor-pointer`}
				>
					{copyCheck ? 
					<FaCheck/>
					:
					<FaCopy/>
					}
				</button>
			</div>
			
		</div>
	);
};

export default Audio;
