import { UserType } from "../../types";
import { useAuthContext } from "../context/AuthContext";
import ProfileLayout from "./ProfileLayout";

const AuthUserProfile = () => {
    const { user } = useAuthContext();

  return (
    <ProfileLayout user={user} userType={UserType.AUTHENTICATED_USER} />
  );
};

export default AuthUserProfile;