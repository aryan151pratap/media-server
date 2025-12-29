import { GoogleLogin } from "@react-oauth/google";
const api = import.meta.env.VITE_API_URL;
const Google_Login = function({login, setLoading, setMessage, setUser}){

	const handleGoogleLogin = async (credential) => {
		setLoading(true);

		try {
			const res = await fetch(`${api}/google/google-login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token: credential }),
			});
			const result = await res.json();

			if (!res.ok) {
				setMessage(result.message);
				return;
			}

			localStorage.setItem("media-email", result.email);
      		setUser(result.user);
		} catch {
			setMessage("Google login failed");
		} finally {
			setLoading(false);
		}
	};
	return(
		<div className="mt-3 flex justify-center">
			<div className="w-fit border-2 border-zinc-400 rounded-md hover:border-blue-500 transition duration-500">
			<GoogleLogin
				theme="filled_black"
				size="large" 
				text={!login && "continue_with"}
				onSuccess={(res) => handleGoogleLogin(res.credential)}
				onError={() => setMessage("Google login failed")}
			/>
			</div>
        </div>
	)
}

export default Google_Login;