"use client";
import { getPdfThumbnail } from "@/lib/getPdfThumbnail";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { ClassNameValue } from "tailwind-merge";
export default function SheetThumbnail({
  pdfUrl,
  _setThumbnailUrl,
  existingThumbnailUrl,
  className,
}: {
  pdfUrl?: string;
  _setThumbnailUrl?: (url: string) => void;
  existingThumbnailUrl?: string;
  className?: ClassNameValue;
}) {
  const [thumbnailUrl, setThumbnailUrl] = useState<null | string>(null);

  useEffect(() => {
    async function fetchThumbnail() {
      if (!pdfUrl) return;
      const url = await getPdfThumbnail(pdfUrl);
      setThumbnailUrl(url);
      _setThumbnailUrl!(url);
    }
    fetchThumbnail();
  }, [pdfUrl]);

  useEffect(() => {
    if (!existingThumbnailUrl) return;
    setThumbnailUrl(existingThumbnailUrl);
  }, [existingThumbnailUrl]);

  if (thumbnailUrl || existingThumbnailUrl)
    return (
      <div
        className={cn(
          "max-w-64 w-screen aspect-[561/795] bg-white relative",
          className
        )}
      >
        <Image
          className="object-contain object-top w-full h-full"
          fill
          src={thumbnailUrl || existingThumbnailUrl || "/favicon.ico"}
          alt={"PDF Viewer"}
          quality={100}
        />
      </div>
    );

  return <FiLoader className="animate-spin m-8" />;
}
