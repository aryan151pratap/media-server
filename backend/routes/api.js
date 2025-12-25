const express = require("express");
const router = express.Router();
const mediaUploader = require("../utils/multer");

const allowedTypes = ["images", "videos", "audios", "documents"];
const uri = process.env.MEDIA_SERVER;

router.post("/:name/:site/:type", (req, res, next) => {
	const { name, site, type } = req.params;
	console.log(site, type);
	if (!/^[a-zA-Z0-9_-]+$/.test(site)) {
		return res.status(400).send("Invalid site name");
	}
	if (!allowedTypes.includes(type)) {
		return res.status(400).send("Invalid type");
	}

	next();
}, mediaUploader().single("file"), (req, res) => {
	const { name, site, type } = req.params;
	const file = req.file;
	const data = {
		filename: file.filename,
		originalname: file.originalname,
		url: `${uri}/load/${name}/${site}/${type}/${file.filename}`,
		encoding: file.encoding
	}
	console.log(data);
	if (!req.file) {
		return res.status(400).send("No file uploaded");
	}
	return res.status(200).send(data);
});

module.exports = router;
