import * as readline from 'node:readline/promises';
import getCurrentTime from './tools/getCurrentTime';
import { stdin as input, stdout as output } from 'node:process';
import { GoogleGenAI, Tool,}  from "@google/genai";
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

const history: any[] = [];

//TOOLS -- INTERFACE
interface FunctionTool{
  type : 'function',
  name : string,
  description : string,
}
//FUNCTION RESULT INTERFACE

interface Result{
  type: string,
  text: string,
}

interface Input{
   type: 'function_result',
    name: string,
    call_id: string,
    result: Result[]
}

interface InteractionRequest{
    model : string,
    input: Input[],
    tools: FunctionTool[]
}
//TOOLS------------------------------

const getTime: FunctionTool = {
  type: 'function',
  name : 'getCurrentTime',
  description : 'Get the current time in the clients local area.'

}
//Array of Messages


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

    //Detect the requested tool. 
    const fcStep = interaction.steps.find(s => s.type === 'function_call');
 
    if(fcStep && fcStep.name === 'getCurrentTime'){
      const result = getCurrentTime();
      console.log(`The current time is: ${result}`);
      const interRes : Result = {
          type: 'text',
          text: result,
      }
      
      const input : Input = {
        type: 'function_result',
        name: fcStep.name,
        call_id: fcStep.id,
        result: [interRes],
      }

      const interaction : InteractionRequest = {
          model: "gemini-3.5-flash-lite",
          input: [input],
          tools: [getTime]

      }
    }
  
  interaction.steps.forEach((step) => history.push(step));  

  console.log("AURA: " + interaction.output_text);
 }
 rl.close();