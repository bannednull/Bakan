'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
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
          <div className="relative w-full">
            <Input
              disabled={isLoading}
              placeholder="Type your message here..."
              value={input}
              onChange={handleInputChange}
            />
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Subscribe"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Chat;
