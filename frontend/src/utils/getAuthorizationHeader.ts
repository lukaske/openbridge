import Cookies from "js-cookie";
import { Jwt } from "../api/model";

export function getAuthorizationHeader() {
  const authCookie: string | undefined = Cookies.get("currentUser");
  if(!authCookie) {
    return {};
  }
  let token:Jwt = JSON.parse(authCookie)?.access || "";
  console.log(JSON.parse(authCookie))
  return {
    Authorization: `Bearer ${token}`,
  };
}