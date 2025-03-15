import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { JSX } from "react";

const ProtectedRoute = ({
  children,
  route,
}: {
  children: JSX.Element;
  route: string;
}) => {
  const { auth } = useAuth();

  if (auth) {
    return <Navigate to={"/" + route} />;
  }

  return children;
};

export default ProtectedRoute;
