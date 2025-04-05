import "./account.css";
import { useAccount } from "../../Context/AccountContext";
import { useAuth } from "../../hooks/useAuth";

export default function Account() {
  const { title, ContentComponent, setSection } = useAccount();

  const { user } = useAuth();

  return (
    <div className="account-page-container">
      {user?.isAdmin ? (
        <>
          <div className="account-navbar">
            <ul>
              {[
                // "Dashboard",
                "Manage Products",
                "Manage Customers",
                "Coupons",
              ].map((section) => (
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
            <div className="title">{title}</div>
            <div className="content">{ContentComponent}</div>
          </div>
        </>
      ) : (
        <>
          <div className="account-navbar">
            <ul>
              {["Your Orders", "Your Address", "Login Details"].map(
                (section) => (
                  <li
                    className={title === section ? "active" : ""}
                    key={section}
                    onClick={() => setSection(section)}
                  >
                    <div>{section}</div>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="account-main">
            <div className="title">{title}</div>
            <div className="content">{ContentComponent}</div>
          </div>
        </>
      )}
    </div>
  );
}
