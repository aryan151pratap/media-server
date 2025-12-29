import React from "react";

const UserProfile = ({ user }) => {
	console.log(user);
	if (!user) return null;

	return (
		<div className="mt-12 p-6 bg-zinc-900 text-white">
			<div className="flex items-center gap-5 mb-6">
				<img
					src={user.image || "/default-avatar.png"}
					alt={user.name}
					className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
				/>
				<div>
					<h2 className="text-3xl font-bold">{user.name}</h2>
					<p className="text-sm text-zinc-400 uppercase">{user.role}</p>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex justify-between bg-zinc-800/50 px-4 py-3 rounded-lg">
					<span className="text-zinc-400">Email</span>
					<span>{user.email}</span>
				</div>

				<div className="flex justify-between bg-zinc-800/50 px-4 py-3 rounded-lg">
					<span className="text-zinc-400">Login Type</span>
					<span>{user.googleId ? "Google" : "Email/Password"}</span>
				</div>

				{user.api?.length > 0 && (
					<div className="flex flex-col bg-zinc-800/50 px-4 py-3 rounded-lg">
						<span className="text-zinc-400 mb-1">API Keys</span>
						<ul className="list-disc list-inside text-sm">
							{user.api.map((key, i) => (
								<li key={i}>{key}</li>
							))}
						</ul>
					</div>
				)}

				<div className="flex justify-between bg-zinc-800/50 px-4 py-3 rounded-lg">
					<span className="text-zinc-400">Created At</span>
					<span>{new Date(user.createdAt).toLocaleString()}</span>
				</div>

				<div className="flex justify-between bg-zinc-800/50 px-4 py-3 rounded-lg">
					<span className="text-zinc-400">Last Updated</span>
					<span>{new Date(user.updatedAt).toLocaleString()}</span>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
