import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  modifier: { // modify the width from the design sketch to the device width
    width: (input) => {return (width/1125) * input},
    height: (input) => {return (height/2000) * input}
  },
  isSmallDevice: width < 375,
};
