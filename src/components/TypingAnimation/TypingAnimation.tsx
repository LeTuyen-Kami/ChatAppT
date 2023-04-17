import React from 'react';

import {Text, View} from 'react-native';
import {Box} from 'native-base';
import Dot from 'components/TypingAnimation/Dot';
import InterText from 'components/InterText';

const TypingAnimation: React.FC<{
  dotNumber?: number;
  text?: string;
}> = ({dotNumber = 3, text}) => {
  return (
    <Box flexDir={'row'} alignItems={'center'}>
      <InterText italic fontSize={16}>
        {text}{' '}
      </InterText>
      {[...Array(dotNumber).keys()].map(item => {
        return <Dot key={item} index={item} />;
      })}
    </Box>
  );
};

export default TypingAnimation;
