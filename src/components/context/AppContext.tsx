import { createContext, useContext, useEffect, useState } from "react";
import { GithubUser, Nullable } from "../../types";

type AppContextType = {
  user: Nullable<GithubUser>;
  setUser: (param: GithubUser) => void;
};

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: (param: GithubUser) => {},
});

const AppContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<Nullable<GithubUser>>(null);

  return (
    <>
      <AppContext.Provider value={{ user, setUser }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export default AppContextProvider;
