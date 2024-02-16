import { UserType } from "../../types";
import { useAuthContext } from "../context/AuthContext";
import ProfileLayout from "./ProfileLayout";

const UserProfile = () => {
  const { token, user } = useAuthContext();

  return (
    <ProfileLayout user={user} userType={UserType.USER} />
  );
};

export default UserProfile;
