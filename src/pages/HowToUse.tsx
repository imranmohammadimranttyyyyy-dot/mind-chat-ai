import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, MessageSquare, Keyboard, Lightbulb, CheckCircle } from "lucide-react";

const HowToUse = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Chat
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <Lightbulb className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              How to Use
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Hero */}
          <section className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Getting Started with AI Chat
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to make the most of your AI assistant with these simple guides and tips.
            </p>
          </section>

          {/* Quick Start Guide */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">Quick Start Guide</h3>
            <div className="space-y-6">
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xl font-semibold">1. Start a Conversation</h4>
                    <p className="text-muted-foreground">
                      Simply type your question or message in the text box at the bottom of the screen. 
                      You can ask anything - from simple questions to complex problems.
                    </p>
                    <div className="bg-background/50 border border-border rounded p-3 mt-2">
                      <p className="text-sm font-mono">Example: "What is artificial intelligence?"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Keyboard className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xl font-semibold">2. Send Your Message</h4>
                    <p className="text-muted-foreground">
                      Press Enter to send your message, or click the send button. If you need multiple lines, 
                      use Shift+Enter to create a new line without sending.
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                      <li><kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> - Send message</li>
                      <li><kbd className="px-2 py-1 bg-muted rounded text-xs">Shift</kbd> + <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> - New line</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xl font-semibold">3. Get Real-time Responses</h4>
                    <p className="text-muted-foreground">
                      Watch as the AI generates your answer in real-time. You'll see the response appearing 
                      word-by-word, making it feel like a natural conversation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xl font-semibold">4. Continue the Conversation</h4>
                    <p className="text-muted-foreground">
                      Ask follow-up questions, request clarifications, or explore new topics. The AI remembers 
                      the context of your conversation for a more natural experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips for Better Conversations */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">Tips for Better Conversations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-5 bg-card/50">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span> Be Specific
                </h4>
                <p className="text-sm text-muted-foreground">
                  The more details you provide, the better the AI can understand and help you. Instead of 
                  "Tell me about history", try "Explain the causes of World War II".
                </p>
              </div>

              <div className="border border-border rounded-lg p-5 bg-card/50">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span> Ask Follow-ups
                </h4>
                <p className="text-sm text-muted-foreground">
                  Don't hesitate to ask for clarifications or more details. The AI maintains conversation 
                  context and can elaborate on previous responses.
                </p>
              </div>

              <div className="border border-border rounded-lg p-5 bg-card/50">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span> Use Examples
                </h4>
                <p className="text-sm text-muted-foreground">
                  When asking for help with code, writing, or problems, include examples. This helps the 
                  AI provide more relevant and accurate assistance.
                </p>
              </div>

              <div className="border border-border rounded-lg p-5 bg-card/50">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span> Break Down Complex Tasks
                </h4>
                <p className="text-sm text-muted-foreground">
                  For complicated requests, break them into smaller questions. This leads to better, more 
                  focused responses that are easier to understand.
                </p>
              </div>
            </div>
          </section>

          {/* Example Prompts */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">Example Prompts to Try</h3>
            <div className="space-y-3">
              <div className="bg-background/50 border border-border rounded-lg p-4">
                <p className="font-semibold mb-1">Learning & Education</p>
                <p className="text-sm text-muted-foreground font-mono">
                  "Explain photosynthesis in simple terms with an example"
                </p>
              </div>

              <div className="bg-background/50 border border-border rounded-lg p-4">
                <p className="font-semibold mb-1">Creative Writing</p>
                <p className="text-sm text-muted-foreground font-mono">
                  "Write a short story about a time traveler who visits ancient Egypt"
                </p>
              </div>

              <div className="bg-background/50 border border-border rounded-lg p-4">
                <p className="font-semibold mb-1">Programming Help</p>
                <p className="text-sm text-muted-foreground font-mono">
                  "How do I sort an array in JavaScript? Show me examples"
                </p>
              </div>

              <div className="bg-background/50 border border-border rounded-lg p-4">
                <p className="font-semibold mb-1">Daily Assistance</p>
                <p className="text-sm text-muted-foreground font-mono">
                  "Suggest a 5-day workout plan for beginners at home"
                </p>
              </div>

              <div className="bg-background/50 border border-border rounded-lg p-4">
                <p className="font-semibold mb-1">Problem Solving</p>
                <p className="text-sm text-muted-foreground font-mono">
                  "Help me understand this math problem: [paste problem]"
                </p>
              </div>
            </div>
          </section>

          {/* Features to Know */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">Features You Should Know</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-card/50 border border-border rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">💬</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Clear Chat</h4>
                  <p className="text-sm text-muted-foreground">
                    Click the "Clear Chat" button in the header to start a fresh conversation anytime.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-card/50 border border-border rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">📋</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Copy Responses</h4>
                  <p className="text-sm text-muted-foreground">
                    Click the "Copy" button under any AI response to copy the text to your clipboard.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-card/50 border border-border rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Real-time Streaming</h4>
                  <p className="text-sm text-muted-foreground">
                    Responses appear in real-time as the AI generates them, making interactions feel instant and natural.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-card/50 border border-border rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">🎯</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Suggested Prompts</h4>
                  <p className="text-sm text-muted-foreground">
                    When starting a new chat, try the suggested prompt buttons for quick examples of what you can do.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 py-12">
            <h3 className="text-3xl font-bold">Ready to Chat?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Now that you know how to use AI Chat, start a conversation and experience the power of AI assistance!
            </p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Start Your First Chat
              </Button>
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AI Chat Assistant. Created by Imran. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link to="/how-to-use" className="hover:text-foreground transition-colors">
              How to Use
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowToUse;
