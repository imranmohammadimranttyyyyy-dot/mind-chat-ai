interface AdSpaceProps {
  slot?: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  className?: string;
}

export const AdSpace = ({ slot = "ad-slot", format = "auto", className = "" }: AdSpaceProps) => {
  return (
    <div className={`ad-container my-4 flex items-center justify-center ${className}`}>
      <div 
        className="ad-placeholder bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 text-center"
        data-ad-slot={slot}
        data-ad-format={format}
      >
        <p className="text-xs text-muted-foreground font-medium">
          Advertisement Space
        </p>
        <p className="text-[10px] text-muted-foreground/60 mt-1">
          {slot}
        </p>
        {/* AdSense code will be inserted here */}
        {/* Example:
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format={format}></ins>
        */}
      </div>
    </div>
  );
};
