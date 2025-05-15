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
import LoadingSpinner from "../Components/Common Components/Loading/LoadingSpinner";

export function AccountProvider({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  const sections: Record<string, ReactNode> = {
    "Your Orders": <Orders />,
    "Your Address": <Address />,
    "Login Details": <LoginDetails />,
    "Manage Products": <ManageProducts />,
  };

  const [title, setTitle] = useState<string | null>(null);
  const [ContentComponent, setContentComponent] = useState<ReactNode>(null);

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

  // 🚨 Show spinner immediately when loading
  if (isLoading || !title || !ContentComponent) {
    return (
      <div className="account-loading">
        <LoadingSpinner />
      </div>
    );
  }

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
