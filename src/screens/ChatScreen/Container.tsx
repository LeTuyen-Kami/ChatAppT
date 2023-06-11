import React from 'react';
import {GiftedChat, IChatMessage} from 'react-native-gifted-chat';
import {BASE_URL, WS_URL} from 'services/api';
import {Platform} from 'react-native';
import {GenericScreenProps} from 'navigation/AppNavigation';

const Container: React.FC<GenericScreenProps<'ChatScreen'>> = ({
  navigation,
  route,
}) => {
  const channelName = route.params?.channelName;
  const ws = React.useRef<WebSocket>();
  const isMounted = React.useRef(true);

  const [messages, setMessages] = React.useState([
    {
      _id: Platform.OS === 'ios' ? 1 : 2,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);

  const onSend = (mes: IChatMessage[]) => {
    ws.current?.send(JSON.stringify({...mes[0], channelName}));
    setMessages(previousMessages => GiftedChat.append(previousMessages, mes));
  };

  React.useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }
    ws.current = new WebSocket(WS_URL + `?${channelName}`);

    console.log('connecting');
    ws.current.onopen = () => {
      console.log('connected');
    };
    ws.current.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data?.action === 'init') {
        setMessages(data.messages);
        return;
      }
      console.log(e.data);
      setMessages(previousMessages => {
        const mes = JSON.parse(e.data);
        return GiftedChat.append(previousMessages, mes);
      });
    };
    ws.current.onerror = e => {
      console.log(e.message);
    };
    ws.current.onclose = e => {
      console.log(e.code, e.reason);
      if (!isMounted.current) return;
      ws.current = new WebSocket(WS_URL + `?${channelName}`);
    };

    return () => {
      isMounted.current = false;
      ws.current?.send(JSON.stringify({action: 'leave', channelName}));
      ws.current?.close();
    };
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{_id: Platform.OS === 'ios' ? 2 : 1}}
    />
  );
};

export default Container;
