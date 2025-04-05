import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable?: boolean;
};

const ImageComponent = ({
  src,
  alt,
  className,
  isPreview,
  onContentChange,
  isEditable,
}: Props) => {
  return (
    <div className="relative group w-full h-full rounded-lg">
      <Image
        src={src}
        // src="https://cdn.pixabay.com/photo/2020/02/25/17/54/illustration-4879559_1280.png"
        width={isPreview ? 48 : 800}
        height={isPreview ? 48 : 800}
        alt={alt}
        className={`object-cover w-full h-full rounded-lg ${className}`}
      />

      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0 hidden group-hover:block"></div>
      )}
    </div>
  );
};

export default ImageComponent;
