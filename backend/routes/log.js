const express = require("express");
const router = express.Router();
const Log = require("../model/logging");

router.get("/:id", async (req, res) => {
	try{
		const { id } = req.params;
		const skip = Number(req.query.skip || 0);
		console.log(skip);
		const logs = await Log.find({user: id}).sort({createdAt: -1}).skip(skip).limit(10).select("-_id -updatedAt -__v -userAgent");
		if(logs.length == 0) return res.status(400).json({message: "requests log is not found!"});
		res.json({logs});
	} catch (err){
		console.log(err);
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Log.deleteMany({ user: id });
		if (result.deletedCount === 0)
			return res.status(400).json({ message: "no logs found" });
		res.json({ deleted: result.deletedCount });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "error deleting logs" });
	}
});

module.exports = router;
