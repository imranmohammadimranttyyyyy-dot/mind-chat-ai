import { Bot, User, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-4 py-6 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary" />
        </div>
      )}
      
      <div className={`flex-1 space-y-2 ${isUser ? "max-w-[80%]" : ""}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {isUser ? "You" : "AI Assistant"}
          </span>
        </div>
        
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? "bg-primary text-primary-foreground ml-auto" 
            : "bg-card border border-border"
        }`}>
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
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
          )}
        </div>
        
        {!isUser && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
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
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};
