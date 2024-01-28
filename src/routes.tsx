import App from "./App";
import CreateGist from "./components/gist/CreateGist";
import PrivateGists from "./components/gist/PrivateGists";
import PublicGists from "./components/gist/PublicGists";
import PrivateRepositories from "./components/repository/PrivateRepositories";
import PublicRepositories from "./components/repository/PublicRepositories";
import AuthContextProvider from "./components/context/AuthContext";
import PublicUserRepositories from "./components/repository/PublicUserRepositories";
import UserProfile from "./components/profile/UserProfile";
import RequireAuth from "./components/context/RequireAuth";

const routes = [
  {
    path: "/",
    element: 
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    ,
    children: [
      { index: true, element: <PublicRepositories /> },
      { path: "repositories/public", element: <PublicRepositories /> },
      { path: "gists/public", element: <PublicGists /> },
      {
        path: "gists/new",
        element: (
          <RequireAuth>
            <CreateGist />
          </RequireAuth>
        ),
      },
      {
        path: "repositories/private",
        element: (
          <RequireAuth>
            <PrivateRepositories />
          </RequireAuth>
        ),
      },
      {
        path: "repositories/my_public_repos",
        element: <PublicUserRepositories />,
      },
      {
        path: "gists/private",
        element: (
          <RequireAuth>
            <PrivateGists />
          </RequireAuth>
        ),
      },
      {
        path: "profile",
        element: (
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        ),
      },
    ],
  },
];

export default routes;
