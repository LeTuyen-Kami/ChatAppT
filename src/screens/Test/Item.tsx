import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Text} from 'react-native';
import {height, width} from 'utils/utils';

const ITEM_WIDTH = width;

const ItemTest: React.FC<{
  item: any;
  index: number;
  scrollY: Animated.SharedValue<number>;
}> = ({item, index, scrollY}) => {
  const bg = `rgb(255,255,${Math.abs(Math.sin(item * 2)) * 255})`;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollY.value,
            [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH],
            [-ITEM_WIDTH, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [scrollY.value]);

  return (
    <Animated.View
      style={[
        {
          width: ITEM_WIDTH,
          height: height,
          backgroundColor: bg,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 10,
          shadowColor: 'black',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        },
        animatedStyle,
      ]}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {item} {index}
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
      </Text>
    </Animated.View>
  );
};

export default React.memo(ItemTest, (prev, next) => {
  return prev.item === next.item;
});
