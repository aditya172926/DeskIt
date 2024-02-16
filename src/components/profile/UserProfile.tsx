import { useMemo, useState } from "react";
import { GithubUser, Nullable, UserType } from "../../types";
import ProfileLayout from "./ProfileLayout";
import { useLocation } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";
import { useAuthContext } from "../context/AuthContext";


const UserProfile = () => {
  const {token} = useAuthContext();
  const location = useLocation();
  let user = location.state;
  const [userProfile, setUserProfile] = useState<Nullable<GithubUser>>(null);

  useMemo(() => {
    if (user?.login) {

      console.log("fetching user data", user);
      const getUserData = async() => {
        const userData: GithubUser = await invoke("get_user_profile", {
          username: user?.login,
          token: token
        });
        setUserProfile(userData);
      }
      getUserData();
    }
  }, [user?.login]);

  return (
    <ProfileLayout user={userProfile} userType={UserType.USER} />
  );
};

export default UserProfile;
