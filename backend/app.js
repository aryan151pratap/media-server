require("dotenv").config(); 
const express = require("express");
const upload = require("./routes/api");
const load = require("./routes/load");
const saveApi = require("./routes/userData");
const media = require("./routes/media");
const google = require("./middleware/google");
const log = require("./routes/log");

const connectDB = require("./db");
const cors = require("cors");
const requesLogger = require("./middleware/requesLogger");


const app = express();
app.use(cors({
	origin: "*",
	credentials: true
}));

connectDB();
app.set("trust proxy", true);
app.use(express.json());
app.use(requesLogger);
app.get("/", (req, res) => {
	res.send("backend");
})
app.use("/uploads", express.static("D:/media"));

app.use("/load", load);
app.use("/api", upload);
app.use("/user", saveApi);
app.use("/google", google);
app.use("/media", media);
app.use("/log", log);


app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
