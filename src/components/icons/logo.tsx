import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => (
  <Image
    src="/mmobrowser-logo.png"
    alt=""
    width={512}
    height={512}
    className={className}
    unoptimized
    draggable={false}
  />
);
