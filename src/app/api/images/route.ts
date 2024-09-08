import sharp from 'sharp';

export async function POST(req: Request) {
    // const { imageBuffer } = await req.json()
    const readableStream = req.body;

    if (!readableStream) {
        return new Response(`not image file`, { status: 400 });
    }

    const reader = readableStream.getReader();
    const chunks = [];
    let read;

    while (!(read = await reader.read()).done) {
        chunks.push(read.value);
    }
    const imageBuffer = Buffer.concat(chunks);

    const convertedImage = await sharp(imageBuffer)
        .resize(800, 450) // 16:9
        .webp()
        .toBuffer();

    return new Response(convertedImage, { status: 200 });
}
