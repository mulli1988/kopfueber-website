export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/db/mongodb";
import Contact from "@/lib/db/models/Contact";
import ContactActions from "@/components/admin/ContactActions";

export const metadata = { title: "Admin — Nachrichten" };

export default async function AdminContactPage() {
  await connectToDatabase();
  const messages = await Contact.find().sort({ createdAt: -1 }).lean();

  const unread = messages.filter((m) => !m.read);
  const read   = messages.filter((m) => m.read);

  return (
    <div>
      <h1 className="font-display text-4xl font-black mb-2">Nachrichten</h1>
      <p className="text-[#888] mb-8">{unread.length} ungelesen · {messages.length} gesamt</p>

      {messages.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-12 text-center text-[#888]">
          Noch keine Anfragen eingegangen.
        </div>
      )}

      {/* Ungelesen */}
      {unread.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-lg font-bold text-[#924d44] mb-4">Ungelesen</h2>
          <div className="flex flex-col gap-4">
            {unread.map((msg) => (
              <div
                key={msg._id.toString()}
                className="bg-white rounded-2xl border-2 border-[#81ABAD] p-6"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <p className="font-bold text-[#222222]">{msg.name}</p>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-[#81ABAD] hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-[#888]">
                      {new Date(msg.createdAt).toLocaleDateString("de-DE", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </p>
                    <ContactActions id={msg._id.toString()} read={false} />
                  </div>
                </div>
                <p className="text-[#444] leading-relaxed whitespace-pre-wrap text-sm">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gelesen */}
      {read.length > 0 && (
        <div>
          <h2 className="font-display text-lg font-bold text-[#888] mb-4">Gelesen</h2>
          <div className="flex flex-col gap-3">
            {read.map((msg) => (
              <div
                key={msg._id.toString()}
                className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-5"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <div>
                    <p className="font-semibold text-[#555]">{msg.name}</p>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-[#81ABAD] hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-[#888]">
                      {new Date(msg.createdAt).toLocaleDateString("de-DE", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </p>
                    <ContactActions id={msg._id.toString()} read={true} />
                  </div>
                </div>
                <p className="text-[#777] leading-relaxed whitespace-pre-wrap text-sm">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
