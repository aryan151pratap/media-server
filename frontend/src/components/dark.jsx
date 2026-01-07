import { useEffect, useState } from "react";

function DarkMode({dark, setDark}) {

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`px-3 py-1 rounded ${dark ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black"} cursor-pointer`}
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}

export default DarkMode;
