import { useState, useRef } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileAlt,
  FaDownload,
  FaExpand,
  FaEye,
  FaCompress
} from "react-icons/fa";

const FILE_MAP = {
  pdf: { icon: FaFilePdf, color: "bg-red-600" },
  doc: { icon: FaFileWord, color: "bg-blue-600" },
  docx: { icon: FaFileWord, color: "bg-blue-600" },
  xls: { icon: FaFileExcel, color: "bg-green-600" },
  xlsx: { icon: FaFileExcel, color: "bg-green-600" },
  ppt: { icon: FaFilePowerpoint, color: "bg-orange-500" },
  pptx: { icon: FaFilePowerpoint, color: "bg-orange-500" }
};

const getExt = (name) => name?.split(".").pop().toLowerCase();

const DocumentCard = ({ fileUrl, filename }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const ref = useRef(null);

  const ext = getExt(filename);
  const meta = FILE_MAP[ext] || { icon: FaFileAlt, color: "bg-zinc-600" };
  const Icon = meta.icon;

  const previewUrl =
    ext === "pdf"
      ? fileUrl
      : `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;

  const startPreview = () => {
    setOpen(!open);
    setLoading(true);
  };

  return (
    <div
      ref={ref}
      className="h-fit border border-zinc-700 bg-zinc-900 overflow-hidden rounded"
    >
      <div className={`flex items-center gap-3 p-3 ${meta.color}`}>
        <Icon className="shrink-0 text-xl text-white" />
        <p className="text-sm text-white truncate">{filename}</p>
      </div>

      <div className="flex justify-between items-center p-3 text-sm text-zinc-300">
        <button
          onClick={startPreview}
          className="flex items-center gap-1 hover:text-white cursor-pointer"
        >
          <FaEye /> Preview
        </button>

        <div className="flex gap-3">
          <a href={fileUrl} download className="hover:text-white">
            <FaDownload />
          </a>
          <button
            onClick={() => setFullscreen(e => !e)}
            className="hover:text-white"
          >
            <FaExpand />
          </button>
        </div>
      </div>

      {open && (
        <div className="relative h-60 border-t border-zinc-700">
          {loading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <p className="text-xs mt-2 text-white">Loading…</p>
            </div>
          )}

          <iframe
            src={previewUrl}
            className="w-full h-full"
            onLoad={() => setLoading(false)}
          />
        </div>
      )}

      {fullscreen &&
      <div className="fixed inset-0 z-100 flex p-2 sm:p-4 md:p-6 bg-black/20 backdrop-blur-xs">
        <button
            onClick={() => setFullscreen(e => !e)}
            className="p-1 sm:p-2 md:p-4 w-fit h-fit absolute inset-0 top-0 z-100 text-white ml-auto"
          >
            <FaCompress className="bg-zinc-400/30 text-2xl p-1 rounded hover:bg-zinc-600/40 cursor-pointer"/>
        </button>
        <iframe
          src={previewUrl}
          className="w-full h-full"
          onLoad={() => setLoading(false)}
        />
      </div>
      }
    </div>
  );
};

export default DocumentCard;
