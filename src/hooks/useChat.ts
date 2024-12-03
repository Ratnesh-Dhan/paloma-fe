import axios from 'axios'
import { useEffect, useState } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}
//this is a hook that will be used to manage the chat

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [uuid, setUuid] = useState(generateUUID());

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
  useEffect(() => {
  return () => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      headers: {
        'x-chat-uuid': uuid
      }
    }).then(() => console.log('Chat deleted'));
  } 
  }, []);

  const newChat = async() => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      headers: {
        'x-chat-uuid': uuid
      }
    });
    if (response.status === 200) {  
    console.log('Chat deleted');
    setUuid(generateUUID());
    setMessages([]);
  }else{
    console.log('Chat not deleted');
  }
  }

  const chatSubmit = async(value: string) => {
    const msgs: Message[] = [...messages, {role: 'user', content: value}];
    setMessages(msgs);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        //   messages: messages.map(m => m.content),
      query: value,
    }, {
      headers: {
        'x-chat-uuid': uuid
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { options, ...message} = response.data.message;
    console.log(message);
    setMessages([...msgs, message]);
    return true;
  }

  return {messages, chatSubmit, newChat}
}

export default useChat