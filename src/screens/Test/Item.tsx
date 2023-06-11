import React from 'react';

import {Box} from 'native-base';
import InterText from 'components/InterText';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedBox = Animated.createAnimatedComponent(Box);

interface Props {
  scrollX: SharedValue<number>;
  index: number;
  length: number;
}

const transformSin = (value: number) => {
  'worklet';
  return (value + 1) / 2;
};

const Item: React.FC<Props> = ({scrollX, length, index}) => {
  const offset = 360 / length;

  useAnimatedReaction(
    () => {
      return scrollX.value;
    },
    value => {
      console.log(
        index,
        value + index * 120,
        Math.sin((scrollX.value + index * 120) / 180),
      );
    },
  );

  const compact = (value: number) => {
    'worklet';
    return value % 360;
  };

  const isTop = (value: number) => {
    'worklet';
    if (compact(value) > 270 || compact(value) < 90) {
      return 1;
    } else {
      return 0;
    }
  };

  const translateDeg2Rad = (deg: number) => {
    'worklet';
    return (deg * Math.PI) / 180;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      transform: [
        {
          translateX:
            transformSin(
              Math.sin(translateDeg2Rad(scrollX.value + index * offset)),
            ) * 220,
        },
        // {
        //   translateY: Math.cos(scrollX.value / 180) * 20,
        // },
        {
          scale:
            isTop(scrollX.value + index * offset) *
              interpolate(
                transformSin(
                  Math.sin(translateDeg2Rad(scrollX.value + index * offset)),
                ),
                [0, 0.5, 1],
                [0, 0.5, 0],
              ) +
            1,
        },
      ],
      zIndex: isTop(scrollX.value + index * offset),
      backgroundColor: `rgb(255,255,${
        Math.abs(Math.sin(scrollX.value / 180)) * 255
      })`,
    };
  }, []);

  return (
    <AnimatedBox w={20} h={20} bg={'red.500'} style={animatedStyle}>
      <InterText>{index} </InterText>
    </AnimatedBox>
  );
};

export default Item;
