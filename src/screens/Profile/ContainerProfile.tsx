import React from 'react';

import {Text, useWindowDimensions, View} from 'react-native';
import {Box, Button, Input, useToast} from 'native-base';
import {FlashList} from '@shopify/flash-list';
import Item from 'screens/Profile/Item';

const ContainerProfile: React.FC<{}> = () => {
  const screen = useWindowDimensions();
  const toast = useToast();

  const [input, setInput] = React.useState<string>('');

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return <Item item={item} index={index} />;
  };

  const flashListRef = React.useRef<any>(null);

  const onPressPrev = () => {
    const isHorizontal =
      flashListRef.current?.rlvRef?._scrollComponent?.props?.isHorizontal;
    const itemHeight = !isHorizontal ? screen.height : screen.width;
    const currentOffset =
      flashListRef.current?.rlvRef?._scrollComponent?._offset;
    // console.log(
    //   'onPressNext',
    //   itemHeight,
    //   currentOffset,
    //   deviceHeight,
    //   deviceWidth,
    // );

    if (currentOffset === 0) {
      toast.show({
        title: 'Đây là chương đầu tiên',
      });
      return;
    }
    const prevIndex = Math.round((currentOffset - itemHeight) / itemHeight);

    flashListRef.current?.scrollToIndex({
      animated: true,
      index: prevIndex,
    });
  };

  const onPressNext = () => {
    const isHorizontal =
      flashListRef.current?.rlvRef?._scrollComponent?.props?.isHorizontal;
    const itemHeight = !isHorizontal ? screen.height : screen.width;
    const currentOffset =
      flashListRef.current?.rlvRef?._scrollComponent?._offset;
    // console.log('onPressNext', itemHeight, currentOffset);
    const contentLength = Math.round(itemHeight * 1000);

    if (Math.round(currentOffset + itemHeight) >= contentLength) {
      toast.show({
        title: 'Đây là chương cuối cùng',
      });
      return;
    }
    const prevIndex = Math.round((currentOffset + itemHeight) / itemHeight);

    flashListRef.current?.scrollToIndex({
      animated: true,
      index: prevIndex,
    });
  };

  return (
    <Box w={screen.width} h={screen.height}>
      <FlashList
        ref={flashListRef}
        pagingEnabled={true}
        renderItem={renderItem}
        nestedScrollEnabled={true}
        data={[...Array(1000).keys()]}
        estimatedItemSize={screen.width}
        horizontal
      />
      <Box position={'absolute'} top={100} left={0} right={0}>
        <Button.Group variant="solid" space={2} isAttached>
          <Button onPress={onPressPrev}>
            <Text>Prev</Text>
          </Button>
          <Button onPress={onPressNext}>
            <Text>Next</Text>
          </Button>
          <Input flex={1} bg={'white'} value={input} onChangeText={setInput} />
          <Button
            onPress={() => {
              flashListRef.current?.scrollToIndex({
                animated: true,
                index: Number(input),
              });
            }}>
            <Text>Go</Text>
          </Button>
        </Button.Group>
      </Box>
    </Box>
  );
};

export default ContainerProfile;
