import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
//For reading from terminal.
const rl = readline.createInterface({ input, output });
//Ai Object
const ai = new GoogleGenAI({
 apiKey : process.env.GEMINI_API_KEY
});
//INTERFACES---------------
//Content
interface Content{
  type : string,
  text : string
}
//Message
interface Message{
  type : string,
  content :Content[] 
}
//Array of Messages
const history : Message[] = []

//------------------------------

while(true){
const prompt : string = await rl.question('Please type in a prompt. ');
if (prompt == "Bye" || prompt == "bye" || prompt == "Quit" || prompt == "quit"){
  break;
}

let con : Content = {
  type:"text",
  text: prompt
}

let message : Message = {
  type:"user_input",
  content: [con]
}

history.push(message);

const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: prompt, 
  store : false
});

console.log(interaction.output_text);
console.log(interaction.steps)
}
 rl.close();

