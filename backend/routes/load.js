const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

router.get("/:id/:site/:type/:filename", (req, res) => {
	const {id, site, type, filename} = req.params;
	const videoPath = path.join("D:/media", id, site, type, filename);

	if (!fs.existsSync(videoPath)) {
		return res.status(404).send({message :"Video not found"});
	}
	
	const contentType = mime.lookup(videoPath) || "application/octet-stream";
	const stat = fs.statSync(videoPath);
	const fileSize = stat.size;
	const range = req.headers.range;
	console.log(range);
	if (range) {
		console.log("large files");
		const CHUNK_SIZE = 2 * 1024 * 1024; // 2 MB
		const parts = range.replace(/bytes=/, "").split("-");
		const start = parseInt(parts[0], 10);
		let end;
		if (parts[1]) {
			end = parseInt(parts[1], 10);
		} else {
			end = Math.min(start + CHUNK_SIZE - 1, fileSize - 1);
		}	
		console.log("byte sending ",start, " - ", end);
		
		if (start >= fileSize) {
			res.status(416).set({
				"Content-Range": `bytes */${fileSize}`,
			}).end();
			return;
    	}
		const chunkSize = end - start + 1;

		const file = fs.createReadStream(videoPath, { start, end });
		const head = {
			"Content-Range": `bytes ${start}-${end}/${fileSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": chunkSize,
			"Content-Type": contentType,
		};

		res.writeHead(206, head);
		file.pipe(res);
	} else {
		console.log("small files");
		const head = {
			"Content-Length": fileSize,
			"Content-Type": contentType,
		};
		res.writeHead(200, head);
		fs.createReadStream(videoPath).pipe(res);
	}
});

module.exports = router;
