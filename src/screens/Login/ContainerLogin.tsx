import React from 'react';

import {
  Box,
  VStack,
  FormControl,
  WarningOutlineIcon,
  Button,
  HStack,
} from 'native-base';
import {GenericScreenProps} from 'navigation/AppNavigation';
import InputItem from 'screens/Login/InputItem';
import InterText from 'components/InterText';

const useHandleLogin = () => {
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    console.log('handleLogin');
  };

  const isValidPassword = password.length > 6;

  return {
    account,
    password,
    handleLogin,
    setAccount,
    setPassword,
    isValidPassword,
  };
};

const ContainerLogin: React.FC<GenericScreenProps<'Login'>> = ({
  navigation,
}) => {
  const handlePress = () => {
    navigation.navigate('BottomTab');
  };

  const {
    account,
    password,
    handleLogin,
    setAccount,
    setPassword,
    isValidPassword,
  } = useHandleLogin();

  return (
    <VStack flex={1} padding={2}>
      <Box h={300} bgColor={'emerald.100'}>
        <InterText>Đăng nhập vào TChat</InterText>
      </Box>
      <VStack>
        <InterText>Đăng nhập vào TChat</InterText>
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

      <Box w="100%" my={5}>
        <InputItem
          value={account}
          onChangeText={setAccount}
          role={'account'}
          placeholder={'Nhập tài khoản'}
        />
      </Box>
      <FormControl isInvalid={!isValidPassword} w="100%">
        <InputItem
          value={password}
          onChangeText={setPassword}
          role={'password'}
          placeholder={'Nhập mật khẩu'}
        />
        <Box>
          <InterText alignSelf={'flex-end'} color={'blue.500'} underline>
            Quên mật khẩu?
          </InterText>
        </Box>
      </FormControl>
      <Button
        borderRadius={50}
        bg={'blue.500'}
        _loading={{bg: 'emerald.500'}}
        onPress={handleLogin}>
        <InterText color={'white'}>Đăng nhập</InterText>
      </Button>
    </VStack>
  );
};

export default ContainerLogin;
