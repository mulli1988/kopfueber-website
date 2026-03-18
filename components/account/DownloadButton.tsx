"use client";

import Button from "@/components/ui/Button";

export default function DownloadButton({ productId }: { productId: string }) {
  return (
    <a href={`/api/downloads/${productId}`} download>
      <Button variant="secondary" size="sm">
        ↓ Herunterladen
      </Button>
    </a>
  );
}
