import axios from 'axios';
import {ForecastItem} from '../models/foreCastItem';
import {ForecastResponse} from '../models/foreCastResponse';
import {WeatherResponse} from '../models/weather';

const API_KEY = '971936c27191b1fddae3f5ab1880c9f8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const FORECAST_ENDPOINT = '/forecast';
const CURRENT_WEATHER_ENDPOINT = '/weather';

export const fetchCurrentWeatherByCity = async (
  city: string,
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(
      `${BASE_URL}${CURRENT_WEATHER_ENDPOINT}?q=${city}&appid=${API_KEY}&units=metric`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchForecastByCity = async (
  city: string,
): Promise<ForecastItem[]> => {
  try {
    const response = await axios.get<ForecastResponse>(
      `${BASE_URL}${FORECAST_ENDPOINT}?q=${city}&appid=${API_KEY}&units=metric`,
    );
    return response.data.list;
  } catch (error) {
    throw error;
  }
};
