"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface Props {
  threadId: string;
  pinned: boolean;
  locked: boolean;
}

export default function ForumModerationButtons({ threadId, pinned, locked }: Props) {
  const router = useRouter();

  async function update(data: { pinned?: boolean; locked?: boolean }) {
    await fetch("/api/admin/forum", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId, pinned, locked, ...data }),
    });
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Thread wirklich löschen?")) return;
    await fetch("/api/admin/forum", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId }),
    });
    router.refresh();
  }

  return (
    <div className="flex gap-1 justify-end flex-wrap">
      <button
        onClick={() => update({ pinned: !pinned })}
        className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-[#81ABAD] text-[#81ABAD] hover:bg-[#81ABAD] hover:text-white transition-all"
      >
        {pinned ? "Lösen" : "Anpinnen"}
      </button>
      <button
        onClick={() => update({ locked: !locked })}
        className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-[#D68876] text-[#D68876] hover:bg-[#D68876] hover:text-white transition-all"
      >
        {locked ? "Entsperren" : "Sperren"}
      </button>
      <button
        onClick={handleDelete}
        className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-[#F0DDD8] text-[#888] hover:border-red-300 hover:text-red-500 transition-all"
      >
        Löschen
      </button>
    </div>
  );
}
