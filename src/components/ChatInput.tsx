import { useState, KeyboardEvent } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceTranscription = (text: string) => {
    setInput(text);
  };

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-2 sm:p-4 sticky bottom-0">
      <div className="max-w-4xl mx-auto flex gap-2 sm:gap-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message or use voice..."
          className="min-h-[50px] sm:min-h-[60px] max-h-[200px] resize-none bg-background border-border text-sm sm:text-base"
          disabled={disabled}
        />
        <VoiceRecorder 
          onTranscription={handleVoiceTranscription}
          disabled={disabled}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="h-[50px] sm:h-[60px] px-3 sm:px-6 bg-primary hover:bg-primary/90 flex-shrink-0"
        >
          {disabled ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </div>
      <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-1 sm:mt-2">
        Powered by advanced AI • <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line, or use voice input</span>
      </p>
    </div>
  );
};