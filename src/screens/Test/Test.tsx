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
  withTiming,
} from 'react-native-reanimated';
import {FlashList, CellContainer} from '@shopify/flash-list';
import ItemTest from './Item';
import {width} from 'utils/utils';
import {Box, Center} from 'native-base';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useClockValue} from '@shopify/react-native-skia';
import Item from './Item';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const TestSquare: React.FC<any> = () => {
  const scrollX = useSharedValue(0);
  const ctx = useSharedValue(0);
  const x = useClockValue(0);
  const list = [1, 2, 3, 4, 5, 6, 7];
  const offset = 360 / list.length;

  const pan = Gesture.Pan()
    .onStart(() => {
      ctx.value = scrollX.value;
    })
    .onChange(event => {
      scrollX.value = ctx.value + event.translationX;
    })
    .onEnd(event => {
      let index = Math.round(scrollX.value / 120);
      if (event.velocityX > 0) {
        index = Math.ceil(scrollX.value / offset);
      } else {
        index = Math.floor(scrollX.value / offset);
      }
      scrollX.value = withTiming(index * offset);
    });
  // Math.sin(scrollX.value / 180) * 150

  return (
    <Box flex={1} justifyContent={'center'}>
      <GestureDetector gesture={pan}>
        <Center>
          <Box bg={'teal.200'} w={300} h={20} flexDirection={'row'}>
            {list.map((item, index) => {
              return (
                <Item
                  length={list.length}
                  scrollX={scrollX}
                  key={index}
                  index={index}
                />
              );
            })}
          </Box>
        </Center>
      </GestureDetector>
    </Box>
  );
};

export default TestSquare;
