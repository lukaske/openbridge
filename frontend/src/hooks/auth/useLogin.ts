import { authService } from "../../services";
import Cookies from "js-cookie";
import { UserToken, LoginForm } from "../../services/auth.service";
import { time } from "console";

export const useLogin = () => {
  const login = async (input : LoginForm) => {
    const jwt = await authService.login(input);
    if (!jwt) {
      return;
    }
    Cookies.set("currentUser", JSON.stringify(jwt));
    return jwt.user;
  };

  return { login };
};