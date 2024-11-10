'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import React from 'react';

function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/conversation',
  });

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    handleSubmit(ev);
  };

  return (
    <>
      <ScrollArea className="mt-4 h-[300px] rounded-md border p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'my-2 whitespace-pre-wrap',
              message.role === 'assistant' && 'rounded-lg bg-accent p-2',
            )}
          >
            <strong className={cn(message.role === 'assistant' && 'text-blue-400')}>
              {message.role === 'user' ? 'You: ' : 'AI: '}
            </strong>
            {message.content}
          </div>
        ))}
      </ScrollArea>
      <div className="mt-2 space-y-2">
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <Input
            disabled={isLoading}
            placeholder="Type your message here..."
            value={input}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </>
  );
}

export default Chat;
