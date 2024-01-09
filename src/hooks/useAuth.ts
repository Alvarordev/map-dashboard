import { LoginProps, loginAsync } from "../redux/slices/auth.slice"
import { useAppDispatch, useAppSelector } from "../redux/store"

export const useAuth = () => {
    const dispatch = useAppDispatch()
    const {accessToken, isLoading, userData} = useAppSelector(state => state.auth)

    const logIn = ({authData, navigate}: LoginProps) => {
        dispatch(loginAsync({authData, navigate}))
    }

    return {logIn, accessToken, isLoading, userData}
}