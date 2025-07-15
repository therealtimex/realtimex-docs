import React from 'react';
import NextImage from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const CustomImage = (props) => {
  const src = props.src.startsWith('/') ? `${basePath}${props.src}` : props.src;

  if (props.unoptimized) {
    return <img {...props} src={src} />;
  }

  return <NextImage {...props} src={src} />;
};

export default CustomImage;