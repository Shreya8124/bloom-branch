import { useEffect, useState } from "react";
import fallback from "@/assets/herbs-flatlay.jpg";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | null;
  fallbackSrc?: string;
};

export function SafeImage({ src, fallbackSrc = fallback, alt = "", onError, ...rest }: Props) {
  const initial = src && src.length > 0 ? src : fallbackSrc;
  const [current, setCurrent] = useState<string>(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setCurrent(src && src.length > 0 ? src : fallbackSrc); setLoaded(false); }, [src, fallbackSrc]);
  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        // eslint-disable-next-line no-console
        console.warn("[SafeImage] failed to load:", src);
        if (current !== fallbackSrc) setCurrent(fallbackSrc);
        onError?.(e);
      }}
      data-loaded={loaded}
      style={{ backgroundColor: loaded ? undefined : "hsl(var(--muted))", ...rest.style }}
    />
  );
}
