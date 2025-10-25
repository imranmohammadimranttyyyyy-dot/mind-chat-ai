import { Bot, User, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
}

export const ChatMessage = ({ role, content, imageUrl }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 py-8 px-4 hover:bg-muted/30 transition-colors ${isUser ? "bg-background" : "bg-muted/20"}`}>
      <div className="max-w-4xl mx-auto w-full flex gap-6">
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        
        <div className={`flex-1 space-y-3 ${isUser ? "ml-10" : ""}`}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {isUser ? "You" : "AI Assistant"}
            </span>
          </div>
          
          <div className={`${
            isUser 
              ? "text-foreground" 
              : "text-foreground"
          }`}>
          {isUser ? (
            <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
          ) : (
            <>
              {imageUrl && (
                <div className="mb-4">
                  <img 
                    src={imageUrl} 
                    alt="Generated image" 
                    className="rounded-lg shadow-lg max-w-full h-auto border border-border"
                  />
                </div>
              )}
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      return inline ? (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      ) : (
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <code className="text-sm font-mono" {...props}>
                            {children}
                          </code>
                        </pre>
                      );
                    },
                    p({ children }) {
                      return <p className="mb-4 last:mb-0">{children}</p>;
                    },
                    ul({ children }) {
                      return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
                    },
                    ol({ children }) {
                      return <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
                    },
                    h1({ children }) {
                      return <h1 className="text-2xl font-bold mb-4">{children}</h1>;
                    },
                    h2({ children }) {
                      return <h2 className="text-xl font-bold mb-3">{children}</h2>;
                    },
                    h3({ children }) {
                      return <h3 className="text-lg font-bold mb-2">{children}</h3>;
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </>
          )}
        </div>
        
        {!isUser && (
          <div className="flex gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        )}
        </div>

        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};
import React from "react";
import ThinkingDots from "./ThinkingDots";

const ChatMessage: React.FC<{ isAI?: boolean; message?: string; typing?: boolean }> = ({ isAI, message, typing }) => {
  return (
    <div className={`chat-message ${isAI ? "ai" : "user"}`}>
      {typing && isAI ? <ThinkingDots /> : <p>{message}</p>}
    </div>
  );
};

export default ChatMessage;
import ThinkingDots from "./ThinkingDots";
<div className="chat-message">
  {typing && isAI ? <ThinkingDots /> : <p>{message}</p>}
</div>
<ChatMessage
  isAI={true}       // ye bata raha hai ye AI message hai
  typing={aiTyping} // true ho to dots dikhenge
  message={aiMessage}
/>