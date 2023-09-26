const express = require("express");
const router = express.Router();
const Idea = require("../config/models/idea");
// GET ALL IDEAS
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.status(200).json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, error: "It is not you, it is us" });
  }
});
// GET SINGE IDEA
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const idea = await Idea.findById(id);
    if (!idea) {
      return res.status(404).json({
        sucess: false,
        resource: "Idea not found",
      });
    }
    res.status(200).json({ success: true, idea });
  } catch (error) {
    res.status(500).json({ success: false, error: "Sometghing went wrong" });
  }
});
//CREATE AN IDEA
router.post("/", async (req, res) => {
  try {
    const newIdea = new Idea({
      text: req.body.text,
      tag: req.body.tag,
      username: req.body.username,
    });
    const savedIdea = await newIdea.save();
    console.log("New Idea", savedIdea);
    res.status(201).json({ success: true, data: savedIdea });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
//UPDATE AN IDEA
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userID = await Idea.findById(id);
    if (userID.username === req.body.username) {
      const idea = await Idea.findByIdAndUpdate(
        id,
        {
          $set: {
            text: req.body.text,
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, state: "Updated", data: idea });
    }
    return res.status(403).json({
      success: false,
      data: "You are not authorised to update that idea",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      state: "No change",
      error: "Something went wrong",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Idea.findById(id);
    if (deleted.username === req.body.username) {
      await Idea.findByIdAndDelete(id);
      return res.status(200).json({ success: true, sourceDeleted: deleted });
    } else {
      return res
        .status(403)
        .json({
          success: false,
          data: "You are not authorised to delete that particular idea",
        });
    }

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Item can not be found check ID" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

module.exports = router;
