import * as React from 'react';

export function useLoaded({
  crossOrigin,
  referrerPolicy,
  src,
  srcSet,
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  crossOrigin?: any;
  referrerPolicy?: any;
  src?: string;
  srcSet?: string;
}) {
  const [loaded, setLoaded] = React.useState<string | boolean>(false);

  React.useEffect(() => {
    if (!src && !srcSet) {
      return;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();

    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded('error');
    };
    image.crossOrigin = crossOrigin;
    image.referrerPolicy = referrerPolicy;
    image.src = src as string;

    if (srcSet) {
      image.srcset = srcSet;
    }

    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);

  return loaded;
}
