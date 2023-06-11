import React from 'react';

import InterTextInput from 'src/components/InterTextInput';
import {Icon, IInputProps} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';

interface InputItemProps extends IInputProps {
  roleI?: 'account' | 'password' | undefined;
}

const InputItem: React.FC<InputItemProps> = ({roleI, ...props}) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const onPressShowPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <InterTextInput
      secureTextEntry={roleI === 'password' ? secureTextEntry : false}
      value={props.value}
      onChangeText={props.onChangeText}
      leftElement={
        <Icon
          as={MaterialCommunityIcons}
          name={roleI === 'account' ? 'account' : 'lock'}
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
        roleI === 'password' ? (
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
      placeholder={props.placeholder}
      variant={'rounded'}
      {...props}
    />
  );
};

export default InputItem;
