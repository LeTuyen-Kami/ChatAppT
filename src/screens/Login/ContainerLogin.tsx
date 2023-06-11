import React from 'react';

import {Box, Button, FormControl, Toast, VStack} from 'native-base';
import {GenericScreenProps} from 'navigation/AppNavigation';
import InputItem from 'screens/Login/InputItem';
import InterText from 'components/InterText';
import {login, testCall} from 'services/api';
import {useNavigation} from '@react-navigation/native';

const useHandleLogin = () => {
  const [account, setAccount] = React.useState('Letuyen123');
  const [password, setPassword] = React.useState('Letuyen123');
  const navigation = useNavigation<GenericScreenProps<'Login'>['navigation']>();
  const handleLogin = () => {
    navigation.navigate('BottomTab');
    return;
    login({
      name: account,
      password: password,
    })
      .then(res => {
        console.log('res', res);
        Toast.show({
          title: 'Đăng nhập thành công',
        });
        navigation.navigate('BottomTab');
      })
      .catch(err => {
        console.log('err', err);
        Toast.show({
          title: 'Đăng nhập thất bại',
        });
      });
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
  console.log('render Login');
  const handlePress = () => {
    navigation.navigate('Register');
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
          roleI={'account'}
          placeholder={'Nhập tài khoản'}
        />
      </Box>
      <FormControl isInvalid={!isValidPassword} w="100%">
        <InputItem
          value={password}
          onChangeText={setPassword}
          roleI={'password'}
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
