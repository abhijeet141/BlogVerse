import { isAuthenticated } from "./HomeRoute"
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    element: React.ReactElement;
  }

export function ProtectedRoute({element}:ProtectedRouteProps){
    return isAuthenticated() ? element : <Navigate to="/" />;
}