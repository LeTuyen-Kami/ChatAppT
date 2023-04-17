import TouchableScale from 'components/TouchableScale';
import {Box, Icon, Image} from 'native-base';
import InterText from 'components/InterText';
import {TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

export function HomeCourse(props: {
  onPress: () => void;
  onLongPress: () => void;
}) {
  return (
    <TouchableScale
      scale={0.99}
      onPress={props.onPress}
      onLongPress={props.onLongPress}>
      <Box
        flexDirection={'row'}
        p={1}
        m={1}
        bg={'pink.50'}
        shadow={3}
        borderRadius={'md'}>
        <Box justifyContent={'center'}>
          <Image
            w={50}
            h={50}
            source={{
              uri: 'https://yt3.ggpht.com/lgX-82qUFolrPNfeMZ7pNQDAsWLobTBOvGSyef0WwJhaLfh0b2dGaO8UkPgM1j3VMYMnJ_4dQ8E=s88-c-k-c0x00ffffff-no-nd-rj',
            }}
            borderRadius={50}
            alt={'image'}
          />
        </Box>
        <Box flex={1}>
          <Box
            justifyContent={'space-between'}
            flexDirection={'row'}
            m={1}
            p={1}>
            <InterText bold>khóa học 600 từ vựng toeic</InterText>
            <TouchableOpacity>
              <Icon as={FontAwesome5Icon} name="trash" />
            </TouchableOpacity>
          </Box>
          <Box flexDirection={'row'}>
            <Box flexDirection={'row'} px={1} m={1} alignItems={'center'}>
              <Icon as={FontAwesome5Icon} name="feather-alt" />
              100/600
            </Box>
            <Box flexDirection={'row'} alignItems={'center'} px={1} m={1}>
              <Icon as={FontAwesome5Icon} name="rocket" />
              1000
            </Box>
          </Box>
          <Box
            bg={'cyan.100'}
            w={'100%'}
            h={3}
            borderRadius={'sm'}
            overflow={'hidden'}>
            <Box flex={1} bg={'cyan.500'} w={`${100 / 6}%`} />
          </Box>
        </Box>
      </Box>
    </TouchableScale>
  );
}
