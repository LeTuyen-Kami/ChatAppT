import React from 'react';

import {Box, ScrollView} from 'native-base';
import {GenericScreenProps} from 'navigation/AppNavigation';
import {createCompletion} from 'services/Openai';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import InterText from 'components/InterText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {atomWithMMKV} from 'src/database';
import {useAtom} from 'jotai';
import TypingAnimation from 'components/TypingAnimation';

type message = {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
};

const listConversationDb = atomWithMMKV<message[]>('listConversation', []);

const addContextToPrompt = (prompt: string, previousMessages: message[]) => {
  let context =
    'The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. \n\n';
  //get the last 5 messages
  const lastMessages = previousMessages.slice(0, 5);
  //add the last 5 messages to the context
  for (let i = lastMessages.length - 1; i >= 0; i--) {
    context += lastMessages[i].user.name + ': ' + lastMessages[i].text + '\n';
  }
  return context + `Human: ${prompt} \nAI: `;
};

const ContainerAIConversation: React.FC<
  GenericScreenProps<'AIConversation'>
> = ({navigation}) => {
  // const [listConversation, setListConversation] = React.useState<message[]>([]);
  const [listConversation, setListConversation] = useAtom(listConversationDb);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSend = React.useCallback(
    (messages: any = []) => {
      setListConversation((previousMessages: message[]) => [
        ...messages,
        ...previousMessages,
      ]);
      setIsLoading(true);
      createCompletion({
        max_tokens: 300,
        model: 'text-davinci-003',
        prompt: addContextToPrompt(messages[0].text, listConversation),
        temperature: 0.9,
        stream: false,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        best_of: 1,
        // stop: ['\n', '.'],
      })
        .then(res => {
          setListConversation(prevConversation => [
            {
              _id: res.data.id,
              text: res.data.choices[0].text?.trim(),
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'AI',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
            ...prevConversation,
          ]);
          setIsLoading(false);
        })
        .catch(err => {
          console.log('err', err);
          setIsLoading(false);
        });
    },
    [listConversation],
  );

  return (
    <GiftedChat
      messages={listConversation}
      wrapInSafeArea={false}
      onSend={onSend}
      renderChatEmpty={() => {
        return (
          <Box
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
            style={{
              transform: [
                {
                  rotate: '180deg',
                },
              ],
            }}
            backgroundColor={'white'}>
            <MaterialCommunityIcons name={'chat'} size={100} color={'gray'} />
            <InterText
              fontSize={20}
              color={'gray'}
              style={{
                transform: [
                  {
                    rotateY: '180deg',
                  },
                ],
              }}>
              Hãy bắt đầu cuộc trò chuyện với AI
            </InterText>
          </Box>
        );
      }}
      user={{
        _id: 1,
        name: 'Human',
      }}
      maxInputLength={200}
      textInputProps={{
        placeholder: 'Nhập câu hỏi của bạn...',
        fontFamily: 'Inter',
        fontSize: 16,
        paddingTop: 10,
      }}
      renderSend={props => {
        return (
          <Send
            {...props}
            containerStyle={{
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons name={'send'} size={30} color={'blue'} />
          </Send>
        );
      }}
      renderFooter={() => {
        if (isLoading) {
          return (
            <Box marginLeft={3}>
              <TypingAnimation text={'Đang tìm kiếm câu trả lời'} />
            </Box>
          );
        } else {
          return null;
        }
      }}
    />
  );
};

export default ContainerAIConversation;
