import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // Si l'utilisateur est connecté, le rediriger vers /dashboard
  return !user ? children : <Navigate to="/dashboard" />;
};

export default GuestRoute;
