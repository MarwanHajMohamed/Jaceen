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
  const { user } = useAuth();

  if (user) {
    return <Navigate to={"/" + route} />;
  }

  return children;
};

export default ProtectedRoute;
