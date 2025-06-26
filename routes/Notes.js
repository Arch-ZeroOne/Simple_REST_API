const express = require("express");

const router = express.Router();
const Notes = require("../model/Notes");

router.get("/", async (req, res) => {
  try {
    const allNotes = await Notes.find();
    res.status(200).json(allNotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", getNotes, async (req, res) => {
  try {
    res.json(res.notes);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
router.post("/", async (req, res) => {
  const newNote = new Notes({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const save = await newNote.save();
    res.status(200).json({ save });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/:id", getNotes, async (req, res) => {
  try {
    const deleteNote = await Notes.deleteOne({ _id: res.notes.id });
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  res.send(id);
});

router.patch("/:id", getNotes, async (req, res) => {
  if (req.body.title) {
    res.notes.title = req.body.title;
  }
  if (req.body.content) {
    res.notes.content = req.body.content;
  }
  try {
    await res.notes.save();
    res.json({ message: "Note is successfully updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
async function getNotes(req, res, next) {
  let notes;
  try {
    //will be used to get the details from mongo db
    notes = await Notes.findById(req.params.id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  res.notes = notes;
  next();
}
module.exports = router;
