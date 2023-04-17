import React from 'react';

import {Box, Pressable, IPressableProps} from 'native-base';

interface TouchableScaleProps extends IPressableProps {
  children: React.ReactElement;
  scale?: number;
}

const TouchableScale: React.FC<TouchableScaleProps> = ({
  children,
  scale = 0.95,
  ...props
}) => {
  return (
    <Pressable {...props}>
      {({isPressed}) => {
        return React.Children.map(children, (child: React.ReactElement) => {
          return React.cloneElement(child, {
            style: {
              transform: [{scale: isPressed ? scale : 1}],
            },
          });
        });
      }}
    </Pressable>
  );
};

export default TouchableScale;
