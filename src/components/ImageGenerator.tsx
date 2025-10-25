import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Download, Link2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageGeneratorProps {
  onImageGenerated?: (imageUrl: string, prompt: string) => void;
}

export const ImageGenerator = ({ onImageGenerated }: ImageGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for the image",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt, enhancePrompt: true }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Rate Limited",
            description: "Too many requests. Please try again later.",
            variant: "destructive",
          });
          return;
        }
        if (response.status === 402) {
          toast({
            title: "Credits Exhausted",
            description: "Please add AI credits to continue.",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
      
      if (onImageGenerated) {
        onImageGenerated(data.imageUrl, prompt);
      }

      toast({
        title: "Success",
        description: "Image generated successfully!",
      });
    } catch (error) {
      console.error("Image generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `ai-generated-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyImageUrl = () => {
    if (!imageUrl) return;
    
    navigator.clipboard.writeText(imageUrl);
    toast({
      title: "Copied!",
      description: "Image URL copied to clipboard",
    });
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Image Generator</h2>
          <p className="text-sm text-muted-foreground">Create stunning images from text descriptions</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-sm font-medium">
            Image Description
          </Label>
          <Textarea
            id="prompt"
            placeholder="Example: A futuristic city at sunset with flying cars, neon lights, cyberpunk style..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] resize-none"
            disabled={isGenerating}
          />
          <p className="text-xs text-muted-foreground">
            Be detailed and specific for better results. Mention style, mood, colors, and composition.
          </p>
        </div>

        <Button
          onClick={generateImage}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Image
            </>
          )}
        </Button>
      </div>

      {imageUrl && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="relative group">
            <img
              src={imageUrl}
              alt="Generated image"
              className="w-full rounded-lg shadow-2xl border border-border"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={downloadImage}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={copyImageUrl}
              >
                <Link2 className="w-4 h-4 mr-2" />
                Copy URL
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-sm font-medium">
              Image URL
            </Label>
            <div className="flex gap-2">
              <Input
                id="imageUrl"
                value={imageUrl}
                readOnly
                className="flex-1 text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyImageUrl}
              >
                <Link2 className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use this URL to share or embed your generated image
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Example Styles</p>
          <div className="flex flex-wrap gap-1">
            {["Photorealistic", "Digital Art", "Oil Painting", "Anime"].map((style) => (
              <button
                key={style}
                onClick={() => setPrompt(prompt + `, ${style.toLowerCase()} style`)}
                className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/70 transition-colors"
              >
                {style}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Add Details</p>
          <div className="flex flex-wrap gap-1">
            {["4K quality", "Cinematic", "Vibrant colors", "Dramatic lighting"].map((detail) => (
              <button
                key={detail}
                onClick={() => setPrompt(prompt + `, ${detail.toLowerCase()}`)}
                className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/70 transition-colors"
              >
                {detail}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};