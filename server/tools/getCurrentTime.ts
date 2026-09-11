export default function getCurrentTime() : string{
    const now = new Date();
    //return a string of current time 
    return now.toLocaleTimeString();
}