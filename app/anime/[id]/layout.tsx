import NavBar from "@/components/main/NavBar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="">
        <NavBar/>
        {children}
      </main>
  );
}