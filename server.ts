import express from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';

// --- THE FIX FOR __dirname IN ES MODULES ---
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// -------------------------------------------

dotenv.config();

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post('/api/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Identify the cattle breed which you see in the Image . 
    Return JSON: {"breed": "Name", "confidence": 0.95, "is_cattle_or_buffalo": true}`;

    const imageParts = [{
      inlineData: { data: req.file.buffer.toString("base64"), mimeType: req.file.mimetype }
    }];

    const result = await model.generateContent([prompt, ...imageParts]);
    res.json(JSON.parse(result.response.text()));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Serve the React UI
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Live on port ${PORT}`));
