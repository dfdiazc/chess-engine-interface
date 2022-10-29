import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { useLogoutMutation } from "features/auth/authApiSlice";
import { logOut } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { selectCurrentRefreshToken } from "features/auth/authSlice";

const Profile = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectCurrentRefreshToken);
  const navigate = useNavigate();
  function handleLogOut() {
    try {
      logout({ refresh: token });
      dispatch(logOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button
        className="px-10 py-5 bg-blue-200 rounded-full"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
