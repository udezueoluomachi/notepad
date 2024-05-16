/**
 * @format
 */

import {AppRegistry} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import App from './App';
import {name as appName} from './app.json';
import Colors from './color.config';

  
changeNavigationBarColor(Colors['white-1'], true, true);

AppRegistry.registerComponent(appName, () => App);
