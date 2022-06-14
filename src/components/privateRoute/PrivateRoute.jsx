import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;