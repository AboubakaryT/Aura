import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const rl = readline.createInterface({ input, output });

const ai = new GoogleGenAI({
 apiKey : process.env.GEMINI_API_KEY
});


while(true){
const prompt : string = await rl.question('Please type in a prompt. ');
if (prompt == "Bye" || prompt == "bye" || prompt == "Quit" || prompt == "quit"){
  break;
}
  
const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: prompt, 
});
console.log(interaction.output_text);

}
 rl.close();

