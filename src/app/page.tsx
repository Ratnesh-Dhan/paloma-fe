'use client'

import useChat from '@/hooks/useChat';
import {  useEffect, useState } from 'react'

type Document = {
  fileName: string,
  pageNumber: number,
}

export default function ChatPage() {
  // const { messages, input, handleInputChange, handleSubmit } = useChat()
  const { messages, chatSubmit } = useChat()
  const [documents, setDocuments] = useState<Document[]>([]);
  const [search, setSearch] = useState('');
  const [generatingResponse, setGeneratingResponse] = useState(false);


  useEffect(() => {
    const chatContainer = document.querySelector('#chat-box');
    if (chatContainer) {
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }
  }, [messages]); // This will trigger whenever messages changes


  const handleChatSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setGeneratingResponse(true);
    setSearch('');
    const files = await chatSubmit(search);

    setGeneratingResponse(false);
    // Simulating fetching relevant documents
    setDocuments([...files])
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] sm:h-[calc(100vh-80px)]">
      <div id="chat-box" className="scroll-smooth flex-grow overflow-auto mb-4 border border-neutral-200 rounded-lg p-2 sm:p-4 dark:border-neutral-800">
        {messages.map((m, index) => (
          <div key={index} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {m.content}
            </span>
          </div>
        ))}
        {generatingResponse && (
          <div className="mb-4 text-left text-slate-600">
            <span className="inline-block p-2 rounded-lg">
              Generating response...
            </span>
          </div>
        )}
      </div>
      <form onSubmit={handleChatSubmit} className="flex flex-col sm:flex-row mb-4">
        <input
          className="flex-grow border border-neutral-200 rounded-lg sm:rounded-r-none p-2 mb-2 sm:mb-0 dark:border-neutral-800"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg sm:rounded-l-none disabled:bg-blue-200" disabled={generatingResponse}>  
          Send
        </button>
      </form>
      {documents.length > 0 && (
        <div className="border rounded-lg p-2 sm:p-4">
          <h2 className="text-lg font-semibold mb-2">Relevant Documents</h2>
          <ul>
            {documents.map((doc, index) => (
              <li key={index} className="mb-1">{doc.fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
