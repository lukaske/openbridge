import Cookies from "js-cookie";

export function getAuthorizationHeader() {
  const currentUser = Cookies.get("currentUser");
  if(!currentUser) {
    return {};
  }
  let token = JSON.parse(currentUser || "")?.access || "";

  return {
    Authorization: `Bearer ${token}`,
  };
}