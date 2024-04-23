import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "../../types/user";
import { authService } from "../../services";
import { UserToken } from "../../services/auth.service";
import { Jwt } from "../../api/model";

export const useCurrentUser = () => {
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const refetchUser = async (userId: string) => {
    const userInfo = {username: '', avatar: ''};
    const currentUser = Cookies.get("currentUser");

    if (userInfo && currentUser) {
      const newUser = {
        ...JSON.parse(currentUser),
        username: userInfo.username,
        avatar: userInfo.avatar,
      };
      Cookies.set("currentUser", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  return { user, refetchUser };
};