"use client";

import { useState } from "react";
import BuyButton from "./BuyButton";

interface BuySectionProps {
  productId: string;
  isDigital: boolean;
  mode?: "payment" | "subscription";
}

export default function BuySection({ productId, isDigital, mode = "payment" }: BuySectionProps) {
  const [consented, setConsented] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {isDigital && (
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-[#81ABAD] accent-[#81ABAD] cursor-pointer"
          />
          <span className="text-sm text-[#555555] leading-snug">
            Ich stimme zu, dass der Download sofort nach dem Kauf beginnt, und nehme zur Kenntnis,
            dass ich damit mein Widerrufsrecht verliere.
          </span>
        </label>
      )}
      <BuyButton
        productId={productId}
        mode={mode}
        disabled={isDigital && !consented}
      />
      {isDigital && (
        <p className="text-sm text-muted-foreground">
          Sofort nach dem Kauf zum Download verfügbar in deinem Konto
        </p>
      )}
    </div>
  );
}
