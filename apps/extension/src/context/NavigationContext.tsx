import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { Page } from "@/types/page";

type NavigationContextType = {
  page: Page;
  navigate: (page: Page) => void;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [page, setPage] = useState<Page>("home");

  const navigate = (page: Page) => {
    setPage(page);
  };

  return (
    <NavigationContext.Provider
      value={{
        page,
        navigate,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useNavigation must be used inside NavigationProvider"
    );
  }

  return context;
}