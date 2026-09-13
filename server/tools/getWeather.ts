export default async function getWeather(city: string){
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    const response = await fetch(url)
    const data = await response.json();
    
    console.log(data)
}