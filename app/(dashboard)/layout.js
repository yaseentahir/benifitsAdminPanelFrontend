"use client";

import { Sidebar } from "@/components";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8 min-h-full">{children}</div>
      </main>
    </div>
  );
}
