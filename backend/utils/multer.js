const multer = require("multer");
const fs = require("fs");
const path = require("path");
const typeMap = require("../middleware/fileType");

function mediaUploader() {
	return multer({
		storage: multer.diskStorage({
			destination(req, file, cb) {
				const { name, site, type } = req.params;
				const folderPath = path.join("D:/media", name, site, type);

				if (!fs.existsSync(folderPath)) {
					fs.mkdirSync(folderPath, { recursive: true });
				}

				cb(null, folderPath);
			},
			filename(req, file, cb) {
				cb(null, Date.now() + "-" + file.originalname);
			}
		}),
		fileFilter(req, file, cb) {
			const type = req.params.type;
			const mime = file.mimetype;
			console.log(mime);
			if (!typeMap[type]?.includes(file.mimetype)) {
				return cb(new Error("File type does not match folder"), false);
			}

			cb(null, true);
		}
	});
}

module.exports = mediaUploader;
