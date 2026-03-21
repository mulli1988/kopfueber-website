export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/db/mongodb";
import Review from "@/lib/db/models/Review";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ReviewActions from "@/components/admin/ReviewActions";

export const metadata = { title: "Admin — Bewertungen" };

export default async function AdminReviewsPage() {
  await connectToDatabase();
  const reviews = await Review.find().sort({ createdAt: -1 }).lean();

  const pending  = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <div>
      <h1 className="font-display text-4xl font-black mb-8">Bewertungen</h1>

      {/* Ausstehend */}
      <h2 className="font-display text-xl font-bold mb-3">
        Ausstehend
        {pending.length > 0 && (
          <span className="ml-2 bg-[#924d44] text-white text-xs font-bold px-2 py-0.5 rounded-full">{pending.length}</span>
        )}
      </h2>
      {pending.length === 0 ? (
        <Card className="mb-8"><p className="text-muted-foreground">Keine ausstehenden Bewertungen.</p></Card>
      ) : (
        <div className="flex flex-col gap-3 mb-8">
          {pending.map((r) => (
            <Card key={r._id.toString()} className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{r.name}</p>
                  <span className="text-[#D4A855]">{"★".repeat(r.rating)}</span>
                  <Badge variant="muted">Neu</Badge>
                </div>
                <p className="text-sm text-muted-foreground">"{r.text}"</p>
              </div>
              <ReviewActions id={r._id.toString()} approved={false} />
            </Card>
          ))}
        </div>
      )}

      {/* Genehmigt */}
      <h2 className="font-display text-xl font-bold mb-3">Veröffentlicht ({approved.length})</h2>
      {approved.length === 0 ? (
        <Card><p className="text-muted-foreground">Noch keine genehmigten Bewertungen.</p></Card>
      ) : (
        <div className="flex flex-col gap-3">
          {approved.map((r) => (
            <Card key={r._id.toString()} className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{r.name}</p>
                  <span className="text-[#D4A855]">{"★".repeat(r.rating)}</span>
                  <Badge variant="secondary">Live</Badge>
                </div>
                <p className="text-sm text-muted-foreground">"{r.text}"</p>
              </div>
              <ReviewActions id={r._id.toString()} approved={true} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
