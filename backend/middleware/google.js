const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const User = require("../model/user");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub, picture } = payload;
    let user = await User.findOne({ email });

    if (!user) {
		user = await User.create({
			name,
			email,
			googleId: sub,
			image: picture
		});
	}

    res.json({ email: user.email, user });
  } catch (err) {
    res.status(401).json({ message: "Google authentication failed" });
  }
});

module.exports = router;
