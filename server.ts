import express from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const upload = multer();

// 1. Fixed CORS - explicit for your local development
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// 2. CSP Headers - only needed if you're hitting the API directly from a browser tab
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:5000 http://localhost:5173;");
  next();
});

// Use the SDK from your dependencies
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.get('/', (req, res) => {
  res.send("Server is alive. Send POST requests to /api/predict");
});

app.post('/api/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // FIX: Using 'gemini-1.5-flash' (2.5 doesn't exist yet)
    // ADDED: generationConfig forces the output to be valid JSON
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Identify the cattle breed from this list: 
    "Gir Cow", "Sahiwal Cow", "Red Sindhi Cow", "Tharparkar Cow", "Ongole Cow", 
    "Murrah Buffalo", "Jaffarabadi Buffalo", "Surti Buffalo", "Mehsana Buffalo". 
    
    Return a JSON object: 
    {
      "breed": "Name", 
      "confidence": 0.95, 
      "is_cattle_or_buffalo": true
    }`;

    const imageParts = [{
      inlineData: { 
        data: req.file.buffer.toString("base64"), 
        mimeType: req.file.mimetype 
      }
    }];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    // With responseMimeType set, 'text' is guaranteed to be a JSON string
    res.json(JSON.parse(text));

  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Analysis failed: " + error.message });
  }
});

app.listen(5000, () => console.log('🚀 API listening on port 5000'));