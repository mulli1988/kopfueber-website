export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/db/mongodb";
import Review from "@/lib/db/models/Review";
import ReviewForm from "@/components/home/ReviewForm";

export const metadata = {
  title: "Bewertungen",
  description: "Was Erzieherinnen und Eltern über Kopfüber sagen.",
};

const ETSY_REVIEWS = [
  { _id: "e1", name: "Nancy",   rating: 5, text: "Ich bin begeistert. Artikel stand sofort zur Verfügung. Eine tolle Möglichkeit um den Morgenkreis zu visualisieren. Die Kinder haben es super angenommen und ich kann es sehr empfehlen." },
  { _id: "e2", name: "Lena",    rating: 5, text: "Super Aushänge — hab ich für die Eltern in der Krippe hängen." },
  { _id: "e3", name: "Franzi",  rating: 5, text: "Sehr schöne Vorlagen. Genau das passende was gesucht wurde." },
  { _id: "e4", name: "Aneta",   rating: 5, text: "Alles bestens. Schöne Sprüche und sehr geeignet für die Kita." },
  { _id: "e5", name: "Sabrina", rating: 5, text: "Richtig tolle und ansprechende Illustrationen." },
];

export default async function BewertungenPage() {
  await connectToDatabase();
  const dbReviews = await Review.find({ approved: true }).sort({ createdAt: -1 }).lean();

  const allReviews = [
    ...dbReviews.map((r) => ({ _id: r._id.toString(), name: r.name, rating: r.rating, text: r.text })),
    ...ETSY_REVIEWS,
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-2">Kundenstimmen</p>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#924d44] mb-2">
          Das sagen andere über Kopfüber
        </h1>
        <p className="text-[#555555]">{allReviews.length} Bewertungen von Erzieherinnen & Eltern</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {allReviews.map((r) => (
          <div key={r._id} className="bg-[#FFF5F2] rounded-3xl border-2 border-[#F0DDD8] p-6 flex flex-col gap-3">
            <p className="text-xs font-bold text-[#D4A855] uppercase tracking-widest">{r.rating} / 5 Sterne</p>
            <p className="text-[#444444] leading-relaxed flex-1">"{r.text}"</p>
            <p className="text-sm font-bold text-[#924d44]">— {r.name}</p>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto">
        <h2 className="font-display text-2xl font-black text-center mb-6">Deine Erfahrung teilen</h2>
        <ReviewForm />
      </div>
    </div>
  );
}
