import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import HowToUse from "./pages/HowToUse";
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import React, { useState } from "react";

function getBotResponse(message: string): string {
  const text = message.toLowerCase();

  if (text.includes("tumhe kisne banaya") || text.includes("who made you")) {
    return "Mujhe Chat AI ne banaya hai 🤖";
  }

  if (text.includes("uska naam kya hai") || text.includes("creator name")) {
    return "Uska naam Imran hai 💻";
  }

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello! Kaise ho?";
  }

  // 👇 yahan par “Mujhe samajh nahi aaya” hata diya gaya hai
  // aur ek simple, polite response daal diya gaya hai
  return "Hmm... interesting 😊";
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getBotResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-4 w-96 h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 m-1 rounded-lg ${
                m.sender === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border p-2 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
import Chat from "./pages/Chat";

<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/auth" element={<Auth />} />
  <Route path="/about" element={<About />} />
  <Route path="/how-to-use" element={<HowToUse />} />
  <Route path="/chat" element={<Chat />} />
  <Route path="*" element={<NotFound />} />
</Routes>