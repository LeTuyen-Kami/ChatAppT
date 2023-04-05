import React from 'react';

import {Text, View} from 'react-native';
import {Box} from 'native-base';
import Animated, {
  withRepeat,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedDot = Animated.createAnimatedComponent(Box);

const TypingAnimation: React.FC<{}> = () => {
  const value = useSharedValue(0);

  //center dot
  React.useEffect(() => {
    value.value = withRepeat(withSpring(10), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: value.value,
        },
      ],
    };
  });

  return (
    <Box flex={1}>
      <Dot animatedStyle={animatedStyle} />
    </Box>
  );
};

const Dot = ({animatedStyle}: {animatedStyle: any}) => {
  return (
    <AnimatedDot
      style={animatedStyle}
      width={2}
      height={2}
      borderRadius={5}
      backgroundColor={'black'}
    />
  );
};

export default TypingAnimation;
