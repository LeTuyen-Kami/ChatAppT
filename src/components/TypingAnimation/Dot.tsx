import React from 'react';
import {Box} from 'native-base';
import Animated, {
  withRepeat,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';

const AnimatedDot = Animated.createAnimatedComponent(Box);

const Dot: React.FC<{index: number}> = ({index}) => {
  const value = useSharedValue(0);

  React.useEffect(() => {
    setTimeout(() => {
      value.value = withRepeat(
        withTiming(10, {
          duration: 600,
        }),
        -1,
        true,
      );
    }, 100 * index);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(value.value, [0, 5, 10], [-3, 0, 3]),
        },
      ],
    };
  });
  return (
    <AnimatedDot
      style={animatedStyle}
      width={2}
      height={2}
      borderRadius={5}
      marginX={'1px'}
      backgroundColor={'rgba(0,0,0,0.5)'}
    />
  );
};

export default Dot;
