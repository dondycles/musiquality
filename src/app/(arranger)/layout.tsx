import Footer from "@/components/footer";

export default function ArrangerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-[100dvh] w-full p-4 overflow-auto flex flex-col">
      {children}
      <Footer />
    </main>
  );
}
