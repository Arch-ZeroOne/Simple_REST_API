require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//*detects changes in the database
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL);

db.on("error", (err) => console.error("Error While connecting", err.message));
db.on("open", () => console.log("Connected to Database"));

app.use(express.json());
const notesRouter = require("./routes/Notes");
app.use("/notes", notesRouter);

app.listen(3000, () => {
  console.log("Server Started");
});
