import Footer from "@/components/footer";
import Nav from "@/components/nav";

export default function ArrangerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-[100dvh] w-full pb-4 pt-24 overflow-auto flex flex-col">
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
