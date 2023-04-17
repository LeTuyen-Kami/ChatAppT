import React from 'react';

import {
  Alert,
  Text,
  CloseIcon,
  IconButton,
  useToast,
  VStack,
  HStack,
  Box,
  Center,
} from 'native-base';

const ToastCustom: React.FC<{
  id: string;
  status?: 'info' | 'success' | 'warning' | 'error';
  variant?: 'solid' | 'subtle' | 'left-accent' | 'top-accent' | 'outline';
  title: string;
  description?: string;
  isClosable?: boolean;
  [x: string]: any;
}> = ({
  id,
  status,
  variant,
  title,
  description = '',
  isClosable = false,
  ...rest
}) => {
  const toast = useToast();
  return (
    <Alert
      maxWidth={100}
      alignSelf="center"
      justifyContent={description ? 'space-between' : 'center'}
      flexDirection="row"
      status={status ? status : 'info'}
      variant={variant}
      {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack alignItems="center" justifyContent="center">
          <Center alignItems="center" justifyContent={'center'}>
            {/*<Alert.Icon />*/}
            <Text
              textAlign={'center'}
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={
                variant === 'solid'
                  ? 'lightText'
                  : variant !== 'outline'
                  ? 'darkText'
                  : null
              }>
              {title}
            </Text>
          </Center>
          {isClosable ? (
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size="3" />}
              _icon={{
                color: variant === 'solid' ? 'lightText' : 'darkText',
              }}
              onPress={() => toast.close(id)}
            />
          ) : null}
        </HStack>
        {description && (
          <Text
            px="6"
            color={
              variant === 'solid'
                ? 'lightText'
                : variant !== 'outline'
                ? 'darkText'
                : null
            }>
            {description}
          </Text>
        )}
      </VStack>
    </Alert>
  );
};

export default ToastCustom;
