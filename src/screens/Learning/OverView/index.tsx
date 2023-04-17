import React from 'react';

import {Box, Button, Image} from 'native-base';
import Header from 'components/Header';
import {GenericScreenProps} from 'navigation/AppNavigation';
import InterText from 'components/InterText';
import dataToeic, {DataToeicProps} from 'src/assets/dataToeic';
import {FlashList} from '@shopify/flash-list';
import TouchableScale from 'components/TouchableScale';

const Overview: React.FC<GenericScreenProps<'Overview'>> = ({navigation}) => {
  const navigateListWord = (title: string = '', order: string = '') => {
    if (title && order) {
      navigation.navigate('ListWord', {title, topicId: order});
    } else {
      navigation.navigate('ListWord');
    }
  };

  const navigateAllWord = () => {
    navigateListWord();
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: DataToeicProps[number];
    index: number;
  }) => {
    const onPress = () => {
      navigateListWord(item.name, item.order);
    };

    return (
      <TouchableScale onPress={onPress}>
        <Box m={2} p={2} bg={'#00ffff'} flexDirection={'row'} borderRadius={2}>
          <Image
            borderRadius={5}
            src={item.image_url}
            alt="Alternate Text"
            size={'sm'}
          />
          <Box flex={1} ml={2}>
            <InterText>{item.name}</InterText>
          </Box>
        </Box>
      </TouchableScale>
    );
  };

  return (
    <Box flex={1}>
      <Header title={'Overview'} />
      <Button onPress={navigateAllWord}>
        <InterText>Xem Chi Tiết</InterText>
      </Button>
      <FlashList
        renderItem={renderItem}
        estimatedItemSize={50}
        data={dataToeic}
      />
    </Box>
  );
};

export default Overview;
