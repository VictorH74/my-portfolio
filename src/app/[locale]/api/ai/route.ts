import { generateContentStream } from '@/lib/gemini-ai';

export async function POST(req: Request) {
    const { promptText } = await req.json();

    const result = await generateContentStream(promptText);

    const readableStream = new ReadableStream({
        async pull(controller) {
            const { value, done } = await result.stream.next();

            if (done) {
                controller.close();
            } else {
                controller.enqueue(
                    new TextEncoder().encode(
                        value.candidates?.[0].content.parts[0].text ?? ''
                    )
                );
            }
        },
    });

    return new Response(readableStream);
}
