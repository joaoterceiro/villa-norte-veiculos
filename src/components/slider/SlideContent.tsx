import { Link } from "react-router-dom";
import { SlideImage } from "./SlideImage";

interface SlideContentProps {
  imageUrl: string;
  link?: string | null;
  index: number;
}

export const SlideContent = ({ imageUrl, link, index }: SlideContentProps) => {
  const content = (
    <div 
      className="relative w-full h-full flex-shrink-0"
      style={{ flex: '0 0 100%' }}
    >
      <SlideImage 
        src={imageUrl} 
        loading={index === 0 ? "eager" : "lazy"} 
      />
    </div>
  );

  if (link) {
    return (
      <Link key={index} to={link} className="block h-full">
        {content}
      </Link>
    );
  }

  return <div key={index} className="block h-full">{content}</div>;
};

SlideContent.displayName = "SlideContent";