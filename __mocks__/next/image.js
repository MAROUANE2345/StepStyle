import React from 'react';

/**
 * Mock for next/image to handle priority and optimization props.
 */
const MockImage = ({ src, alt, width, height, priority, fill, loading, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} {...props} />;
};

MockImage.displayName = 'NextImage';

export default MockImage;
