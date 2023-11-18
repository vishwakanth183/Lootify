import Navbar from "@/src/shared/components/navbar/navbar";

export default function LootifyNavbar({ children }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
