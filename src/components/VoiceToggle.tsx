import { Button } from "./ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface VoiceToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const VoiceToggle = ({ enabled, onToggle }: VoiceToggleProps) => {
  const { toast } = useToast();

  const handleToggle = () => {
    onToggle();
    toast({
      title: enabled ? "Voice disabled" : "Voice enabled",
      description: enabled 
        ? "AI responses will not be spoken" 
        : "AI responses will be spoken automatically",
    });
  };

  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size="icon"
      className="flex-shrink-0"
      title={enabled ? "Disable voice responses" : "Enable voice responses"}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </Button>
  );
};
