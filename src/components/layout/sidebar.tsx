import { SidebarNav } from "./sidebar-nav";
import { Logo } from "../logo";

export function Sidebar() {
  return (
    <div className="hidden border-r bg-muted md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <Logo />
        </div>
        <div className="flex-1">
          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
