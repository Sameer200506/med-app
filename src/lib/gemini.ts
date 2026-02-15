import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key is missing");
}

const genAI = new GoogleGenerativeAI(API_KEY || "dummy-key");

export interface MedicineAnalysis {
    name: string;
    dosage: string;
    timing: string;
    notes?: string;
}

export async function analyzePrescription(text: string): Promise<MedicineAnalysis[]> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Analyze the following prescription text and extract the list of medicines. 
    For each medicine, identify:
    - Name
    - Dosage (e.g., 500mg, 1 tablet)
    - Timing (e.g., morning, night, after food, twice a day)
    - Any special notes

    Prescription Text:
    "${text}"

    Return the result strictly as a JSON array of objects with keys: "name", "dosage", "timing", "notes". 
    Do not include markdown formatting or backticks. Just the raw JSON string.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up if there are markdown code blocks
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        throw new Error("Failed to analyze prescription");
    }
}
