import { useState } from "react";
import "./register.css";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { handleRegister } from "../../api/api";
import MessageBox from "../../Components/MessageBox/MessageBox";

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confPassword) {
      setMessage({ text: "Your passwords do not match.", type: "error" });
      return;
    }

    try {
      await handleRegister({ firstName, surname, email, password }).then(
        (res) => {
          if (res === "duplicate") {
            setMessage({
              text: "User with this email address already exists.",
              type: "error",
            });
          } else if (res === "success") {
            setMessage({
              text: "You have successfully registered your account!",
              type: "success",
            });
          }
        }
      );
    } catch (error) {
      setMessage({
        text: "Failed to register. Please try again.",
        type: "error",
      });
    }
  };

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    e: string
  ) => {
    setState(e);
    setMessage(null);
  };

  return (
    <div className="register-page-container">
      <MessageBox
        message={message?.text || ""}
        type={message?.type || "error"}
      />
      <div className="register-container">
        <div className="register-title">Create your account</div>
        <form onSubmit={register}>
          <TextField
            variant="filled"
            label="First Name"
            type="text"
            required
            value={firstName}
            onChange={(e) => handleChange(setFirstName, e.target.value)}
          />
          <TextField
            variant="filled"
            label="Surname"
            type="text"
            required
            value={surname}
            onChange={(e) => handleChange(setSurname, e.target.value)}
          />
          <TextField
            variant="filled"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => handleChange(setEmail, e.target.value)}
          />
          <TextField
            variant="filled"
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => handleChange(setPassword, e.target.value)}
          />
          <TextField
            variant="filled"
            label="Confirm Password"
            type="password"
            required
            value={confPassword}
            onChange={(e) => handleChange(setConfPassword, e.target.value)}
          />
          <div
            className={
              firstName === "" ||
              surname === "" ||
              email === "" ||
              password === "" ||
              confPassword === ""
                ? "button-container disabled"
                : "button-container"
            }
          >
            <button type="submit">Register</button>
          </div>
          <div className="login">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
}
