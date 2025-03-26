import "./account.css";
import { useAccount } from "../../Context/AccountContext";

export default function Account() {
  const { title, ContentComponent, setSection } = useAccount();

  return (
    <div className="account-page-container">
      <div className="account-navbar">
        <ul>
          {[
            "Your Orders",
            "Your Payments",
            "Your Address",
            "Login Details",
          ].map((section) => (
            <li
              className={title === section ? "active" : ""}
              key={section}
              onClick={() => setSection(section)}
            >
              {section}
            </li>
          ))}
        </ul>
      </div>
      <div className="account-main">
        <div className="title">{title}</div>
        <div className="content">{ContentComponent}</div>
      </div>
    </div>
  );
}
