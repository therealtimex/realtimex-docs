import React from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';

const CustomImage = (props) => {
  const { basePath } = useRouter();
  const src = props.src.startsWith('/') ? `${basePath}${props.src}` : props.src;

  if (props.unoptimized) {
    // Use a standard img tag for unoptimized images
    return <img {...props} src={src} />;
  }

  return <NextImage {...props} src={src} />;
};

export default CustomImage;
