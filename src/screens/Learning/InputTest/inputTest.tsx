import React from 'react';
import {Box, Center, useToast} from 'native-base';
import InterText from 'components/InterText';
import Header from 'components/Header';
import Animated, {withSpring, runOnJS} from 'react-native-reanimated';
import {DataWord} from 'src/assets/dataToeic';
import TouchableScale from 'components/TouchableScale';
import ToastCustom from 'components/ToastCustom';
import {GenericScreenProps} from 'navigation/AppNavigation';
import {Database} from 'src/database';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import RNSound from 'components/RNSound';
import {getRandomThreeAnotherWord, LIST_WORD} from './utils';
import {width} from 'utils/utils';
import {useAnimated} from 'screens/Learning/InputTest/hook';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const initialIndex = () =>
  Database.getString(Database.keys.LAST_INDEX)
    ? JSON.parse(Database.getString(Database.keys.LAST_INDEX) as string)
    : {
        index: 0,
        page: 0,
        isFail: false,
      };
const InputTest: React.FC<GenericScreenProps<'InputTest'>> = ({navigation}) => {
  const box1Ref = React.useRef<any>(null);
  const [index, setIndex] = React.useState<{
    index: number;
    page: number;
    isFail: boolean;
  }>(initialIndex());

  const [isVolume, setIsVolume] = React.useState(true);

  const {progress1, progress2, animatedStyle1, animatedStyle2} = useAnimated();

  const [lockPress, setLockPress] = React.useState(false);

  const toggleVolume = () => {
    setIsVolume(!isVolume);
  };

  const toast = useToast();

  const playSound = (idx: number, isSkipLock: boolean = false) => {
    if (!isVolume && !isSkipLock) {
      return;
    }

    if (idx < 0) idx = 0;
    if (idx >= LIST_WORD.length) idx = LIST_WORD.length - 1;

    const url = LIST_WORD[idx].child_audio_url;
    RNSound.sound(url);
  };

  const onPress = () => {
    setLockPress(true);
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
            runOnJS(playSound)(index.index + 1);
            runOnJS(setLockPress)(false);
          });
        } else {
          setIndex({
            index: index.index + 1,
            page: 1,
            isFail: false,
          });
          progress1.value = withSpring(0, {}, () => {
            progress2.value = 0;
            runOnJS(playSound)(index.index + 1);
            runOnJS(setLockPress)(false);
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
            if (!index.isFail) {
              Database.set(LIST_WORD[idx].child_name, 5);
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
      <Box flex={1}>
        <Center
          shadow={2}
          bg={'transparent'}
          position={'absolute'}
          top={0}
          right={6}>
          {/*<Icon*/}
          {/*  bg={'red.200'}*/}
          {/*  as={FontAwesome5Icon}*/}
          {/*  name={'bookmark'}*/}
          {/*  size={10}*/}
          {/*  solid*/}
          {/*/>*/}
          <FontAwesome5Icon
            color={'#3d3d24'}
            solid
            name={'bookmark'}
            size={50}
          />
          <Center position={'absolute'} top={0} left={0} right={0} bottom={0}>
            <InterText bold fontSize={'lg'} color={'white'}>
              {idx}
            </InterText>
          </Center>
        </Center>
        <Center flex={1}>
          {/*<Image*/}
          {/*  src={LIST_WORD[idx].child_image_url}*/}
          {/*  width={200}*/}
          {/*  height={160}*/}
          {/*  resizeMode={'contain'}*/}
          {/*  alt={'image'}*/}
          {/*/>*/}
          <Box flexDirection={'row'} alignItems={'center'}>
            <InterText bold fontSize={'2xl'} color={'#ff00ff'}>
              {LIST_WORD[idx].child_name} {'  '}
            </InterText>
            <TouchableScale onPress={playSound.bind(null, index.index, true)}>
              <FontAwesome5Icon name={'volume-up'} size={20} />
            </TouchableScale>
          </Box>
        </Center>
        <Box flexWrap={'wrap'} flex={2}>
          {data.map((item: DataWord, idx: number) => {
            return (
              <TouchableScale key={idx} onPress={onPressItem.bind(null, item)}>
                <Center
                  shadow={2}
                  borderRadius={3}
                  p={2}
                  m={2}
                  bg={'#fff'}
                  width={width / 2 - 16}
                  height={width / 2 - 16}
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
    Database.set(Database.keys.LAST_INDEX, JSON.stringify(index));
    if (index.index === LIST_WORD.length) {
      Database.set(Database.keys.LAST_INDEX, false);
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
      <Header
        title={'Kiểm Tra Đầu Vào'}
        rightComponent={
          <FontAwesome5Icon
            name={!isVolume ? 'volume-mute' : 'volume-up'}
            size={20}
          />
        }
        onPressRight={toggleVolume}
      />
      <Box flex={1} flexDirection={'row'}>
        <AnimatedBox style={animatedStyle1} ref={box1Ref} bg={'#00ffff'}>
          {index.page === 0
            ? renderPage(index.index - 1)
            : renderPage(index.index)}
        </AnimatedBox>
        <AnimatedBox style={animatedStyle2} bg={'#00ffff'}>
          {index.page === 1
            ? renderPage(index.index - 1)
            : renderPage(index.index)}
        </AnimatedBox>
      </Box>
      <TouchableScale
        isDisabled={lockPress}
        _disabled={{opacity: 0.5}}
        onPress={onPress}
        h={10}
        bg={'#ff00ff'}
        justifyContent={'center'}
        m={2}
        borderRadius={3}
        alignItems={'center'}>
        <InterText bold fontSize={16} color={'white'} textAlign={'center'}>
          Không biết
        </InterText>
      </TouchableScale>
    </Box>
  );
};

export default InputTest;
