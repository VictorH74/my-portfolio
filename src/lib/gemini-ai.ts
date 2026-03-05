import { ContentListUnion, GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey:
        process.env.GEMINI_API_KEY ??
        (() => {
            throw new Error('Undefined env variable: GEMINI_API_KEY');
        })(),
});

export const generateContentStream = async (promptText: string) => {
    return await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: promptText,
    });
};

export const generateContent = async (promptText: string, imgFile?: File) => {
    const contents: ContentListUnion = [{ text: promptText }];

    if (imgFile) {
        const base64Data = await imgFile
            .arrayBuffer()
            .then((buffer) => Buffer.from(buffer).toString('base64'));

        contents.push({
            inlineData: {
                mimeType: imgFile.type,
                data: base64Data,
            },
        });
    }

    return await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
    });
};

// export const generateContentStream = async (promptText: string) => {
//     return await model.generateContentStream(promptText);
// };
