import App from "./App";
import CreateGist from "./components/gist/CreateGist";
import PrivateGists from "./components/gist/PrivateGists";
import PublicGists from "./components/gist/PublicGists";
import PrivateRepositories from "./components/repository/PrivateRepositories";
import PublicRepositories from "./components/repository/PublicRepositories";
import AuthContextProvider from "./components/context/AuthContext";
import PublicUserRepositories from "./components/repository/PublicUserRepositories";
import UserProfile from "./components/profile/UserProfile";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <PublicRepositories /> },
      { path: "repositories/public", element: <PublicRepositories /> },
      { path: "gists/public", element: <PublicGists /> },
      {
        path: "gists/new",
        element: (
          <AuthContextProvider>
            <CreateGist />
          </AuthContextProvider>
        ),
      },
      {
        path: "repositories/private",
        element: (
          <AuthContextProvider>
            <PrivateRepositories />
          </AuthContextProvider>
        ),
      },
      {
        path: "repositories/my_public_repos",
        element: <PublicUserRepositories />
      },
      {
        path: "gists/private",
        element: (
          <AuthContextProvider>
            <PrivateGists />
          </AuthContextProvider>
        ),
      },
      {
        path: "profile", element: (
          <UserProfile />
        )
      }
    ],
  },
];

export default routes;