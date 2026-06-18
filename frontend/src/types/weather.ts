export type WeatherResponse = {
  city: string;
  temperature: number;
  windSpeed: number;
  time: string;
};


export type WeatherAnalytics = {
  avgTemp: number;
  avgWind: number;
  count: number;
};