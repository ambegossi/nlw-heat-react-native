import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { Message, MessageProps } from '../Message';

import { api } from '../../services/api';

import { styles } from './styles';

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3');

      setCurrentMessages(messagesResponse.data);
    }

    fetchMessages();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map(message => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
}
