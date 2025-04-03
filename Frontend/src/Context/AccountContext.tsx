import { createContext, useContext, useState, ReactNode } from "react";
import Orders from "../Pages/Account/Orders/Orders";
import Address from "../Pages/Account/Address/Address";
import LoginDetails from "../Pages/Account/LoginDetails/LoginDetails";
import { useAuth } from "../hooks/useAuth";

// Define context type
interface AccountContextType {
  title: string;
  ContentComponent: ReactNode;
  setSection: (section: string) => void;
}

// Create context
const AccountContext = createContext<AccountContextType | undefined>(undefined);

import { useEffect } from "react";
import ManageProducts from "../Pages/Account/ManageProducts/ManageProducts";

export function AccountProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const sections: Record<string, ReactNode> = {
    "Your Orders": <Orders />,
    "Your Address": <Address />,
    "Login Details": <LoginDetails />,
    "Manage Products": <ManageProducts />,
  };

  const [title, setTitle] = useState<string>("Your Orders");
  const [ContentComponent, setContentComponent] = useState<ReactNode>(
    sections["Your Orders"]
  );

  useEffect(() => {
    if (user) {
      const defaultSection = user.isAdmin ? "Manage Products" : "Your Orders";
      setTitle(defaultSection);
      setContentComponent(sections[defaultSection]);
    }
  }, [user]);

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
