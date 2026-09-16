import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { GoogleGenAI, FunctionCallingConfigMode } from '@google/genai';
import 'dotenv/config';
import executeTool from './tools/executeTool';
import { getTime, getWeather, readFileTool } from './tools/definitions';

const rl = readline.createInterface({ input, output });
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const toolDeclarations = [
  {
    name: getTime.name,
    description: getTime.description,
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: getWeather.name,
    description: getWeather.description,
    parameters: {
      type: 'object',
      properties: {
        city: {
          type: 'string',
          description: 'The city to get the current weather for.',
        },
      },
      required: ['city'],
    },
  },
  {
    name: readFileTool.name,
    description: readFileTool.description,
    parameters: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          description: 'The path to the file to read.',
        },
      },
      required: ['file'],
    },
  },
];

const chat = ai.chats.create({
  model: 'gemini-3.5-flash-lite',
  config: {
    tools: [{ functionDeclarations: toolDeclarations as never }],
    toolConfig: {
      functionCallingConfig: {
        mode: FunctionCallingConfigMode.AUTO,
      },
    },
  },
});

while (true) {
  const prompt: string = await rl.question('Please type in a prompt. ');

  if (prompt == 'Bye' || prompt == 'bye' || prompt == 'Quit' || prompt == 'quit') {
    break;
  }

  const response = await chat.sendMessage({ message: prompt });

  if (!response.functionCalls || response.functionCalls.length === 0) {
    console.log('AURA: ' + response.text);
    continue;
  }

  for (const functionCall of response.functionCalls) {
    const toolArgs = (functionCall.args ?? {}) as Record<string, unknown>;
    const input = await executeTool(functionCall.name ?? '', functionCall.id ?? '', toolArgs);

    if (!input) {
      continue;
    }

    const followUp = await chat.sendMessage({
      message: [{
        functionResponse: {
          id: functionCall.id,
          name: functionCall.name,
          response: { output: input.result[0].text },
        },
      }],
    });

    console.log('AURA: ' + followUp.text);
  }
}

rl.close();