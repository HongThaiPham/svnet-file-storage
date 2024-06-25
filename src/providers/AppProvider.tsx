import { PropsWithChildren } from "react";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConvexClientProvider>
      {children}
      <Toaster />
    </ConvexClientProvider>
  );
};

export default AppProvider;
