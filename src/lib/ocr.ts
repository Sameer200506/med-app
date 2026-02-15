const API_KEY = import.meta.env.VITE_OCR_SPACE_API_KEY;

if (!API_KEY) {
    console.warn("OCR.space API key is missing");
}

interface OCRSpaceResponse {
    ParsedResults: Array<{
        ParsedText: string;
        ErrorMessage?: string;
        ErrorDetails?: string;
    }>;
    IsErroredOnProcessing: boolean;
    ErrorMessage?: Array<string>;
}

export async function extractTextFromImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('apikey', API_KEY || 'helloworld'); // 'helloworld' is a free default key, but use the provided one
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');

    try {
        const response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: OCRSpaceResponse = await response.json();

        if (data.IsErroredOnProcessing) {
            throw new Error(data.ErrorMessage?.join(', ') || 'OCR processing failed');
        }

        if (data.ParsedResults && data.ParsedResults.length > 0) {
            return data.ParsedResults.map(result => result.ParsedText).join('\n');
        }

        return '';
    } catch (error) {
        console.error("OCR Error:", error);
        throw error;
    }
}
