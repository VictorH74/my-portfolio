import { generateContent } from '@/lib/gemini-ai';

export async function POST(req: Request) {
    const formData = await req.formData();
    const promptText = String(formData.get('promptText') ?? '');
    const imgFile = formData.get('imgFile');

    const result = await generateContent(
        promptText,
        imgFile instanceof File ? imgFile : undefined,
    );

    return Response.json({resultText: result.text});
}
