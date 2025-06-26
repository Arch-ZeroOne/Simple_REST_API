const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const notesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = model("Notes", notesSchema);
