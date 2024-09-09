"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function SearchBar() {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get("term");
        router.push("/search?term=" + searchTerm);
      }}
    >
      <Input
        name="term"
        className="shadow-none"
        placeholder="Search for piece/artist/arranger"
      />
    </form>
  );
}
