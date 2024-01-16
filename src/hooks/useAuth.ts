import {
  LoginProps,
  loginAsync,
  logoutAsync,
} from "../redux/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { accessToken, isLoading, userData } = useAppSelector(
    (state) => state.auth
  );

  const logIn = ({ authData, navigate }: LoginProps) => {
    return dispatch(loginAsync({ authData, navigate }));
  };

  const logOut = (navigate: any) => {
    return dispatch(logoutAsync(navigate));
  };

  return { logIn, logOut, accessToken, isLoading, userData };
};
