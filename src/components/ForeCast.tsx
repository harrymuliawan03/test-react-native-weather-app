// components/Forecast.tsx

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ForecastItem} from '../models/foreCastItem';
import {fetchForecastByCity} from '../services/WeatherService';
import {filterDuplicates} from '../utils/filterDuplicates';

interface ForecastProps {
  city: string;
}

const Forecast: React.FC<ForecastProps> = ({city}) => {
  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await fetchForecastByCity(city);
        console.log(data.length);
        const uniqueForecast = filterDuplicates(data);
        console.log(uniqueForecast.length);
        setForecastData(uniqueForecast);
      } catch (error) {
        setForecastData([]);
      }
    };
    if (city !== '') {
      fetchForecast();
    } else {
      setForecastData([]);
    }
  }, [city]);

  const renderForecastItem = ({
    item,
    index,
  }: {
    item: ForecastItem;
    index: number;
  }) => {
    return (
      <View style={styles.forecastItem} key={index}>
        <Text style={styles.date}>
          {new Date(item.dt * 1000).toLocaleDateString()}
        </Text>
        <Text style={styles.temp}>Temperature: {item.main.temp}°C</Text>
        <Text style={styles.description}>
          {item.weather[0].description.charAt(0).toUpperCase() +
            item.weather[0].description.slice(1)}
        </Text>
      </View>
    );
  };

  return forecastData.length === 0 ? null : (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>5-Day Forecast for {city}</Text>
      {forecastData.map((item, index) => renderForecastItem({item, index}))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  forecastItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  temp: {
    fontSize: 16,
    color: '#ff8c00',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default Forecast;
