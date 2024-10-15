import { useState, useEffect } from "react";
import { Button } from "antd"; // Assuming you're using Ant Design for the Button component

interface ImageWithSkeletonProps {
  photoURL?: string;
  showLoading: () => void;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  photoURL,
  showLoading,
}) => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the background image using an invisible img tag
  useEffect(() => {
    if (photoURL) {
      const img = new Image();
      img.src = photoURL;
      img.onload = () => {
        setImageLoaded(true);
        setLoading(false);
      };
    } else {
      // Handle case when photoURL is undefined
      setLoading(false); // Stop loading if there's no image
    }
  }, [photoURL]);

  return (
    <div className="relative group w-full h-[350px]">
      {/* Skeleton effect shown when the image is loading */}
      {loading && (
        <div className="absolute inset-0 bg-slate-300 animate-pulse" />
      )}

      {/* Image container */}
      <div
        style={{ backgroundImage: imageLoaded ? `url("${photoURL}")` : "none" }}
        className={`w-full h-full bg-no-repeat bg-cover bg-slate-300 transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Button to show on hover */}
      <Button
        onClick={showLoading}
        className="rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0 w-full bg-main bg-opacity-100 text-white flex items-center justify-center"
      >
        Choose Options
      </Button>
    </div>
  );
};

export default ImageWithSkeleton;
