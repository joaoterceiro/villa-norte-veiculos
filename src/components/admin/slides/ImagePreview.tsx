import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  url?: string;
  className?: string;
  alt?: string;
}

export function ImagePreview({ url, className, alt }: ImagePreviewProps) {
  if (!url) return null;

  return (
    <div className={cn("mt-2 relative rounded-lg overflow-hidden", className)}>
      <img 
        src={url} 
        alt={alt || "Preview"} 
        className="w-full h-32 object-cover"
      />
    </div>
  );
}