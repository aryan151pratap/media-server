const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/auth", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({email});
  if(user) return res.status(400).json({message: "user already exists"});
  const hashedPassword = await bcrypt.hash(password, 10);
  const newuser = await User.create({ name, email, password: hashedPassword });
  res.json(newuser);
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({email});
	if(!user) return res.status(400).json({message: "user not found!"});
	if (!user.password && user.googleId) {
		return res.status(400).json({ message: "Use Google login" });
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return res.status(400).json({ message: "Invalid password" });
	res.status(200).json(user);
});

router.get("/login/:email", async (req, res) => {
	const email = req.params.email;
	const user = await User.findOne({email});
	if(!user) return res.status(400).json({message: "user not found!"});
	res.status(200).json(user);
});

router.post('/api/:userId', async (req, res) => {
	try{
		const {api} = req.body;
		const {userId} = req.params;
		const user = await User.findOneAndUpdate(
			{_id: userId},
			{$push : { api: api }},
			{ new: true }
		)
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json({message: "saved"});
	} catch(err){
		console.log(err);
	}
})

router.get("/getApi/:userId", async (req, res) => {
	try{
		const {userId} = req.params;
		const user = await User.findById(userId).select("api");
		res.status(200).json({api: user.api});
	} catch(err){
		console.log(err);
	}
})

router.get("/deleteApi/:userId/:domain", async (req, res) => {
	try{
		const {userId, domain} = req.params;
		const user = await User.findByIdAndUpdate(
			userId,
			{$pull : { api: domain }},
			{ new: true }
		);
		res.status(200).json({message: "deleted"});
	} catch(err){
		console.log(err);
	}
})

router.get("/admin/:userId", async (req, res) => {
	try{
		const {userId} = req.params;
		const admin = await User.findById(userId);
		if(!admin) return res.status(400).json({message: "user not found"});
		const domain = await User.find().select("api name");
		res.json(domain);
	} catch(err){
		console.log(err);
	}
})


module.exports = router;
