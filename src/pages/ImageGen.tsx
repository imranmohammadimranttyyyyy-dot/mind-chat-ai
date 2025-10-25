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