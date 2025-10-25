import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Menu, ArrowLeft } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { ImageGenerator } from "@/components/ImageGenerator";

const ImageGen = () => {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar
        onNewChat={() => navigate("/")}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col flex-1">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="px-4 py-3 flex items-center justify-between max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Chat
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <ImageGenerator 
              onImageGenerated={(imageUrl, prompt) => {
                console.log("Image generated:", imageUrl, prompt);
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ImageGen;
import React, { useState } from "react";
import { generateImage } from "@/components/ImageGenerator";

export default function ImageGen() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl("");
    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">AI Image Generator</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your image..."
        className="w-full max-w-lg p-3 rounded-md bg-zinc-800 border border-zinc-700"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Thinking…" : "Generate"}
      </button>

      <div className="mt-6">
        {loading && (
          <p className="animate-pulse text-gray-400 text-sm mt-3">
            🤖 AI is thinking and generating your image...
          </p>
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Generated"
            className="mt-4 rounded-lg shadow-md border border-zinc-700"
          />
        )}
      </div>
    </div>
  );
}