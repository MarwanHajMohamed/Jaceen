import { createContext, useContext, useState, ReactNode } from "react";
import Orders from "../Pages/Account/Orders/Orders";
import Address from "../Pages/Account/Address/Address";
import LoginDetails from "../Pages/Account/LoginDetails/LoginDetails";

// Define context type
interface AccountContextType {
  title: string;
  ContentComponent: ReactNode;
  setSection: (section: string) => void;
}

// Create context
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Provider component
export function AccountProvider({ children }: { children: ReactNode }) {
  const sections: Record<string, ReactNode> = {
    "Your Orders": <Orders />,
    "Your Address": <Address />,
    "Login Details": <LoginDetails />,
  };

  const [title, setTitle] = useState("Your Orders");
  const [ContentComponent, setContentComponent] = useState<ReactNode>(
    sections["Your Orders"]
  );

  const setSection = (section: string) => {
    setTitle(section);
    setContentComponent(sections[section]);
  };

  return (
    <AccountContext.Provider value={{ title, ContentComponent, setSection }}>
      {children}
    </AccountContext.Provider>
  );
}

// Custom hook for using the context
export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
