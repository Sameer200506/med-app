const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!API_KEY) {
    console.warn("OpenRouter API key is missing");
}

export interface MedicineAnalysis {
    name: string;
    dosage: string;
    timing: string;
    notes?: string;
}

export async function analyzePrescription(text: string): Promise<MedicineAnalysis[]> {
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
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.origin, // Required by OpenRouter
                "X-Title": "Medical App", // Optional
            },
            body: JSON.stringify({
                "model": "openai/gpt-oss-120b:free", // User requested model
                "messages": [
                    { "role": "user", "content": prompt }
                ],
                "temperature": 0.1, // Low temperature for consistent JSON output
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("OpenRouter API Error:", response.status, errorData);
            throw new Error(`OpenRouter API failed with status ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (!content) {
            throw new Error("No content received from AI");
        }

        // Clean up if there are markdown code blocks (even though we asked not to, models often do)
        const cleanedText = content.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("AI Analysis Error:", error);
        throw new Error("Failed to analyze prescription");
    }
}
