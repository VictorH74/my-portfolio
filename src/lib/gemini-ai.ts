import { GoogleGenerativeAI } from '@google/generative-ai';

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY ??
        (() => {
            throw new Error('Undefined env variable: GEMINI_API_KEY');
        })()
);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Generates a text stream from a given prompt using the Gemini model.
 *
 * Usage Example:
 * --------------
 * @example
 *  const result = await generateTextWithPrompt('Write a story about a magic backpack.');
 *
 *  // Process each chunk of the result stream asynchronously
 *  for await (const chunk of result.stream) {
 *      const chunkText = await chunk.text(); // Convert the chunk to text
 *
 *      // Do something with 'chunkText'
 *      console.log(chunkText);
 *  }
 *
 * @returns {Promise<GenerateContentStreamResult>} - Returns a readable stream of generated content.
 */
export const generateContentStream = async (promptText: string) => {
    return await model.generateContentStream(promptText);
};
