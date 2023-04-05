import React from 'react';

import {View} from 'native-base';
import Animated, {
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Colors} from 'screens/Profile/ContainerProfile';
import {Dimensions} from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);
const screen = Dimensions.get('window');

const AnimatedItem: React.FC<{
  index: number;
  progress: Animated.SharedValue<number>;
}> = ({index, progress}) => {
  // const iProgress = useSharedValue(0);
  //
  // useAnimatedReaction(
  //   () => progress.value,
  //   value => {
  //     iProgress.value = value;
  //   },
  // );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        progress.value,
        [0, 1],
        [screen.width - 16, screen.width / 2 - 16],
      ),
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, screen.width / 2],
          ),
        },
      ],
    };
  });

  return (
    <AnimatedView
      key={index}
      alignItems={'center'}
      justifyContent={'center'}
      style={animatedStyle}
      bg={Colors[index]}
      m={2}
      h={screen.height - 200}
      position={'absolute'}
    />
  );
};

export default AnimatedItem;
