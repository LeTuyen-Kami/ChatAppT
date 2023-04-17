import React, {ReactElement} from 'react';

import {Text, View, FlatList} from 'react-native';
import {Box, Button} from 'native-base';
import InterText from 'components/InterText';

const ContainerConversations: React.FC<any> = ({navigation, route}) => {
  const onPressGoAIConversation = () => {
    navigation.navigate('AIConversation');
  };

  return (
    <Box flex={1}>
      <FlatList
        data={[1, 2, 3]}
        renderItem={({item}) => {
          return <Text>{item}</Text>;
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
    </Box>
  );
};

export default ContainerConversations;
