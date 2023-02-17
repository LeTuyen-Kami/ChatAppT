import React from 'react';

import {Text, View} from 'react-native';
import {Box, Button} from 'native-base';
import InterText from 'components/InterText';
import {GenericScreenProps} from 'navigation/AppNavigation';

const ContainerConversations: React.FC<any> = ({navigation, route}) => {
  const onPressGoAIConversation = () => {
    navigation.navigate('AIConversation');
  };

  return (
    <Box flex={1}>
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
