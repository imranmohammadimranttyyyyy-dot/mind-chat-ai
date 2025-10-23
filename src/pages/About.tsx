import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Zap, Shield, ArrowLeft } from "lucide-react";

const About = () => {
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
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              About AI Chat
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 shadow-xl mx-auto">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to AI Chat Assistant
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your intelligent conversation partner powered by advanced artificial intelligence. 
              Get instant answers, creative ideas, technical help, and engaging conversations anytime.
            </p>
          </section>

          {/* What is AI Chat */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">What is AI Chat?</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                AI Chat is an advanced conversational AI assistant designed to help you with a wide variety of tasks. 
                Whether you need help with homework, want to brainstorm ideas, need coding assistance, or just want 
                to have an interesting conversation, our AI is here to assist you 24/7.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Built on cutting-edge language models, AI Chat understands context, maintains conversation flow, 
                and provides thoughtful, accurate responses. It's like having a knowledgeable friend who's always 
                ready to help, never gets tired, and can discuss virtually any topic.
              </p>
            </div>
          </section>

          {/* Key Features */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-6 space-y-3 bg-card/50">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">Advanced Intelligence</h4>
                <p className="text-muted-foreground">
                  Powered by state-of-the-art AI models trained on diverse knowledge. Understands complex 
                  questions and provides detailed, accurate answers across multiple domains.
                </p>
              </div>

              <div className="border border-border rounded-lg p-6 space-y-3 bg-card/50">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">Real-time Responses</h4>
                <p className="text-muted-foreground">
                  Get instant answers as the AI generates responses in real-time. Watch your answers 
                  appear word-by-word with our advanced streaming technology.
                </p>
              </div>

              <div className="border border-border rounded-lg p-6 space-y-3 bg-card/50">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">Safe & Secure</h4>
                <p className="text-muted-foreground">
                  Your conversations are processed securely. We prioritize your privacy and ensure 
                  safe interactions with built-in content filtering and safety measures.
                </p>
              </div>

              <div className="border border-border rounded-lg p-6 space-y-3 bg-card/50">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">Versatile & Creative</h4>
                <p className="text-muted-foreground">
                  From writing stories to solving math problems, from recipe suggestions to coding help - 
                  the AI adapts to your needs and provides creative, helpful solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">What Can You Do?</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-6 py-2">
                <h4 className="font-semibold text-lg mb-2">Learning & Education</h4>
                <p className="text-muted-foreground">
                  Get explanations of complex topics, homework help, study tips, and learn new skills 
                  through interactive conversations.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-6 py-2">
                <h4 className="font-semibold text-lg mb-2">Creative Writing</h4>
                <p className="text-muted-foreground">
                  Generate stories, poems, essays, social media content, or get help with creative projects 
                  and brainstorming ideas.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-6 py-2">
                <h4 className="font-semibold text-lg mb-2">Programming & Tech</h4>
                <p className="text-muted-foreground">
                  Debug code, learn programming concepts, get algorithm explanations, and solve technical 
                  challenges across multiple languages.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-6 py-2">
                <h4 className="font-semibold text-lg mb-2">Daily Assistance</h4>
                <p className="text-muted-foreground">
                  Plan trips, get recipe ideas, advice on various topics, language translation, and general 
                  life questions answered promptly.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">How It Works</h3>
            <div className="bg-card/50 border border-border rounded-lg p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Type Your Question</h4>
                  <p className="text-muted-foreground">
                    Simply type what you want to know or discuss in the chat box. Be as detailed or brief as you like.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">AI Processes</h4>
                  <p className="text-muted-foreground">
                    Our advanced AI analyzes your message, understands the context, and generates a thoughtful response.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Get Instant Answer</h4>
                  <p className="text-muted-foreground">
                    Receive a detailed, accurate response in real-time. Continue the conversation to dive deeper or ask follow-up questions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 py-12">
            <h3 className="text-3xl font-bold">Ready to Start?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who are already experiencing the power of AI-assisted conversations. 
              Start chatting now and discover what AI Chat can do for you.
            </p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Start Chatting Now
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

export default About;
