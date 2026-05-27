import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // AI Generation API
  app.post("/api/generate-greeting", async (req, res) => {
    try {
      const { name, age, hobbies, style } = req.body;

      const prompt = `
        You are a creative birthday card greeting assistant.
        Task: Write a short, heart-warming, and personalized birthday greeting in Chinese (Simplified).
        Recipient Name: ${name}
        Age: ${age}
        Hobbies/Interests: ${hobbies}
        Style: ${style} (e.g., Vibrant, Minimalist)

        Requirements:
        1. Keep it under 50 words.
        2. Specifically mention one of their hobbies in a clever way.
        3. Use a tone that matches the ${style} style.
        4. Output ONLY the greeting text, no quotes or meta-talk.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const text = response.text || "祝你生日快乐，万事如意！";

      res.json({ greeting: text.trim() });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate greeting" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
