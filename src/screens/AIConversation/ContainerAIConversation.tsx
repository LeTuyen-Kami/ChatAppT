import React from 'react';

import {Box, Button, ScrollView, Text} from 'native-base';
import InterTextInput from 'components/InterTextInput';
import {GenericScreenProps} from 'navigation/AppNavigation';
import {createCompletion} from 'services/Openai';
import ChatItem from 'screens/AIConversation/ChatItem';

const ContainerAIConversation: React.FC<
  GenericScreenProps<'AIConversation'>
> = ({navigation}) => {
  const [listConversation, setListConversation] = React.useState<
    {
      yourMessage: string;
      botMessage: string;
    }[]
  >([]);
  const [text, setText] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const scrollRef = React.useRef<typeof ScrollView>(null);

  const onPressSend = () => {
    setIsLoading(true);
    // createCompletion({
    //   max_tokens: 300,
    //   model: 'text-davinci-003',
    //   prompt: text,
    //   temperature: 0.5,
    //   stream: false,
    // })
    //   .then(res => {
    //     setListConversation([
    //       ...listConversation,
    //       {
    //         yourMessage: text,
    //         botMessage: res.data.choices[0].text,
    //       },
    //     ]);
    //     setText('');
    //     setIsLoading(false);
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //     setIsLoading(false);
    //   });
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        prompt: text,
        max_tokens: 300,
        temperature: 0.5,
        model: 'text-davinci-003',
      }),
    })
      .then(res => {
        console.log('res', res);
        return res.json();
      })
      .then(res => {
        console.log('res', res);
        setListConversation([
          ...listConversation,
          {
            yourMessage: text,
            botMessage: res.choices[0].text,
          },
        ]);
        setText('');
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box flex={1}>
      <InterTextInput
        value={text}
        onChangeText={setText}
        placeholder={'Nhập câu hỏi'}
      />
      <Button isLoading={isLoading} onPress={onPressSend}>
        <Text>Send</Text>
      </Button>
      <ScrollView ref={scrollRef}>
        {listConversation.map((item, index) => {
          return (
            <Box key={index}>
              <ChatItem isUser={true} message={item.yourMessage} />
              <ChatItem isUser={false} message={item.botMessage} />
            </Box>
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default ContainerAIConversation;
