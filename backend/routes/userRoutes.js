const express = require("express");
const axios = require("axios");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Call Google Gemini API for food recommendations
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Give me a food recommendation based on these preferences: ${user.preferences.join(", ")}.`,
              },
            ],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    const recommendation = geminiResponse.data.candidates[0].content.parts[0].text;
    res.json({ recommendation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating recommendation" });
  }
});

module.exports = router;