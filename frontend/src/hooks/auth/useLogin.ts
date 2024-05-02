import { authService } from "../../services";
import Cookies from "js-cookie";
import { UserToken, LoginForm } from "../../services/auth.service";
import { time } from "console";
import { useRouter } from "next/router";

export const useLogin = () => {
  const router = useRouter();
  const login = async (input : LoginForm) => {
    const jwt = await authService.login(input);
    if (!jwt) {
      return;
    }
    const expirationDate = new Date(jwt.access_expiration);
    Cookies.set("currentUser", JSON.stringify(jwt), { expires: expirationDate, path: "/"});
    return jwt.user;
  };

  return { login };
};
