import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import IsLoadingSpinner from "../../ui/IsLoadingSpinner";
import { updateReadressingStatus } from "./readressingSlice";

function ProtectedRoute() {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!username) {
      dispatch(updateReadressingStatus(true));
      navigate("/");
    }
  }, [username]);
  if (!username) return null;
  return <Outlet />;
}

export default ProtectedRoute;
