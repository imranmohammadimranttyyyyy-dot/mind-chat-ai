import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import HowToUse from "./pages/HowToUse";
import Settings from "./pages/Settings";
import ImageGen from "./pages/ImageGen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/image-gen" element={<ImageGen />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import React, { useState } from "react";
import "./App.css";
import { startVoiceConversation, speakText } from "./integrations/voice";

function App() {
  const [messages, setMessages] = useState<string[]>([]);

  async function handleVoice() {
    startVoiceConversation(async (userSpeech) => {
      setMessages((prev) => [...prev, "🗣️ You: " + userSpeech]);

      // Ab yahan tumhara AI backend call hoga (Supabase/OpenAI)
      // Filhaal demo ke liye:
      const aiReply = "Hello! You said: " + userSpeech;

      setMessages((prev) => [...prev, "🤖 AI: " + aiReply]);
      speakText(aiReply); // AI ka jawab awaaz mein
    });
  }

  return (
    <div className="App">
      <h1>🎤 Loveable AI Voice Chat</h1>
      <button onClick={handleVoice}>Start Talking</button>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;