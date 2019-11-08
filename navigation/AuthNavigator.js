import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
});

export default createStackNavigator(
  {
    Login: LoginScreen,
  },
  config
);