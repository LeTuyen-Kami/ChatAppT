import React from 'react';

import InterTextInput from 'src/components/InterTextInput';

const InputItem: React.FC<{
  placeholder: string;
}> = ({placeholder}) => {
  return <InterTextInput placeholder={placeholder} variant={'rounded'} />;
};

export default InputItem;
