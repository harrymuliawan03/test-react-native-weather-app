// HomeScreen.tsx

import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import CurrentWeather from '../../components/CurrentWeather';
import Forecast from '../../components/ForeCast';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

const HomeScreen = () => {
  const [city, setCity] = useState('BANDUNG');
  const [cityController, setCityController] = useState('BANDUNG');
  const [inputError, setInputError] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSetCity = () => {
    if (cityController.trim() !== '') {
      setCity(cityController.toUpperCase());
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.navigateContainer}>
          <Button
            title="To My Favorite"
            onPress={() => navigation.navigate('Favorites')}
            color={'#ff8c00'}
          />
        </View>

        <Text>Current City: {city}</Text>
        <TextInput
          style={styles.input}
          value={cityController}
          onChange={e => {
            setInputError(false);
            setCityController(e.nativeEvent.text);
          }}
          placeholder="Enter a city"
        />
        {inputError && (
          <Text style={styles.errorText}>Please enter a city name</Text>
        )}
        <Button title="Set City" onPress={handleSetCity} />

        <CurrentWeather
          city={city}
          onError={() => {
            setCity('');
            setCityController('');
          }}
        />
        <Forecast city={city} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  navigateContainer: {
    marginBottom: 30,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
});

export default HomeScreen;
