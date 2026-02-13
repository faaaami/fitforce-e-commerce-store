import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // not logged in - go to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
