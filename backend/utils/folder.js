const fs = require("fs");
const path = require("path");

function getFoldersBySite(id, siteName) {
	const sitePath = path.join("D:/media", id, siteName);

	if (!fs.existsSync(sitePath)) {
		return [];
	}

	const folders = fs.readdirSync(sitePath, { withFileTypes: true })
	return folders.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);
}

function getFilesByFolder(id, siteName, folderName) {
	const folderPath = path.join("D:/media", id, siteName, folderName);

	if (!fs.existsSync(folderPath)) {
		return [];
	}

	const files = fs.readdirSync(folderPath, { withFileTypes: true })
	return files.filter(f => f.isFile())
		.map(f => f.name);
}


module.exports = {getFoldersBySite, getFilesByFolder};
