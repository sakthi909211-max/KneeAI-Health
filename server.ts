import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Lazy initialization of Gemini AI
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Gemini AI initialization note:', e);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'KneeAI Health API', time: new Date().toISOString() });
  });

  // AI Clinical Knee Assessment Endpoint
  app.post('/api/assess-knee', async (req, res) => {
    try {
      const {
        painLevel,
        painLocation,
        injuryType,
        duration,
        symptoms,
        flexionDifficulty,
        walkingCapacity,
        selectedLanguage = 'en',
      } = req.body;

      const ai = getAIClient();

      if (ai) {
        const prompt = `You are a clinical knee specialist and orthopedic physical therapist.
A patient has provided the following knee symptom telemetry:
- Pain Level (VAS 0-10): ${painLevel} / 10
- Pain Location: ${Array.isArray(painLocation) ? painLocation.join(', ') : painLocation}
- Injury Mechanism: ${injuryType}
- Duration: ${duration}
- Specific Joint Symptoms: ${Array.isArray(symptoms) ? symptoms.join(', ') : symptoms}
- Flexion Mobility: ${flexionDifficulty}
- Walking Capacity: ${walkingCapacity}
- Patient Preferred Language: ${selectedLanguage} (Please ensure summary, advice, and tips are natural and accurate in this language)

Return ONLY valid JSON matching this schema:
{
  "score": number (0-100 Joint Health Index, higher is better),
  "status": "Mild Strain" | "Moderate Inflammation" | "Significant Joint Stress" | "Clinical Evaluation Recommended",
  "summary": string (3-4 sentences of empathetic clinical assessment and primary recovery objective),
  "keyFindings": string[] (3 specific bullet observations),
  "recommendedPhase": 1 | 2 | 3 (1 = Acute Protection, 2 = Strengthening, 3 = Stability),
  "nutritionAdvice": string[] (3 evidence-based anti-inflammatory dietary actions),
  "movementPrecautions": string[] (3 safe movement rules and precautions),
  "suggestedExercises": string[] (3 specific named rehabilitation exercises),
  "urgencyLevel": "Low" | "Moderate" | "High"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const textResponse = response.text;
        if (textResponse) {
          const parsed = JSON.parse(textResponse);
          return res.json({ success: true, result: parsed });
        }
      }

      // Fallback deterministic clinical heuristic
      let calculatedScore = Math.max(25, 100 - painLevel * 7 - (symptoms?.length || 1) * 4);
      let status = 'Mild Strain';
      let urgency: 'Low' | 'Moderate' | 'High' = 'Low';
      let phase = 2;

      if (painLevel >= 7 || symptoms?.includes('Inability to fully straighten or bend (Locking)')) {
        status = 'Clinical Evaluation Recommended';
        urgency = 'High';
        phase = 1;
      } else if (painLevel >= 5 || symptoms?.includes('Visible Joint Swelling (Effusion / Fluid)')) {
        status = 'Moderate Inflammation';
        urgency = 'Moderate';
        phase = 1;
      } else if (painLevel >= 3) {
        status = 'Significant Joint Stress';
        urgency = 'Moderate';
        phase = 2;
      } else {
        status = 'Mild Strain';
        urgency = 'Low';
        phase = 3;
      }

      res.json({
        success: true,
        result: {
          score: calculatedScore,
          status,
          summary: `Clinical assessment indicates a ${status.toLowerCase()} pattern localized to the ${Array.isArray(painLocation) ? painLocation[0] : 'knee joint'}. Reducing synovial capsule irritation and re-establishing quadriceps isometric control is the immediate therapeutic milestone.`,
          keyFindings: [
            `Joint irritation presenting with ${duration} chronicity.`,
            painLevel >= 5 ? 'Elevated pain signals active tissue inflammation.' : 'Manageable load tolerance.',
            `Rehabilitation protocol: Phase ${phase} progression indicated.`,
          ],
          recommendedPhase: phase,
          nutritionAdvice: [
            'Consume Omega-3 rich fatty fish or algae oil (2g/day) to inhibit synovial inflammation.',
            'Supplement with standardized curcumin (500mg) and black pepper extract.',
            'Maintain optimal 2.5L daily hydration for cartilage shock-absorption.',
          ],
          movementPrecautions: [
            'Avoid loaded knee flexion beyond 90 degrees until effusion resolves.',
            'Wear structured, shock-absorbing cushioned footwear.',
            'Apply ice wrapped in a damp towel for 15-20 minutes post-activity.',
          ],
          suggestedExercises:
            phase === 1
              ? ['Isometric Quad Sets', 'Controlled Straight Leg Raises', 'Supine Heel Slides']
              : phase === 2
              ? ['Terminal Knee Extension (TKE)', 'Hydrotherapy Water Walking', 'Straight Leg Raises']
              : ['Wall Squat with Ball Squeeze', 'Proprioceptive Single-Leg Stance', 'Low-Gear Stationary Cycling'],
          urgencyLevel: urgency,
        },
      });
    } catch (error) {
      console.error('Knee Assessment Error:', error);
      res.status(500).json({ error: 'Assessment generation failed' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KneeAI Health server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
