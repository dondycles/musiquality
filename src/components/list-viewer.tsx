"use client";

import { usePagePreferences } from "@/../store";

export default function ListViewer({
  children,
  length,
}: {
  children: React.ReactNode;
  length: number;
}) {
  return (
    <div
      className={`grid grid-cols-1 ${
        length > 5 && "sm:grid-cols-2"
      }  grid-rows-5 w-full h-fit gap-2`}
    >
      {children}
    </div>
  );
}
