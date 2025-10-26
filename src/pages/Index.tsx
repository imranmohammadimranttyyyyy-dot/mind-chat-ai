import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { useChat } from "@/hooks/useChat";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import ThinkingDots from "@/components/thinkingdots";

const Index = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        onNewChat={clearChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">AI Chat</span>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto pb-4">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
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
                brainstorm ideas, generate images, or just have a conversation.
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
                  onClick={() => sendMessage("Generate an image of a futuristic city at sunset with flying cars")}
                >
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Generate Images</div>
                    <div className="text-xs text-muted-foreground">Create stunning AI-generated visuals</div>
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
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                  imageUrl={message.imageUrl}
                />
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 py-8 px-4 bg-muted/20">
                  <div className="max-w-4xl mx-auto w-full flex gap-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Thinking</span>
                        <ThinkingDots />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          </div>
        </main>

        {/* Input */}
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Index;
