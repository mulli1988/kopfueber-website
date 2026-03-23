"use client";

export default function DownloadButton({ productId }: { productId: string }) {
  return (
    <a
      href={`/api/downloads/${productId}`}
      download
      className="inline-block bg-[#81ABAD] text-white font-bold text-sm px-5 py-2.5 rounded-2xl hover:bg-[#5D8F91] transition-colors no-underline"
    >
      ↓ Herunterladen
    </a>
  );
}
