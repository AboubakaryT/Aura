import { readFile } from "node:fs/promises";
//Transcribes our audio.
async function transcribeAudio(filePath : string) : Promise<string>{
    const data = await readFile(filePath);
    const base64Audio = data.toString('base64');
    return base64Audio;
}

const transcript = await transcribeAudio("recording.wav");
console.log(transcript.slice(0, 100));
