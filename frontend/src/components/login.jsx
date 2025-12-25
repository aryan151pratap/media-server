import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Login = function ({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname.split("/")[1];

  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const email = localStorage.getItem("media-email");
      if (!email) return;

      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/user/login/${email}`);
        const result = await res.json();

        if (res.ok) {
          setUser(result);
          navigate(`/${route}`);
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleChange = (e) => {
    setMessage("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        login ? `${API_URL}/user/login` : `${API_URL}/user/auth`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        setMessage(result.message);
        return;
      }
      localStorage.setItem("media-email", result.email);
      setUser(result.user);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleAuth}
        className="w-[320px] flex flex-col gap-3 p-5 rounded-lg border border-zinc-700 bg-zinc-900 text-white"
      >
        <h2 className="text-lg font-semibold text-center">
          {login ? "Login" : "Create Account"}
        </h2>

        {!login && (
          <input
            type="text"
            name="name"
            required
            value={data.name}
            onChange={handleChange}
            placeholder="Name"
            className="outline-none border border-zinc-400/20 focus:border-zinc-400/60 px-2 p-1 rounded"
          />
        )}

        <input
          type="email"
          name="email"
          required
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          className="outline-none border border-zinc-400/20 focus:border-zinc-400/60 px-2 p-1 rounded"
        />

        <input
          type="password"
          name="password"
          required
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          className="outline-none border border-zinc-400/20 focus:border-zinc-400/60 px-2 p-1 rounded"
        />

        {message && (
          <p className="text-sm text-red-400 bg-red-500/10 px-2 py-1 rounded">
            {message}
          </p>
        )}

        <button
          disabled={loading}
          className="mt-2 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? "Please wait..." : login ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() => setLogin(!login)}
          className="text-sm text-center text-blue-400 cursor-pointer hover:underline"
        >
          {login ? "Create an account" : "Already have an account?"}
        </p>
      </form>
    </div>
  );
};

export default Login;
