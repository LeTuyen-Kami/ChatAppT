import React from 'react';

import {Box, Button, Center, Input} from 'native-base';
import InterText from 'components/InterText';
import InputItem from 'screens/Login/InputItem';
import {Register} from 'src/screens';
import {register} from 'services/api';

const Container: React.FC<any> = props => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleRegister = () => {
    if (!username || !password || !email) {
      return;
    }
    console.log('register', username, password, email);
    register({
      name: username,
      password: password,
      email: email,
    })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <Center flex={1} p={2}>
      <InterText>Đăng Ký</InterText>
      <InputItem
        mt={5}
        placeholder={'Nhập tên tài khoản'}
        roleI={'account'}
        value={username}
        onChangeText={setUsername}
      />
      <InputItem
        mt={5}
        placeholder={'Nhập mật khẩu'}
        roleI={'password'}
        value={password}
        onChangeText={setPassword}
      />
      <InputItem
        mt={5}
        placeholder={'Nhập email'}
        roleI={'account'}
        value={email}
        onChangeText={setEmail}
      />
      <Button
        mt={5}
        w={'100%'}
        borderRadius={50}
        bg={'blue.500'}
        _loading={{bg: 'emerald.500'}}
        onPress={handleRegister}>
        <InterText color={'white'}>Đăng ký</InterText>
      </Button>
    </Center>
  );
};

export default Container;
