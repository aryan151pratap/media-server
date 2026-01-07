import { useEffect, useState } from "react";
import { FaCheck, FaServer, FaRocket, FaShieldAlt, FaFolderOpen } from "react-icons/fa";
const image = import.meta.env.VITE_IMAGE;

const Working = ({ dark }) => {
  const [copyCheck, setCopyCheck] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL;

  const copy = (text, title) => {
    setCopyCheck(title);
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (!copyCheck) return;
    const t = setTimeout(() => setCopyCheck(""), 1000);
    return () => clearTimeout(t);
  }, [copyCheck]);


  return (
    <div className={`${dark ? "bg-zinc-900 text-zinc-200" : "text-zinc-900"}`}>

      <section className="max-w-6xl mx-auto px-6 pt-20">
        <h1 className="text-5xl font-bold mb-4">Media Server</h1>
        <p className="text-lg opacity-80 max-w-2xl">
          REST-based media server for uploading, organizing, and streaming files
          using public URLs and folder-based architecture.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">
        <div className="flex gap-4">
          <FaServer className="text-orange-500 mt-1" />
          <div>
            <h3 className="font-semibold">Massive scale</h3>
            <p className="opacity-70 text-sm">
              Folder-based media storage designed for CDN-friendly global delivery.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaRocket className="text-orange-500 mt-1" />
          <div>
            <h3 className="font-semibold">Fast streaming</h3>
            <p className="opacity-70 text-sm">
              Video streaming with HTTP range support for smooth playback.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaShieldAlt className="text-orange-500 mt-1" />
          <div>
            <h3 className="font-semibold">Secure access</h3>
            <p className="opacity-70 text-sm">
              Designed to work behind Cloudflare or Nginx with access control.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaFolderOpen className="text-orange-500 mt-1" />
          <div>
            <h3 className="font-semibold">Simple structure</h3>
            <p className="opacity-70 text-sm">
              Easy site-based folder organization for all media types.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28 grid md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center">
          {/* ADD IMAGE URL HERE */}
          <div className={`w-80 h-80 rounded-full flex items-center justify-center ${dark ? "bg-zinc-800" : "bg-gray-100"}`}>
            <img src={image} alt="" className=""/>
          </div>
        </div>

        <div>
          <span className="uppercase text-sm text-orange-500 font-semibold">
            How it works
          </span>
          <h2 className="text-4xl font-bold mt-3">
            Increase content availability and redundancy
          </h2>
          <p className="mt-5 opacity-80 text-lg">
            Media files are uploaded via REST APIs, organized by site and type,
            and served through public URLs optimized for frontend and CDN usage.
          </p>
        </div>
      </section>

      
    </div>
  );
};

export default Working;
