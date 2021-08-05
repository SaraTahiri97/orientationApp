
import React from 'react';


import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

import { Provider } from 'react-redux';
import store from './src/Store/store';
import * as Font from 'expo-font';
import { Page_Title } from './src/components/elements'

import { AuthNavigator } from './src/navigation/';


// import all used images
const images = [
  require('./src/components/images/NotFoundImage.png'),
  require('./src/components/images/pictureView.png'),

];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
  }

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app
    // To Do , Fonts

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

  loadFontsAsync = async () => {
    await Font.loadAsync({
      'Product Sans': require('./assets/fonts/ProductRegular.ttf'),
      'Product Sans bold': require('./assets/fonts/ProductBold.ttf'),
    })
    this.setState({ fontLoaded: true })
  }
  componentDidMount() {
    this.loadFontsAsync()
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }
    if (this.state.fontLoaded) {
      return (

         <Provider store={store}>
           <AuthNavigator />
         </Provider>
         );
    }
    else {
      return null;
    }
  }
}
