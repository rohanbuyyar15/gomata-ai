# Indian Cattle & Buffalo Breed Recognition System

An AI-powered platform to identify Indian cattle and buffalo breeds from images with detailed productivity and market insights.

## Features

- **AI Breed Detection**: Uses Gemini 3 Flash to identify breeds with high accuracy.
- **Detailed Insights**: Provides milk yield, market value, daily income, and maintenance tips.
- **Report Generation**: Download prediction results as a professional PDF report.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **History Tracking**: View recent predictions in the session.

## Tech Stack

- **Frontend**: React 19, TailwindCSS 4, Motion, Lucide Icons.
- **Backend**: Node.js Express, Multer.
- **AI**: Gemini API (@google/genai).

## Getting Started

### Prerequisites

- Node.js 18+
- Gemini API Key

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file based on `.env.example` and add your `GEMINI_API_KEY`.

### Running Locally

To start the full-stack development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## How to Train the Model (Conceptual)

This application currently uses the **Gemini API** for zero-shot image classification, which is highly effective for general breed recognition without a custom dataset.

To build a custom model:
1. **Dataset**: Collect 500+ images per breed (Gir, Sahiwal, Murrah, etc.).
2. **Preprocessing**: Resize to 224x224, normalize, and apply data augmentation.
3. **Transfer Learning**: Use MobileNetV2 or EfficientNetB0 as a base.
4. **Training**: Use TensorFlow or PyTorch to fine-tune the top layers.
5. **Deployment**: Export to TFLite or ONNX and serve via a Python FastAPI backend.

## Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Deploy to Cloud Run / Render**:
   - Ensure `NODE_ENV=production` is set.
   - The server will serve the static files from the `dist` directory.
