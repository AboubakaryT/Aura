export default async function getWeather(city: string): Promise<string>{
    const location = city?.trim();

    if (!location) {
        return 'Please tell me which city you want the weather for.';
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
    const response = await fetch(url);
    const data = await response.json();

    const result = data.results?.[0];

    if (!result) {
        return `I couldn't find weather for ${location}.`;
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,weather_code&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const temp = weatherData.current?.temperature_2m;
    const code = weatherData.current?.weather_code;

    if (temp === undefined || code === undefined) {
        return `I couldn't get the weather for ${result.name}.`;
    }

    return `The weather in ${result.name} is ${temp}°C. Weather code: ${code}.`;
}