import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import DeliveryScreen from '../screens/DeliveryScreen';

const customAnimationFunc = () => ({
  screenInterpolator: sceneProps => {
    return StackViewStyleInterpolator.forHorizontal(sceneProps);
  },
});

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    transitionConfig: customAnimationFunc,
  },
});

export default createStackNavigator(
  {
    Delivery: DeliveryScreen,
  },
  config
);