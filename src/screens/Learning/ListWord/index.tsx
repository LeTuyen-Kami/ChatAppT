import React from 'react';

import {Box} from 'native-base';
import Header from 'components/Header';
import dataToeic, {DataWord} from 'src/assets/dataToeic';
import InterText from 'components/InterText';
import {FlashList} from '@shopify/flash-list';
import TouchableScale from 'components/TouchableScale';
import RNSound from 'components/RNSound';
import {GenericScreenProps} from 'navigation/AppNavigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {storage} from 'src/database';

const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00'];

const ListWord: React.FC<GenericScreenProps<'ListWord'>> = ({
  navigation,
  route,
}) => {
  const title = route.params?.title;
  const topicId = route.params?.topicId;

  return (
    <Box flex={1}>
      <Header title={title || 'Danh Sách Từ Cần Học'} />
      <FlashList
        estimatedItemSize={70}
        renderItem={ItemWord}
        data={dataToeic
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
          .flat()}
      />
    </Box>
  );
};

const ItemWord = ({item}: {item: DataWord}) => {
  const itemScore = storage.getNumber(item.child_name);
  const onPress = () => {
    RNSound.sound(item.child_audio_url);
  };

  return (
    <TouchableScale onPress={onPress}>
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
  );
};

export default ListWord;
