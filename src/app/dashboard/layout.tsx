import SideNav from "@/components/SideNav";
import React, { PropsWithChildren } from "react";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="container mx-auto pt-12 min-h-screen">
      <div className="flex gap-8">
        <SideNav />

        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
