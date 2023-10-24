import { useCallback, useState } from "react";
import { User } from "../api";
import { useAuth } from "./useAuth";
export default function useUser() {
  const { accessToken } = useAuth();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);  

  const userController = new User();
  const searchUser = useCallback(async () => {
    const results = await userController.getSearchUser(accessToken, search);
    const { users } = results;
    setUsers(users);
  }, [search, accessToken]);

  return { search, setSearch, searchUser, users };
}
