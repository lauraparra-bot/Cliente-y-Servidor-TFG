import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api";
import { hasExpiredToken } from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mailToSearch, setMailToSearch] = useState();

  useEffect(() => {
    (async () => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();

      if (!accessToken || !refreshToken) {
        logout();
        setLoading(false);
        return;
      }

      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await login(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      setLoading(false);
    })();
  }, []);

  const login = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);
      delete response.password;
      setUser(response);
      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const isAdmin = user?.role === 'admin';

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    mailToSearch,
    setMailToSearch,
    isAdmin
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
