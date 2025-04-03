import { FormControl, TextField } from "@mui/material";
import "./logindetails.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { updateLoginDetails } from "../../../api/userApi";
import MessageBox from "../../../Components/MessageBox/MessageBox";

export default function LoginDetails() {
  const { user } = useAuth(); // Get user from auth hook

  // PERSONAL DETAILS
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password] = useState<string>("********");

  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  useEffect(() => {
    if (user) {
      // Prefill personal details
      setFirstName(user.firstName || "");
      setSurname(user.surname || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const saveDetails = async () => {
    const updatedUser = updateLoginDetails({
      firstName: firstName,
      surname: surname,
      email: email,
      phone: phone,
      password: password,
    });
    updatedUser.then(() => {
      setMessage({ text: "Success", type: "success" });
    });
  };

  return (
    <div className="login-details-container">
      <div className="wrapper">
        <FormControl fullWidth className="form">
          <div className="name">
            <TextField
              variant="standard"
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              variant="standard"
              label="Surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <TextField
            variant="standard"
            label="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Password"
            type="password"
            value={password}
            disabled
          />
          <a href="">Change Password</a>
          <button onClick={saveDetails}>Save</button>
        </FormControl>
      </div>
      <MessageBox
        message={message?.text || ""}
        type={message?.type || "error"}
      />
    </div>
  );
}
