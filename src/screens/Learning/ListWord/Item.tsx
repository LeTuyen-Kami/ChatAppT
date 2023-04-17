import {DataWord} from 'src/assets/dataToeic';
import {storage} from 'src/database';
import RNSound from 'components/RNSound';
import TouchableScale from 'components/TouchableScale';
import {Box} from 'native-base';
import InterText from 'components/InterText';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00'];

export const ItemWord = ({
  item,
  openActionSheet,
}: {
  item: DataWord;
  openActionSheet: () => void;
}) => {
  const itemScore = storage.getNumber(item.child_name);
  const onPress = () => {
    RNSound.sound(item.child_audio_url);
  };

  const onCallEvent = () => {
    openActionSheet();
  };

  const tap = Gesture.Tap().numberOfTaps(1).onStart(onPress);

  const tripleTap = Gesture.Tap()
    .maxDelay(1000)
    .numberOfTaps(3)
    .onStart(onCallEvent);

  return (
    <GestureDetector gesture={Gesture.Exclusive(tripleTap, tap)}>
      <TouchableScale>
        <Box
          shadow={2}
          p={1}
          m={1}
          bg={'pink.50'}
          borderRadius={'sm'}
          flexDirection={'row'}>
          <Box flex={1}>
            <Box flexDirection={'row'}>
              <InterText bold>{item.child_name}</InterText>
              <InterText>[{item.child_spell}]</InterText>
            </Box>

            <Box>
              <InterText>{item.child_english_mean}</InterText>
              <InterText>{item.child_vietnamese_mean}</InterText>
            </Box>
          </Box>
          {itemScore && (
            <Box alignItems={'center'} justifyContent={'center'}>
              <FontAwesome5Icon
                name={'check'}
                size={20}
                color={colors[itemScore] || '#00ff00'}
              />
            </Box>
          )}
        </Box>
      </TouchableScale>
    </GestureDetector>
  );
};
