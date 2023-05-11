import React from 'react';
import {Box, Text} from 'native-base';
import Popover from 'components/Popover';

const ChatItem: React.FC<{
  isUser: boolean;
  message: string;
}> = ({isUser, message}) => {
  return (
    <Popover>
      <Box>
        <Text>
          {isUser ? 'Bạn' : 'Bot'} :{' '}
          <Text color={isUser ? 'white' : 'blue.200'}>{message}</Text>
        </Text>
      </Box>
    </Popover>
  );
};

export default ChatItem;
