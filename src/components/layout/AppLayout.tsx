import { Outlet } from "react-router-dom";
import { MobileNav } from "./MobileNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-safe">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}
