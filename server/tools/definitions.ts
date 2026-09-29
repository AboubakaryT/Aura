//Content
export interface Content{
  type : string,
  text : string
}
//Message
export interface Message{
  type : string,
  content :Content[] 
}

//TOOLS -- INTERFACE
export interface FunctionTool{
  type : 'function',
  name : string,
  description : string,
}

//FUNCTION RESULT INTERFACE

export interface Result{
  type: string,
  text: string,
}

export interface Input{
   type: 'function_result',
    name: string,
    call_id: string,
    result: Result[]
}

export interface InteractionRequest{
    model : string,
    input: Input[],
    tools: FunctionTool[]
}

//TOOLS------------------------------

export const getTime: FunctionTool = {
  type: 'function',
  name : 'getCurrentTime',
  description : 'Get the current time in the clients local area.'
}

export const getWeather: FunctionTool = {
  type: 'function',
  name : 'getWeather',
  description : 'Get the current weather for a city.'
}

export const readFileTool: FunctionTool = {
  type: 'function',
  name : 'readFile',
  description : 'Read the contents of a file from the project.'
}

