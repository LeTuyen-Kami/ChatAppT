import React, {PropsWithChildren} from 'react';

import {Text, ITextProps} from 'native-base';

type InterTextProps = PropsWithChildren<ITextProps>;

const InterText: React.FC<InterTextProps> = ({children, ...props}) => {
  return (
    <Text fontFamily={'Inter'} {...props}>
      {children}
    </Text>
  );
};

export default InterText;
