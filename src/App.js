import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet, Text, View, Platform, TextInput, KeyboardAvoidingView,
  ImageBackground, ActivityIndicator,
} from 'react-native';
import { registerRootComponent } from 'expo'; // import it explicitly
import { getWeather, getImageBackgroundSrc } from './helpers/weatherHelper';
import SearchInput from './components/SearchInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white'
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,

  }
});


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: 'New York',
      weather: '',
      temperature: '',
      imageBackground: '',
      loading: true,
      error: false

    }
  }
  async componentDidMount() {
    await this.onSubmit(`London`)
  }

  onSubmit = async (text) => {
    let data = await getWeather(text);
    if (data) {
      this.setState({
        location: text,
        weather: data.weatherStateName,
        temperature: Number((data.temperature).toFixed(1)),
        imageBackground: getImageBackgroundSrc(data.weatherStateAbbr),
        error: false,
        loading: false
      })

    } else {
      this.setState({
        error: true,
        loading: false,
        location: text,
        weather: `Could not load weather`,
        temperature: `0`,
        imageBackground: getImageBackgroundSrc('c')
      })
    }
  }

  render() {
    let { location, weather, temperature, imageBackground, loading, error } = this.state;
    if (!imageBackground) {
      imageBackground = getImageBackgroundSrc('c')
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {loading ?
          <ActivityIndicator color='black' size='large' />
          :
          <ImageBackground
            source={imageBackground}
            style={styles.imageContainer}
            imageStyle={styles.image}
          >
            <View style={styles.detailsContainer}>
              <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
              <Text style={[styles.smallText, styles.textStyle]}>{weather ? weather : ''}</Text>
              <Text style={[styles.largeText, styles.textStyle]}>{temperature}°</Text>
              <SearchInput
                searchPlaceHoder={"Search any city"}
                onSubmit={this.onSubmit}
              />
            </View>
          </ImageBackground>
        }
      </KeyboardAvoidingView>
    );
  }
}

export default registerRootComponent(App); // this is how I register the App component
