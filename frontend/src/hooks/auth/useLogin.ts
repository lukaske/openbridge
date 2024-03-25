import { authService } from "../../services";
import Cookies from "js-cookie";
import { UserToken, LoginForm } from "../../services/auth.service";
import { time } from "console";

export const useLogin = () => {
  const login = async (input : LoginForm) => {
    const user = await authService.login(input);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user as UserToken;
  };

  return { login };
};