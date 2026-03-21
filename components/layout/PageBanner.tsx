import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function PageBanner({ src, alt }: Props) {
  return (
    <div className="bg-white">
      <Image
        src={src}
        alt={alt}
        width={3000}
        height={750}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
