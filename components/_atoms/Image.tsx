import React, { memo } from 'react';
import NextImage, { ImageProps, ImageLoader, ImageLoaderProps } from 'next/image';

const skipCloudinaryProxy = (src: string): boolean =>
  src.includes('res.cloudinary.com') || src.includes('.svg') || src.includes('commercecloud.salesforce.com');

const customLoader: ImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (skipCloudinaryProxy(src)) return src;
  return `https://res.cloudinary.com/uniformdev/image/fetch/f_auto,c_limit,w_${width},q_${quality || 75}/${
    // append https if image from contentful starts from double slashes
    src.includes('http') ? src : `https:${src}`
  }`;
};

const Image: React.FC<Omit<ImageProps, 'width' | 'height'> & { width?: any; height?: any }> = ({
  src,
  ...restProps
}) => <NextImage src={src} {...restProps} loader={!String(src).includes('//') ? undefined : customLoader} />;

export default memo(Image);
