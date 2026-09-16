import getCurrentTime from './getCurrentTime';
import getWeather from './getWeather';
import readFile from './readFile';
import { Input, Result } from './definitions';

export default async function executeTool(name: string, call_id: string, args: Record<string, unknown> = {}): Promise<Input | null>{
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

    if (name === 'getWeather') {
      const city = typeof args.city === 'string' ? args.city : '';
      const result = await getWeather(city);

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

    if (name === 'readFile') {
      const file = typeof args.file === 'string' ? args.file : '';
      const result = await readFile(file);

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
