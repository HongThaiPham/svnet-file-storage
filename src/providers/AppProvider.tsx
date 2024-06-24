import { PropsWithChildren } from "react";
import ConvexClientProvider from "./ConvexClientProvider";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
};

export default AppProvider;
