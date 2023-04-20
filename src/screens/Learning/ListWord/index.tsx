import React from 'react';

import {Actionsheet, Box, useDisclose} from 'native-base';
import Header from 'components/Header';
import dataToeic, {DataWord} from 'src/assets/dataToeic';
import {FlashList} from '@shopify/flash-list';
import {GenericScreenProps} from 'navigation/AppNavigation';
import {ItemWord} from 'screens/Learning/ListWord/Item';
import InterText from 'components/InterText';
import {Database} from 'src/database';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated';
import {height} from 'utils/utils';
import {TouchableOpacity} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const getGoTopLocation = () => {
  return Database.getString(Database.keys.GO_TOP_LOCATION);
};

const listItem = (learned: boolean, topicId: string) => {
  let newData: DataWord[] = [];
  if (topicId) {
    let dataTopic = dataToeic.find(item => item.order === topicId);
    if (dataTopic) {
      newData = dataTopic.data_child.filter(item => {
        const itemScore = Database.getNumber(item.child_name);
        if (itemScore) {
          return learned;
        }
        return !learned;
      });
    }
  } else {
    newData = dataToeic
      .map(item => {
        return item.data_child.filter(i => {
          const itemScore = Database.getNumber(i.child_name);
          if (itemScore) {
            return learned;
          }
          return !learned;
        });
      })
      .flat();
  }
  return newData;
};

const defaultData = (topicId: string) => {
  return dataToeic
    .map(item => {
      if (!topicId) {
        return item.data_child;
      }

      if (item.order === topicId) {
        return item.data_child;
      } else {
        return [];
      }
    })
    .flat();
};

const ListWord: React.FC<GenericScreenProps<'ListWord'>> = ({
  navigation,
  route,
}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const flatListRef = React.useRef<any>(null);
  const scale = useSharedValue(0);
  const ctx = useSharedValue({x: 0, y: 0});
  const translate = useSharedValue(
    getGoTopLocation()
      ? JSON.parse(getGoTopLocation() as string)
      : {x: 0, y: 0},
  );
  const title = route.params?.title;
  const topicId = route.params?.topicId || '';

  const wordsLearned = React.useMemo(() => listItem(true, topicId), [topicId]);
  const wordsLearning = React.useMemo(
    () => listItem(false, topicId),
    [topicId],
  );
  const _defaultData = React.useMemo(() => defaultData(topicId), [topicId]);
  const [data, setData] = React.useState<DataWord[]>(_defaultData);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: scale.value},
        {translateX: translate.value.x},
        {translateY: translate.value.y},
      ],
    };
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      if (event.contentOffset.y > height) {
        scale.value = withSpring(1, {damping: 100, stiffness: 1000});
      } else {
        scale.value = withSpring(0, {damping: 100, stiffness: 1000});
      }
    },
  });

  const updateLocation = () => {
    Database.set(
      Database.keys.GO_TOP_LOCATION,
      JSON.stringify(translate.value),
    );
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      ctx.value = translate.value;
    })
    .onUpdate(e => {
      translate.value = {
        x: ctx.value.x + e.translationX,
        y: ctx.value.y + e.translationY,
      };
    })
    .onEnd(() => {
      runOnJS(updateLocation)();
    });

  const renderItem = ({item}: any) => {
    return <ItemWord item={item} openActionSheet={onOpen} />;
  };

  const action = {
    1: (_: boolean) => {
      setData(_defaultData);
      onClose();
    },
    2: (learned: boolean) => {
      const newData = learned ? wordsLearned : wordsLearning;
      onClose();
      setData(newData);
    },
  };

  const onPressItemActionSheet = (index: 1 | 2 | 3) => {
    let actionIndex: 1 | 2 = index === 1 ? 1 : 2;
    action[actionIndex](index === 2);
  };

  const onGoTop = () => {
    flatListRef.current?.scrollToIndex({index: 0, animated: true});
  };

  return (
    <Box flex={1}>
      <Header title={title || 'Danh Sách Từ Cần Học'} />
      <AnimatedFlashList
        ref={flatListRef}
        estimatedItemSize={70}
        onScroll={onScroll}
        renderItem={renderItem}
        data={data}
        scrollEventThrottle={16}
        numColumns={1}
      />
      <TouchableOpacity
        onPress={onGoTop}
        hitSlop={{
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        }}>
        <GestureDetector gesture={pan}>
          <AnimatedBox
            style={animatedStyle}
            position="absolute"
            bottom={10}
            right={10}
            bg="rgba(255,255,255,0.8)"
            borderRadius={50}
            w={'60px'}
            h={'60px'}
            justifyContent="center"
            alignItems="center"
            p={2}>
            <FontAwesome5Icon name={'arrow-up'} size={20} />
          </AnimatedBox>
        </GestureDetector>
      </TouchableOpacity>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <InterText
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Sort by
            </InterText>
          </Box>
          <Actionsheet.Item onPress={onPressItemActionSheet.bind(null, 1)}>
            <InterText>
              Default{' '}
              <InterText bold>{_defaultData.length + ' words'}</InterText>{' '}
            </InterText>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onPressItemActionSheet.bind(null, 2)}>
            <InterText>
              Have learned
              <InterText bold>{' ' + wordsLearned.length + ' words'}</InterText>
            </InterText>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onPressItemActionSheet.bind(null, 3)}>
            <InterText>
              Haven't studied yet{' '}
              <InterText bold>
                {' ' + wordsLearning.length + ' words'}
              </InterText>
            </InterText>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default ListWord;
