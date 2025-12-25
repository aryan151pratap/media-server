const express = require("express");
const router = express.Router();
const User = require("../model/user");
const {getFoldersBySite, getFilesByFolder} = require("../utils/folder");

router.get("/folder/:id/:domain", async (req, res) => {
	try{
		const {id, domain} = req.params;
		if(domain === 'undefined') return res.status(400).json({message: "please enter your valid api!"});
		const folders = getFoldersBySite(id, domain);
		if(folders.length == 0) return res.status(400).json({message: "no folder exist!"});
		res.json(folders);
	} catch(err){
		console.log(err);
	}
})

router.get("/files/:id/:domain/:type", async (req, res) => {
	try{
		const {id, domain, type} = req.params;
		if(!domain) return res.status(400).json({message: "please enter your valid api!"});
		const files = getFilesByFolder(id, domain, type);
		res.json(files);
	} catch(err){
		console.log(err);
	}
})

module.exports = router;
