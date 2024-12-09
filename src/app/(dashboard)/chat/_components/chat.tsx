'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { Lightbulb, Send } from 'lucide-react';
import React from 'react';

function Chat() {
  const { setInput, messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/conversation',
  });

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    handleSubmit(ev);
  };

  const suggestions = [
    'Write a blog post about digital marketing trend',
    'Create a social media caption for a product launch',
    'Generate an email newsletter template',
    'Write a creative product description',
  ];

  const handleSuggestion = (suggest: string) => {
    setInput(suggest);
  };

  return (
    <div>
      <ScrollArea className="mt-4 h-[400px] rounded-t-md border border-b-0 p-4">
        <h3 className="mb-4 flex items-center gap-2 text-xl">
          <Lightbulb className="stroke-yellow-400" /> Quick Suggestions
        </h3>

        <div className="mb-4 grid grid-cols-2 gap-2">
          {suggestions.map((suggestion) => (
            <div
              className="rounded-md border border-dashed p-2 px-4 text-sm hover:bg-accent/80"
              key={suggestion}
              onClick={() => handleSuggestion(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'my-2 whitespace-pre-wrap',
              message.role === 'assistant' && 'rounded-lg bg-accent p-4',
            )}
          >
            <strong className={cn(message.role === 'assistant' && 'text-blue-400')}>
              {message.role === 'user' ? 'You: ' : 'AI: '}
            </strong>
            {message.content}
          </div>
        ))}
      </ScrollArea>

      <div className="-mt-1 space-y-2">
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
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
