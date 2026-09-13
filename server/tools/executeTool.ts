import getCurrentTime from './getCurrentTime';
import { Input, Result } from './definitions';

export default function executeTool(name: string, call_id: string): Input | null{
    if (name === 'getCurrentTime') {
      const result = getCurrentTime();
      console.log(`The current time is: ${result}`);
      const interRes : Result = {
          type: 'text',
          text: result,
      }
      
      const input : Input = {
        type: 'function_result',
        name,
        call_id,
        result: [interRes],
      }

      return input;
    }

    return null;
}
