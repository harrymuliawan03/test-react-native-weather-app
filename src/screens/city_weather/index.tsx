import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CityWeatherProps {
  route: {params: {weatherData: any}};
}

const CityWeather = ({route}: CityWeatherProps) => {
  const {weatherData} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{weatherData.name}</Text>
      <Text style={styles.weatherDescription}>
        {weatherData.weather[0].description}
      </Text>
      <Text style={styles.temperature}>{`${weatherData.main.temp} °C`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 32,
  },
});

export default CityWeather;
