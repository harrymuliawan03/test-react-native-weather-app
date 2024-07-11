import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useLayout} from '../../hooks/useLayout';
import CurrentWeather from '../../components/CurrentWeather';

const Favorites: React.FC<{}> = () => {
  const {favoriteCity} = useLayout();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Favorite Cities</Text>
      {favoriteCity.length === 0 ? (
        <Text style={styles.noFavoritesText}>
          No favorite cities added yet.
        </Text>
      ) : (
        favoriteCity.map((city, index) => (
          <View key={city} style={styles.cityContainer}>
            <Text style={styles.titleCity}>
              {index + 1} {city}
            </Text>
            <CurrentWeather city={city} />
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  titleCity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  noFavoritesText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  cityContainer: {
    marginBottom: 20,
  },
});

export default Favorites;
