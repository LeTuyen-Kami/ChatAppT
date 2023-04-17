import React from 'react';

import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {Box} from 'native-base';
import {book} from 'utils/testUtils';
import {FlashList} from '@shopify/flash-list';
import Animated, {
  withRepeat,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';

//seven colors
const colors = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#4B0082',
  '#9400D3',
];

const Item: React.FC<{
  item: any;
  index: number;
}> = ({item, index}) => {
  const screen = useWindowDimensions();
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const progress1 = useSharedValue(0);
  const progress2 = useSharedValue(0);
  const color1 = React.useRef(colors[Math.floor(Math.random() * 7)]);
  const color2 = React.useRef(colors[Math.floor(Math.random() * 7)]);
  const color3 = React.useRef(colors[Math.floor(Math.random() * 7)]);
  const color4 = React.useRef(colors[Math.floor(Math.random() * 7)]);
  const [styleIndex, setStyleIndex] = React.useState<number>(-1);

  const animatedStyle1 = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      progress1.value,
      [0, 1],
      [color1.current, color2.current],
    );
    return {
      color: textColor,
    };
  }, []);

  const animatedStyle2 = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      progress2.value,
      [0, 1],
      [color3.current, color4.current],
    );
    return {
      color: textColor,
    };
  }, []);

  React.useEffect(() => {
    setLoading(true);
    book
      .getBookAsync(index, 200)
      .then(res => {
        setData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [item]);

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setStyleIndex(styleIndex === index ? -1 : index);
        }}
        style={
          styleIndex === index
            ? {
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: 5,
                borderRadius: 10,
              }
            : {}
        }>
        <Animated.Text
          style={[
            {
              marginBottom: 10,
            },
            // index % 2 === 0 ? animatedStyle1 : animatedStyle2,
          ]}>
          {item.map((i: any, idx: number) => {
            return (
              <Text
                key={idx}
                style={{
                  fontStyle: i.s === 'i' ? 'italic' : 'normal',
                  fontWeight: i.s === 'b' ? 'bold' : 'normal',
                }}>
                {i.text}
              </Text>
            );
          })}
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const length = React.useMemo(() => {
    return data
      ?.map(it => it.map(i => i.text).join(' '))
      .join(' ')
      .split(' ').length;
  }, [data]);

  React.useEffect(() => {
    progress1.value = withRepeat(withTiming(1, {duration: 1000}), -1, true);
    progress2.value = withRepeat(withTiming(1, {duration: 1000}), -1, true);
  }, []);

  return (
    <Box w={screen.width} h={screen.height}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Box flex={1} marginX={2}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Chương {index + 1}: {length} từ
          </Text>
          <FlashList
            extraData={styleIndex}
            estimatedItemSize={200}
            data={data}
            renderItem={renderItem}
          />
        </Box>
      )}
    </Box>
  );
};

export default Item;
