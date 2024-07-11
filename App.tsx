// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CityWeather from './src/screens/city_weather';
import {RootStackParamList} from './src/types/navigation';
import FavoritesScreen from './src/screens/favorites';
import HomeScreen from './src/screens/home';
import {AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {LayoutProvider} from './src/layout/layoutContext';

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

AppRegistry.registerComponent('TestReactNative', () => App);
function App() {
  return (
    <NavigationContainer>
      <LayoutProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CityWeather" component={CityWeather} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </LayoutProvider>
    </NavigationContainer>
  );
}

export default App;
