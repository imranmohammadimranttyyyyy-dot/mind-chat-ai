import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { X, Mic } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { RealtimeChat } from "@/utils/RealtimeAudio";

interface VoiceConversationProps {
  onClose: () => void;
}

export const VoiceConversation = ({ onClose }: VoiceConversationProps) => {
  const [status, setStatus] = useState<string>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const chatRef = useRef<RealtimeChat | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    startConversation();
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  const startConversation = async () => {
    try {
      chatRef.current = new RealtimeChat(
        (message) => {
          // Handle different message types
          if (message.type === 'conversation.item.input_audio_transcription.completed') {
            setTranscript(prev => prev + '\n\nYou: ' + message.transcript);
          } else if (message.type === 'response.audio_transcript.delta') {
            setTranscript(prev => {
              const lines = prev.split('\n');
              const lastLine = lines[lines.length - 1];
              if (lastLine.startsWith('AI: ')) {
                lines[lines.length - 1] = lastLine + message.delta;
              } else {
                lines.push('AI: ' + message.delta);
              }
              return lines.join('\n');
            });
          }
        },
        (newStatus) => {
          setStatus(newStatus);
          if (newStatus === 'error') {
            toast({
              title: "Connection Error",
              description: "Failed to connect to voice service",
              variant: "destructive",
            });
          }
        }
      );
      
      await chatRef.current.init();
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to start conversation',
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    chatRef.current?.disconnect();
    onClose();
  };

  const getStatusText = () => {
    switch (status) {
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return 'Listening...';
      case 'listening':
        return 'You are speaking';
      case 'speaking':
        return 'AI is speaking';
      default:
        return 'Ready';
    }
  };

  const isActive = status === 'listening' || status === 'speaking';

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Voice Chat</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Animated Circle */}
          <div className="relative">
            {/* Outer pulse rings */}
            {isActive && (
              <>
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" 
                     style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" 
                     style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              </>
            )}
            
            {/* Main circle */}
            <div className={`
              relative w-48 h-48 rounded-full flex items-center justify-center
              transition-all duration-300
              ${isActive 
                ? 'bg-gradient-to-br from-primary to-primary-glow shadow-2xl scale-110' 
                : 'bg-gradient-to-br from-primary/50 to-primary-glow/50 shadow-xl'
              }
            `}>
              <Mic className={`
                w-20 h-20 text-primary-foreground
                transition-transform duration-300
                ${isActive ? 'scale-110' : 'scale-100'}
              `} />
            </div>
          </div>

          {/* Status Text */}
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-2">
              {getStatusText()}
            </p>
            <p className="text-sm text-muted-foreground">
              {status === 'connecting' 
                ? 'Setting up connection...'
                : status === 'connected'
                ? 'Start speaking anytime'
                : status === 'listening'
                ? 'We can hear you...'
                : 'AI is responding...'
              }
            </p>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="w-full max-h-48 overflow-y-auto bg-card rounded-lg p-4 border border-border">
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {transcript}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
