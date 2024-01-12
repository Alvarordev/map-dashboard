import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { UserData, setInitializeAuth } from "../redux/slices/auth.slice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../redux/store";

const RoutesLayout = (userData: any) => {
  const isAuthenticated = useMemo(() => {
    return (userData: UserData | null, accessToken: string | null) => {
      return userData && accessToken;
    };
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isAuthenticated(userData, accessToken)) {
      dispatch(setInitializeAuth(navigate));
    }
  }, [dispatch, navigate, userData, accessToken, isAuthenticated]);

  const [toggleBar, setToggleBar] = useState(false);

  const expandBar = () => {
    setToggleBar(!toggleBar);
  };

  return (
    <main className="flex text-primary min-h-screen bg-background">
      <Sidebar toggleBar={toggleBar} setToggleBar={expandBar} />
      <div
        className={`${toggleBar ? "ml-24" : "ml-64"} p-8 w-full relative transition-all`}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default RoutesLayout;
