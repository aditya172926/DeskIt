import { Button, Result } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { GithubAccessTokens, Nullable } from "../../types";
import AuthModal from "../AuthModal";

type AuthContextType = {
  token: Nullable<string>;
  setShouldShowModal: (param: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({ token: null, setShouldShowModal: (param) => {} });

interface Props {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const authHook = useAuth();
  const [token, setToken] = useState<Nullable<string>>(null);
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
  // const [userProfile, setUserProfile] = useState<Nullable<GithubUser>>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        setToken(null);
        setShouldShowModal(true);
      }
    }, 3600000);

    return () => clearTimeout(timer);
  }, [token]);

  const onSubmit = async() => {
    try {
      const token: Nullable<GithubAccessTokens> = await authHook.authenticate_with_github();
      if (token)
        setToken(token.access_token);
      setShouldShowModal(false);
    } catch (error) {
      console.log("Error in Authentication with Github ", error);
    }
  };

  const onCancel = () => {
    setShouldShowModal(false);
    navigate("/");
  };

  // if (!shouldShowModal && !token) {
  //   return (
  //     <Result
  //       status="error"
  //       title="Authentication failed"
  //       subTitle="A github personal access token is required"
  //       extra={[
  //         <Button type="link" key="home" onClick={() => navigate("/")}>
  //           Public Section
  //         </Button>,
  //         <Button
  //           key="retry"
  //           type="primary"
  //           onClick={() => setShouldShowModal(true)}
  //         >
  //           Try again
  //         </Button>,
  //       ]}
  //     />
  //   );
  // }

  return (
    <>
      {shouldShowModal && (
        <AuthModal
          shouldShowModal={shouldShowModal}
          onSubmit={onSubmit}
          authCode={authHook.authCode}
          onCancel={onCancel}
        />
      )}

      <AuthContext.Provider value={{ token, setShouldShowModal }}>{children}</AuthContext.Provider>
    </>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
