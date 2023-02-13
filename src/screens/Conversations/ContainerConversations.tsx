import React from 'react';

import {Text, View} from 'react-native';
import {Box} from 'native-base';

const ContainerConversations: React.FC<{}> = () => {
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
    </Box>
  );
};

export default ContainerConversations;
