import { createWriteStream } from 'fs';
import Microphone from 'node-microphone';
//Standard JS import, NOT TS.
const mic = new Microphone({
     rate: '16000',
    channels: '1',
    fileType: 'raw',
})
console.log("1. File started");
const fileStream = createWriteStream("recording.raw");
const micStream = mic.startRecording();

console.log("2. Microphone started:", micStream);
if(micStream){
    micStream.pipe(fileStream);
    console.log("3. Stream connected");
}

setTimeout(() => {
	mic.stopRecording();
}, 30000);