// Creating express server:
const express = require("express");
const app = express();
// Connecting database:
const dotenv = require("dotenv");
// Mongoose:
const mongoose = require("mongoose");
// From routes:
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

const multer = require("multer");
const path = require("path");

// Port for heroku:
const PORT=process.env.PORT || 5000;

dotenv.config();
// To send a JSON object
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// Connection through mongoose: from documentation
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// for uploading images:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// Step for heroku:
if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});
