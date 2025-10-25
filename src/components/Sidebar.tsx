import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquarePlus,
  Settings,
  Menu,
  Sparkles,
  LogOut,
  User,
  Home,
  Info,
  HelpCircle,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SidebarProps {
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ onNewChat, isOpen, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useState(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const navItems = [
    { icon: Home, label: "Chat", path: "/" },
    { icon: Sparkles, label: "Image Generator", path: "/image-gen" },
    { icon: Info, label: "About", path: "/about" },
    { icon: HelpCircle, label: "How to Use", path: "/how-to-use" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-sidebar-background border-r border-sidebar-border z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-64 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sidebar-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-foreground">AI Chat</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onToggle();
            }}
            className="w-full justify-start gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90"
          >
            <MessageSquarePlus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-3">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => {
                if (window.innerWidth < 1024) onToggle();
              }}>
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <Separator className="my-3 bg-sidebar-border" />

          {/* Recent Chats - Placeholder */}
          <div className="py-3">
            <p className="text-xs text-muted-foreground px-3 mb-2">Recent Chats</p>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <MessageSquarePlus className="w-4 h-4 mr-2" />
                Chat from today
              </Button>
            </div>
          </div>
        </ScrollArea>

        {/* User Section */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <User className="w-4 h-4 text-sidebar-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.email || "User"}
              </p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
