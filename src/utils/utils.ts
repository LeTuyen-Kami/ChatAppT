import {Dimensions} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const {width: widthWindow, height: heightWindow} = Dimensions.get('window');

export const topInsets = initialWindowMetrics?.insets?.top || 0;
export const bottomInsets = initialWindowMetrics?.insets?.bottom || 0;

export const width = widthWindow;

export const height =
  (initialWindowMetrics?.frame?.height || heightWindow) -
  topInsets -
  bottomInsets;
