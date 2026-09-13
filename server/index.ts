import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import executeTool from './tools/executeTool';
import { Content, Message, InteractionRequest, getTime } from './tools/definitions';
//For reading from terminal.
const rl = readline.createInterface({ input, output });
//Ai Object
const ai = new GoogleGenAI({
 apiKey : process.env.GEMINI_API_KEY
});

//Array of Messages
const history: any[] = [];

while (true) {
  const prompt: string = await rl.question('Please type in a prompt. ');

  if (prompt == "Bye" || prompt == "bye" || prompt == "Quit" || prompt == "quit") {
    break;
  }

  const con: Content = {
    type: "text",
    text: prompt
  };

  const message: Message = {
    type: "user_input",
    content: [con]
  };

  history.push(message);

  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: history,
    store: false,
    tools: [getTime],
  });
  
  //Push current convo to history so that gemini has context
  interaction.steps.forEach((step) => history.push(step));
    //Detect the requested tool. 
    const fcStep = interaction.steps.find(s => s.type === 'function_call');

    if(fcStep && fcStep.name === 'getCurrentTime'){
      const input = executeTool(fcStep.name, fcStep.id);

      if(input){
        const interaction : InteractionRequest = {
          model: "gemini-3.5-flash-lite",
          input: [input],
          tools: [getTime]
        }
      }
    }
    
  else{
  console.log("AURA: " + interaction.output_text);
  }
 }
 rl.close();