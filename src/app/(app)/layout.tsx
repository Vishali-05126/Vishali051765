import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { headers } from "next/headers";
import { navItems } from "@/config/nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  const currentNavItem = navItems.find((item) => item.href === pathname);
  const title = currentNavItem ? currentNavItem.title : "Dashboard";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header title={title} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
