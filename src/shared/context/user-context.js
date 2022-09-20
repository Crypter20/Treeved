import { createContext } from "react";

export const UserContext = createContext({
  username: "",
  profile: "",
  full_name: "",
});
