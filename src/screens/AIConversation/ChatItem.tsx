import React from 'react';
import {Box, Text} from 'native-base';

const ChatItem: React.FC<{
  isUser: boolean;
  message: string;
}> = ({isUser, message}) => {
  return (
    <Box>
      <Text>
        {isUser ? 'Bạn' : 'Bot'} :{' '}
        <Text color={isUser ? 'white' : 'blue.200'}>{message}</Text>
      </Text>
    </Box>
  );
};

export default ChatItem;
