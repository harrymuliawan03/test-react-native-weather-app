// components/Favorites.tsx

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useLayout} from '../hooks/useLayout';

const Favorites: React.FC<{}> = () => {
  const {favoriteCity} = useLayout();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cities</Text>
      {favoriteCity.map(city => (
        <Text key={city}>{city}</Text>
      ))}
      {/* <TextInput
        style={styles.input}
        value={newFavorite}
        onChangeText={setNewFavorite}
        placeholder="Enter a city"
      />
      <Button title="Add Favorite" onPress={handleAddFavorite} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Favorites;
