const RequestLog = require("../model/logging");

module.exports = (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
	
    try {
		const { id, site, type } = req.params;
		console.log(id, site);
		if (!id || !site) return;
		await RequestLog.create({
			api: site,
			user: id,
			method: req.method,
			path: req.originalUrl,
			status: res.statusCode,
			responseTime: Date.now() - start,
			ip: req.ip,
			type: type,
			userAgent: req.headers["user-agent"]
		});
	} catch (err) {
		console.error("Request log error:", err.message);
	}
  });

  next();
};
