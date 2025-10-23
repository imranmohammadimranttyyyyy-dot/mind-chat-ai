import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { AdSpace } from "@/components/AdSpace";
import { useChat } from "@/hooks/useChat";
import { Sparkles, Trash2, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AI Chat Assistant
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Advanced Intelligence • Real-time Responses</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="gap-1 sm:gap-2 px-2 sm:px-3"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Clear Chat</span>
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="px-2 sm:px-3">
                  <Menu className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/how-to-use">How to Use</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Top Banner Ad */}
      <AdSpace slot="top-banner" format="horizontal" className="max-w-4xl mx-auto w-full" />

      {/* Messages */}
      <main className="flex-1 overflow-y-auto pb-4">
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 shadow-xl">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Welcome to AI Chat
              </h2>
              <p className="text-muted-foreground text-center max-w-md mb-8">
                Your intelligent assistant is ready to help with anything. Ask questions, get advice, 
                brainstorm ideas, or just have a conversation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start text-left"
                  onClick={() => sendMessage("Explain quantum computing in simple terms")}
                >
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Explain quantum computing</div>
                    <div className="text-xs text-muted-foreground">Learn complex topics simplified</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start text-left"
                  onClick={() => sendMessage("Help me plan a 7-day trip to Japan")}
                >
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Plan a trip to Japan</div>
                    <div className="text-xs text-muted-foreground">Get travel recommendations</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start text-left"
                  onClick={() => sendMessage("Write a creative story about a robot learning emotions")}
                >
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Creative writing</div>
                    <div className="text-xs text-muted-foreground">Generate stories and content</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start text-left"
                  onClick={() => sendMessage("Help me debug this Python code: [paste your code]")}
                >
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Code assistance</div>
                    <div className="text-xs text-muted-foreground">Debug and optimize code</div>
                  </div>
                </Button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {messages.map((message, index) => (
                <>
                  <ChatMessage
                    key={index}
                    role={message.role}
                    content={message.content}
                  />
                  {/* Ad after every 3 messages */}
                  {(index + 1) % 3 === 0 && index !== messages.length - 1 && (
                    <AdSpace slot={`inline-ad-${Math.floor(index / 3)}`} format="auto" />
                  )}
                </>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-4 py-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <span className="text-sm font-semibold text-foreground">AI Assistant</span>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Bottom Ad before input */}
      <AdSpace slot="bottom-banner" format="horizontal" className="max-w-4xl mx-auto w-full" />

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;
