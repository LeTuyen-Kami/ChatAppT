import React from 'react';
import {Box, Center, Pressable, useToast} from 'native-base';
import InterText from 'components/InterText';
import Header from 'components/Header';
import {Dimensions} from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import dataToeic, {DataWord} from 'src/assets/dataToeic';
import TouchableScale from 'components/TouchableScale';
import ToastCustom from 'components/ToastCustom';
import {GenericScreenProps} from 'navigation/AppNavigation';
import {storage} from 'src/database';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const LIST_WORD = dataToeic
  .map(item => {
    return item.data_child;
  })
  .flat();

const LIST_WORĐ_RANDOM: {
  idx: number;
  words: DataWord[];
}[] = [];

const getRandomThreeAnotherWord = (idx: number) => {
  if (
    LIST_WORĐ_RANDOM.length !== 0 &&
    LIST_WORĐ_RANDOM.find(item => item.idx === idx)
  ) {
    return LIST_WORĐ_RANDOM.find(item => item.idx === idx)?.words;
  }

  const arr: number[] = [];
  while (arr.length < 3) {
    const rd = Math.floor(Math.random() * LIST_WORD.length);
    if (rd !== idx && !arr.includes(rd)) {
      arr.push(rd);
    }
  }

  const listResult = [
    LIST_WORD[idx],
    LIST_WORD[arr[0]],
    LIST_WORD[arr[1]],
    LIST_WORD[arr[2]],
  ].sort(() => Math.random() - 0.5);

  LIST_WORĐ_RANDOM.push({
    idx,
    words: listResult,
  });
  if (LIST_WORĐ_RANDOM.length > 3) {
    LIST_WORĐ_RANDOM.shift();
  }
  return listResult;
};
const screen = Dimensions.get('window');

const initialIndex = () =>
  storage.getString('LastIndex')
    ? JSON.parse(storage.getString('LastIndex') as string)
    : {
        index: 0,
        page: 0,
        isFail: false,
      };
const InputTest: React.FC<GenericScreenProps<'InputTest'>> = ({navigation}) => {
  const progress1 = useSharedValue(0);
  const progress2 = useSharedValue(0);
  const box1Ref = React.useRef<any>(null);
  const [index, setIndex] = React.useState<{
    index: number;
    page: number;
    isFail: boolean;
  }>(initialIndex());

  const toast = useToast();

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: progress1.value * screen.width}],
      zIndex: progress1.value !== 0 ? 10 : 0,
      position: 'absolute',
      width: screen.width,
      height: screen.height,
    };
  }, []);

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -progress2.value * screen.width}],
      zIndex: 1,
      position: 'absolute',
      width: screen.width,
      height: screen.height,
      left: screen.width,
    };
  }, []);

  const onPress = () => {
    box1Ref.current?.measure(
      (_: any, __: any, ___: any, ____: any, pageX: number) => {
        if (pageX === 0) {
          setIndex({
            index: index.index + 1,
            page: 0,
            isFail: false,
          });
          progress2.value = withSpring(1, {}, () => {
            progress1.value = 1;
          });
        } else {
          setIndex({
            index: index.index + 1,
            page: 1,
            isFail: false,
          });
          progress1.value = withSpring(0, {}, () => {
            progress2.value = 0;
          });
        }
      },
    );
  };

  const renderPage = (idx: number) => {
    const id = 'id';
    if (idx < 0) idx = 0;
    const data: DataWord[] = getRandomThreeAnotherWord(idx)!;

    const onPressItem = (item: DataWord) => {
      if (item.child_name === LIST_WORD[idx].child_name) {
        if (!toast.isActive(id)) {
          toast.show({
            render: () => {
              return (
                <ToastCustom
                  id={id}
                  status={'success'}
                  title={'Đúng Rồi'}
                  variant={'solid'}
                />
              );
            },
          });
          setTimeout(() => {
            if (index.isFail === false) {
              storage.set(LIST_WORD[idx].child_name, 5);
            }
            onPress();
            toast.closeAll();
          }, 300);
        }
      } else {
        setIndex({
          ...index,
          isFail: true,
        });
        if (!toast.isActive(id)) {
          toast.show({
            render: () => {
              return (
                <ToastCustom
                  status={'warning'}
                  id={id}
                  title={'Sai Rồi'}
                  variant={'solid'}
                />
              );
            },
          });
        }
      }
    };

    return (
      <Box flex={1} mb={10}>
        <Center flex={1}>
          <InterText bold fontSize={20}>
            {LIST_WORD[idx].child_name}
          </InterText>
        </Center>
        <Box flexWrap={'wrap'} flex={2}>
          {data.map((item: DataWord, index: number) => {
            return (
              <TouchableScale
                key={index}
                onPress={onPressItem.bind(null, item)}>
                <Center
                  p={2}
                  m={2}
                  bg={'#fff'}
                  width={screen.width / 2 - 16}
                  height={screen.width / 2 - 16}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <InterText textAlign={'center'}>
                    {item.child_vietnamese_mean.split(':')[1]}
                  </InterText>
                </Center>
              </TouchableScale>
            );
          })}
        </Box>
      </Box>
    );
  };

  React.useEffect(() => {
    storage.set('LastIndex', JSON.stringify(index));
    if (index.index === LIST_WORD.length) {
      storage.set('isNotFirstAccess', false);
      toast.show({
        render: () => {
          return (
            <ToastCustom
              status={'success'}
              id={'id'}
              title={'Hoàn Thành'}
              subtitle={'Bạn đã hoàn thành bài kiểm tra'}
              variant={'solid'}
            />
          );
        },
      });
      setTimeout(() => {
        navigation.navigate('Overview');
      }, 1000);
    }
  }, [index.index]);

  return (
    <Box flex={1}>
      <Header title={'Kiểm Tra Đầu Vào'} />
      <Pressable flex={1} onPress={onPress}>
        <Box flex={1} flexDirection={'row'}>
          <AnimatedBox style={animatedStyle1} ref={box1Ref} bg={'#00ffff'}>
            {index.page === 0
              ? renderPage(index.index - 1)
              : renderPage(index.index)}
          </AnimatedBox>
          <AnimatedBox style={animatedStyle2} bg={'#ff00ff'}>
            {index.page === 1
              ? renderPage(index.index - 1)
              : renderPage(index.index)}
          </AnimatedBox>
        </Box>
      </Pressable>
    </Box>
  );
};

export default InputTest;
