import React from "react";
import DarkMode from "./components/dark";
const API_URL = import.meta.env.VITE_API_URL;

const UserProfile = ({ user, dark, setDark }) => {
	if (!user) return null;

	const bg = dark ? "bg-zinc-900" : "bg-white";
	const cardBg = dark ? "bg-zinc-800/50" : "bg-zinc-200/50";
	const textMain = dark ? "text-white" : "text-zinc-900";
	const textSecondary = dark ? "text-zinc-400" : "text-zinc-600";
	const borderColor = dark ? "border-blue-500" : "border-blue-600";

	return (
		<div className={`mt-12 p-6 ${bg} ${textMain} rounded-lg`}>
			<div className="backdrop-blur-xs flex items-center gap-5 mb-6">
				<img
					src={user.image || "/default-avatar.png"}
					alt={user.name}
					className={`w-24 h-24 rounded-full border-2 ${borderColor} object-cover`}
				/>
				<div>
					<h2 className="text-3xl font-bold">{user.name}</h2>
					<p className={`text-sm uppercase ${textSecondary}`}>{user.role}</p>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<div className={`backdrop-blur-xs flex justify-between ${cardBg} px-4 py-3 rounded-lg`}>
					<span className={textSecondary}>Email</span>
					<span>{user.email}</span>
				</div>

				<div className={`backdrop-blur-xs flex justify-between ${cardBg} px-4 py-3 rounded-lg`}>
					<span className={textSecondary}>Login Type</span>
					<span>{user.googleId ? "Google" : "Email/Password"}</span>
				</div>

				{user.api?.length > 0 && (
					<div className={`backdrop-blur-xs flex flex-col ${cardBg} px-4 py-3 rounded-lg`}>
						<span className={`${textSecondary} mb-1`}>API Keys</span>
						<ul className="list-disc list-inside text-sm">
							{user.api.map((key, i) => (
								<li key={i}>{API_URL}/api/{user._id}/{key}</li>
							))}
						</ul>
					</div>
				)}

				<div className={`backdrop-blur-xs flex justify-between ${cardBg} px-4 py-3 rounded-lg`}>
					<span className={textSecondary}>Created At</span>
					<span>{new Date(user.createdAt).toLocaleString()}</span>
				</div>

				<div className={`backdrop-blur-xs flex justify-between ${cardBg} px-4 py-3 rounded-lg`}>
					<span className={textSecondary}>Last Updated</span>
					<span>{new Date(user.updatedAt).toLocaleString()}</span>
				</div>

				<div>
					<DarkMode dark={dark} setDark={setDark} />
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
