import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { GoogleGenAI, Type} from "@google/genai";
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

//GEMINI--------------------
interface Thought{
  signature : string,
  type : string
}
const Step : typeof Step;
//_________
const history : (Message | Thought | Step)[] = [];
//------------------------------
//Array of Messages

while(true){
const prompt : string = await rl.question('Please type in a prompt. ');
if (prompt == "Bye" || prompt == "bye" || prompt == "Quit" || prompt == "quit"){
  break;
}

const con : Content = {
  type:"text",
  text: prompt
}

let message : Message = {
  type:"user_input",
  content: [con]
}

history.push(message);

const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash-lite",
  input: prompt, 
  store : false
});

interaction.steps.forEach((step)=> history.push(step))



console.log(interaction.output_text);
//Debugging
/*
console.log(interaction.steps);
let check = interaction.steps[1];
if(check.type === "model_output")
console.log(check.content)
*/
}
 rl.close();

