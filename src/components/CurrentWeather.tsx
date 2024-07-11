/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {WeatherResponse} from '../models/weather';
import {fetchCurrentWeatherByCity} from '../services/WeatherService';
import {useLayout} from '../hooks/useLayout';

interface CurrentWeatherProps {
  city: string;
  onError?: () => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({city, onError}) => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const {favoriteCity, setFavoriteCity} = useLayout();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await fetchCurrentWeatherByCity(city);
        setWeatherData(data);
      } catch (error) {
        onError?.();
        setWeatherData(null);
      }
    };

    fetchWeather();
    favoriteCity.includes(city) ? setIsFavorite(true) : setIsFavorite(false);
  }, [city, favoriteCity]);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setFavoriteCity([...favoriteCity, city]);
    } else {
      setFavoriteCity(favoriteCity.filter(item => item !== city));
    }
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (!weatherData) {
    return (
      <View style={styles.containerLoading}>
        <Text style={styles.loadingText}>There is no weather data</Text>
      </View>
    );
  }

  return (
    weatherData && (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Current Weather in {weatherData.name}
          </Text>
          <TouchableOpacity
            onPress={handleFavoritePress}
            style={styles.favoriteButton}>
            <Animated.Text
              style={[
                styles.favoriteButtonText,
                {transform: [{scale: scaleAnim}]},
              ]}>
              {isFavorite ? '★' : '☆'}
            </Animated.Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
        <Text style={styles.humidity}>
          Humidity: {weatherData.main.humidity}%
        </Text>
        <View style={styles.descriptionContainer}>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
            }}
          />
          <Text style={styles.description}>
            {weatherData.weather[0].description}
          </Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f0f8ff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff8c00',
  },
  humidity: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  favoriteButton: {
    padding: 10,
    backgroundColor: '#ff8c00',
    borderRadius: 5,
    alignItems: 'center',
  },
  favoriteButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CurrentWeather;
