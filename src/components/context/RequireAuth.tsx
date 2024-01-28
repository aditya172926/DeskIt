import { useAuthContext } from "./AuthContext";

const RequireAuth = ({children}: any) => {
    const {token, setShouldShowModal } = useAuthContext();
    return token ? children : setShouldShowModal(true);
}

export default RequireAuth;