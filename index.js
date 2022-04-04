import {AppRegistry} from 'react-native';

import appJson from './app.json';
import App from './src/App';

import 'global-methods';

AppRegistry.registerComponent(appJson.name, () => App);
