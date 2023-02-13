import React from 'react';

import {
  Box,
  Button,
  CheckIcon,
  Icon,
  VStack,
  Text,
  AddIcon,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';
import {GenericScreenProps} from 'navigation/AppNavigation';
import InterTextInput from 'components/InterTextInput';
import InputItem from 'screens/Login/InputItem';
import InterText from 'components/InterText';

const ContainerLogin: React.FC<GenericScreenProps<'Login'>> = ({
  navigation,
}) => {
  const handlePress = () => {
    navigation.navigate('BottomTab');
  };

  return (
    <VStack flex={1} padding={2}>
      <Box h={300} bgColor={'emerald.100'}>
        <Text>Container Login</Text>
      </Box>
      <VStack>
        <InterText italic={true}>Container Login</InterText>
        <InterText>
          Lần đầu đăng nhập{' '}
          <InterText
            color={'blue.500'}
            onPress={handlePress}
            suppressHighlighting={true}>
            Đăng ký
          </InterText>
        </InterText>
      </VStack>

      <Box w="75%" maxW="300px">
        <InputItem placeholder={'Nhập tài khoản'} />
      </Box>
      <FormControl isInvalid w="75%" maxW="300px">
        <InterTextInput
          placeholder={'Nhập mật khẩu'}
          rightElement={<AddIcon />}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Try different from previous passwords.
        </FormControl.ErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default ContainerLogin;
