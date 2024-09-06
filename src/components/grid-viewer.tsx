"use client";
export default function GridViewer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-5 w-full h-fit gap-2">
      {children}
    </div>
  );
}
