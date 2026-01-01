import express from "express";
import bodyParser from "body-parser";
import { chat } from "./ollama.js";

const app = express();
app.use(bodyParser.json());

app.post("/brain/chat", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "text required" });
    }

    const reply = await chat(text);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "brain failed" });
  }
});

app.listen(3000, () => {
  console.log("🧠 Node brain running on http://localhost:3000");
});
