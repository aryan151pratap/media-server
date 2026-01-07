const express = require("express");
const router = express.Router();
const mediaUploader = require("../utils/multer");
const User = require("../model/user"); 

const allowedTypes = ["images", "videos", "audios", "documents"];
const uri = process.env.MEDIA_SERVER;

router.post("/:id/:site/:type", async (req, res, next) => {
	try{
		const { id, site, type } = req.params;
		console.log(site, type);
		if (!/^[a-zA-Z0-9_-]+$/.test(site)) {
			return res.status(400).send("Invalid site name");
		}
		if (!allowedTypes.includes(type)) {
			return res.status(400).send("Invalid type");
		}
		const user = await User.findById(id);
		if(!user) return res.status(401).json({error: "invelid API id!"});
		const check = user.api.includes(site);
		if(!check) return res.status(403).json({error: "API not allowedA"});

		next();
	} catch (err) {
      	return res.status(500).json({ error: "Server error" });
    }
}, mediaUploader().single("file"), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: "No file uploaded" });
    }
	const { id, site, type } = req.params;
	const file = req.file;
	const data = {
		filename: file.filename,
		originalname: file.originalname,
		url: `${uri}/load/${id}/${site}/${type}/${file.filename}`,
		encoding: file.encoding
	}
	console.log(data);
	return res.status(200).json(data);
});

module.exports = router;
