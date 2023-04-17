import React from 'react';

import InterTextInput from 'src/components/InterTextInput';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';

const InputItem: React.FC<{
  placeholder: string;
  role: 'account' | 'password';
  value?: string;
  onChangeText?: (text: string) => void;
}> = ({placeholder, role, value, onChangeText}) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const onPressShowPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <InterTextInput
      secureTextEntry={role === 'password' ? secureTextEntry : false}
      value={value}
      onChangeText={onChangeText}
      leftElement={
        <Icon
          as={MaterialCommunityIcons}
          name={role === 'account' ? 'account' : 'lock'}
          size="sm"
          ml="2"
          color="muted.400"
          _light={{
            color: 'blueGray.400',
          }}
          _dark={{
            color: 'blueGray.50',
          }}
        />
      }
      rightElement={
        role === 'password' ? (
          <TouchableOpacity onPress={onPressShowPassword}>
            <Icon
              as={MaterialCommunityIcons}
              name={secureTextEntry ? 'eye' : 'eye-off'}
              size="sm"
              mr="2"
              color="muted.400"
              _light={{
                color: 'blueGray.400',
              }}
              _dark={{
                color: 'blueGray.50',
              }}
            />
          </TouchableOpacity>
        ) : undefined
      }
      placeholder={placeholder}
      variant={'rounded'}
    />
  );
};

export default InputItem;
