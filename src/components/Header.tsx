import React from 'react';

import {Box, Center, Icon} from 'native-base';
import TouchableScale from 'components/TouchableScale';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import InterText from 'components/InterText';
import {useNavigation} from '@react-navigation/native';

const Header: React.FC<{
  title: string;
  subtitle?: string;
  rightComponent?: React.ReactElement;
  onPressRight?: () => void;
  onPressLeft?: () => void;
  leftComponent?: React.ReactElement;
  hideLeft?: boolean;
}> = ({
  title,
  subtitle,
  rightComponent,
  onPressRight,
  leftComponent,
  onPressLeft,
  hideLeft = false,
}) => {
  const navigation = useNavigation() as any;
  const onPressLeftDefault = () => {
    navigation.goBack();
  };

  return (
    <Box bg={'blue.100'} w={'100%'} h={12} flexDirection={'row'}>
      {!hideLeft && (
        <TouchableScale
          scale={0.9}
          onPress={onPressLeft ? onPressLeft : onPressLeftDefault}>
          {leftComponent ? (
            leftComponent
          ) : (
            <Center w={12} h={'100%'}>
              <Icon as={FontAwesome5Icon} name="chevron-left" size={5} />
            </Center>
          )}
        </TouchableScale>
      )}
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <InterText numberOfLines={1} bold fontSize={'lg'}>
          {title}
        </InterText>
        {subtitle && (
          <InterText numberOfLines={1} sub>
            {subtitle}
          </InterText>
        )}
      </Box>
      {!hideLeft && (
        <TouchableScale scale={0.9} onPress={onPressRight}>
          <Center w={12} h={'100%'}>
            {rightComponent &&
              React.Children.map(
                rightComponent,
                (child: React.ReactElement) => {
                  return React.cloneElement(child, {
                    size: 5,
                  });
                },
              )}
          </Center>
        </TouchableScale>
      )}
    </Box>
  );
};

export default Header;
