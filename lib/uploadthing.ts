import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

const f = createUploadthing();

export const ourFileRouter = {
  // Produktbilder (Admin)
  productImage: f({ image: { maxFileSize: "8MB", maxFileCount: 6 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== "admin") throw new Error("Nicht erlaubt");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),

  // Digitale Download-Dateien (Admin)
  productDownload: f({
    pdf: { maxFileSize: "64MB" },
    image: { maxFileSize: "64MB", maxFileCount: 1 },
    "application/zip": { maxFileSize: "64MB" },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== "admin") throw new Error("Nicht erlaubt");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),

  // Blog-Coverbilder (Admin)
  blogCover: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== "admin") throw new Error("Nicht erlaubt");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
