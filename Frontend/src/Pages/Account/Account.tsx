import "./account.css";
import { useAccount } from "../../Context/AccountContext";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/Common Components/Loading/LoadingSpinner";

export default function Account() {
  const { title, ContentComponent, setSection } = useAccount();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="account-loading">
        <LoadingSpinner />
      </div>
    );
  }

  const sections = user?.isAdmin
    ? ["Manage Products", "Manage Customers", "Coupons"]
    : ["Your Orders", "Your Address", "Login Details"];

  return (
    <div className="account-page-container">
      <div className="account-navbar">
        <ul>
          {sections.map((section) => (
            <li
              className={title === section ? "active" : ""}
              key={section}
              onClick={() => setSection(section)}
            >
              <div>{section}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="account-main">
        <div className="subtitle">{title}</div>
        <div className="content">{ContentComponent}</div>
      </div>
    </div>
  );
}
