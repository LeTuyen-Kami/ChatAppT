import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import React from 'react';
import {height, width} from 'utils/utils';

export const useAnimated = () => {
  const progress1 = useSharedValue(0);
  const progress2 = useSharedValue(0);

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: progress1.value * width}],
      zIndex: progress1.value !== 0 ? 10 : 0,
      position: 'absolute',
      width: width,
      height: height,
    };
  }, []);

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -progress2.value * width}],
      zIndex: 1,
      position: 'absolute',
      width: width,
      height: height,
      left: width,
    };
  }, []);

  return {
    progress1,
    progress2,
    animatedStyle1,
    animatedStyle2,
  };
};
