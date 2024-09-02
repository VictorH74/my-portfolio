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

    // const mimeType = 'image/webp'; // Replace with the correct MIME type
    // const imgSrc = `data:${mimeType};base64,${convertedImage.toString('base64')}`;

    // return new Response(`<img src="${imgSrc}" />`, { status: 200 })
    return new Response(convertedImage, { status: 200 });
}
