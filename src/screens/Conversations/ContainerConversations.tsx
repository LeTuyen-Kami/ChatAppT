import React, {ReactElement} from 'react';

import {Text, View, FlatList} from 'react-native';
import {Box, Button, Toast} from 'native-base';
import InterText from 'components/InterText';
import InterTextInput from 'components/InterTextInput';
import {createChannel, getListChannel} from 'services/api';

const ContainerConversations: React.FC<any> = ({navigation, route}) => {
  const [name, setName] = React.useState('');
  const [listChannel, setListChannel] = React.useState([]);
  const onPressGoAIConversation = () => {
    navigation.navigate('AIConversation');
  };

  const onPressChat = (_name?: string) => {
    navigation.navigate('ChatScreen', {
      channelName: _name,
    });
  };

  const _getListChannel = () => {
    getListChannel()
      .then(res => {
        console.log('res', res);
        setListChannel(res.channels);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const onPressCreateChannel = () => {
    createChannel({
      name: name,
      userIDs: ['1', '2'],
    })
      .then(res => {
        console.log('res', res);
        Toast.show({
          title: res.toString(),
        });
        _getListChannel();
      })
      .catch(err => {
        console.log('err', err);
        Toast.show({
          title: err.toString(),
        });
      });
  };

  React.useEffect(() => {
    _getListChannel();
  }, []);

  return (
    <Box flex={1}>
      <InterTextInput
        mt={10}
        placeholder={'Nhập tên kênh'}
        value={name}
        onChangeText={setName}
      />
      <Button onPress={onPressCreateChannel}>
        <InterText>Tạo Kênh</InterText>
      </Button>
      <FlatList
        data={listChannel}
        renderItem={({item}: any) => {
          return (
            <Button
              bg={'red.300'}
              mt={3}
              onPress={onPressChat.bind(null, item?.name)}>
              <InterText>{item?.name}</InterText>
            </Button>
          );
        }}
      />
      <Text
        style={{
          fontFamily: 'Inter',
          fontWeight: 'bold',
          fontStyle: 'italic',
        }}>
        Hello
      </Text>
      <Button onPress={onPressGoAIConversation}>
        <InterText>GO AI Conversation</InterText>
      </Button>
      <Button onPress={onPressChat.bind(null, undefined)}>
        <InterText color={'white'}>Chat</InterText>
      </Button>
    </Box>
  );
};

export default ContainerConversations;
