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
      <Button variant="outline" size="sm" onClick={() => update({ pinned: !pinned })}>
        {pinned ? "📌 Lösen" : "📌 Anpinnen"}
      </Button>
      <Button variant="outline" size="sm" onClick={() => update({ locked: !locked })}>
        {locked ? "🔓 Entsperren" : "🔒 Sperren"}
      </Button>
      <Button variant="outline" size="sm" onClick={handleDelete}
        className="border-red-400 text-red-600 hover:bg-red-50">
        Löschen
      </Button>
    </div>
  );
}
