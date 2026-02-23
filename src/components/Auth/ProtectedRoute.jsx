import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleAuthPopup } from "../../store/slices/popupSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { authUser } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(authUser?.id && authUser?.role === "User");

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Please login to continue.");
      dispatch(toggleAuthPopup());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

