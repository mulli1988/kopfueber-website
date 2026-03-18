import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-[8rem] font-black leading-none text-primary mb-4">
          404
        </p>
        <h2 className="font-display text-3xl font-black mb-3">
          Ups — diese Seite existiert nicht.
        </h2>
        <p className="text-muted-foreground mb-8">
          Die Seite wurde vielleicht gelöscht oder du hast dich vertippt.
        </p>
        <Link href="/">
          <Button size="lg">Zur Startseite →</Button>
        </Link>
      </div>
    </div>
  );
}
