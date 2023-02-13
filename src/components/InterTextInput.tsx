import React from 'react';

import {Input, IInputProps} from 'native-base';
const InterTextInput: React.FC<IInputProps> = ({...props}) => {
  return <Input fontFamily={'Inter'} {...props} />;
};

export default InterTextInput;
