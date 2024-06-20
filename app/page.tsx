import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

type DuaTag = string;

type Dua = {
  id: number;
  route_name: string;
  titles: {
    ar: string;
    en: string;
    tl: string;
  };
  tags: DuaTag[];
};

export default async function Home() {
  const { data: duas, error } = await supabase.functions.invoke<Dua[]>("duas");
  if (error || !duas) {
    console.error(`Error fetching text: ${error?.message}`);
    return notFound();
  }

  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {duas.map((dua) => (
            <Link
              href={`/${dua.route_name}`}
              key={dua.route_name}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                display: "block",
              }}
            >
              <h2>{dua.titles.tl}</h2>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
