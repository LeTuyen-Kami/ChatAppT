import React from 'react';

import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  withSpring,
  useAnimatedStyle,
  withDecay,
  useAnimatedReaction,
  interpolate,
  withRepeat,
} from 'react-native-reanimated';
import {FlashList, CellContainer} from '@shopify/flash-list';
import ItemTest from './Item';
import {width} from 'utils/utils';
import {Box} from 'native-base';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useClockValue} from '@shopify/react-native-skia';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const TestSquare: React.FC<any> = () => {
  const scrollX = useSharedValue(0);
  const ctx = useSharedValue(0);
  const x = useClockValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      ctx.value = scrollX.value;
    })
    .onChange(event => {
      scrollX.value = ctx.value + event.translationX;
    })
    .onEnd(event => {
      scrollX.value = withDecay({
        velocity: event.velocityX,
        velocityFactor: 5,
        // clamp: [-100, 100],
      });
    });
  // Math.sin(scrollX.value / 180) * 150

  useAnimatedReaction(
    () => {
      return scrollX.value;
    },
    value => {
      console.log(0.5 + Math.cos(scrollX.value / 180) / 2);
    },
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: Math.sin(scrollX.value / 180) * 150,
        },
        {
          translateY: Math.cos(scrollX.value / 180) * 20,
        },
        {
          scale: interpolate(
            0.5 + Math.cos(scrollX.value / 180) / 2,
            [0, 1],
            [0.6, 1],
          ),
        },
        {
          rotate: `${scrollX.value}deg`,
        },
      ],
      backgroundColor: `rgb(255,255,${
        Math.abs(Math.sin(scrollX.value / 180)) * 255
      })`,
    };
  }, []);

  return (
    <Box flex={1} justifyContent={'center'}>
      <GestureDetector gesture={pan}>
        <Box
          bg={'teal.200'}
          w={'full'}
          h={20}
          justifyContent={'center'}
          flexDirection={'row'}>
          <AnimatedBox w={20} h={20} bg={'red.500'} style={animatedStyle} />
          <AnimatedBox w={20} h={20} bg={'red.500'} style={animatedStyle} />
          <AnimatedBox w={20} h={20} bg={'red.500'} style={animatedStyle} />
        </Box>
      </GestureDetector>
    </Box>
  );
};

export default TestSquare;
