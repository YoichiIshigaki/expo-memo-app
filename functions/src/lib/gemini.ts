import geminiConfig from '@sub-module-config/gemini';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const { GEMINI_API_KEY } = geminiConfig;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const samplePrompt = 'こんにちわ。あなたは誰？';

export const run = async (prompt: string = samplePrompt): Promise<string> => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: 'gemini-pro',
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
  });

  const result = await model.generateContentStream(prompt);
  const texts: string[] = [];

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    texts.push(chunkText);
  }
  const entire = texts.join('');

  return entire;
};

(async () => {
  if (require.main === module) {
    // 標準入力
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    console.log('質問を入力する。');

    const inputLines: string[] = [];
    const reader = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    reader.on('line', (line: string) => {
      inputLines.push(line);
    });

    reader.on('close', async () => {
      const question = inputLines.join('\n');
      console.log(' ** 質問内容 ** \n', question);
      const answer = await run(question);
      console.log({ answer });
    });
  }
})();
