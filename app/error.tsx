"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-4">😵</p>
        <h2 className="font-display text-3xl font-black mb-2">Etwas ist schiefgelaufen</h2>
        <p className="text-muted-foreground mb-6">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-[var(--radius-md)] border-2 border-dark shadow-[var(--shadow-md)] hover:translate-y-[-2px] transition-all"
        >
          Nochmal versuchen
        </button>
      </div>
    </div>
  );
}
