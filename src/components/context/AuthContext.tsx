import { Button, Result } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GithubUser, Nullable } from "../../types";
import AuthModal from "../AuthModal";

type AuthContextType = {
  token: Nullable<string>;
};

const AuthContext = createContext<AuthContextType>({ token: null });

interface Props {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<Nullable<string>>(null);
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<Nullable<GithubUser>>(null);

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

  const onSubmit = (token: string) => {
    setToken(token);
    setShouldShowModal(false);
  };

  const onCancel = () => {
    setShouldShowModal(false);
  };

  if (!shouldShowModal && !token) {
    return (
      <Result
        status="error"
        title="Authentication failed"
        subTitle="A github personal access token is required"
        extra={[
          <Button type="link" key="home" onClick={() => navigate("/")}>
            Public Section
          </Button>,
          <Button
            key="retry"
            type="primary"
            onClick={() => setShouldShowModal(true)}
          >
            Try again
          </Button>,
        ]}
      />
    );
  }

  return (
    <>
      {shouldShowModal && (
        <AuthModal
          shouldShowModal={shouldShowModal}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
      <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
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
