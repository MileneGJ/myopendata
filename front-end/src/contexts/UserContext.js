import { createContext, useEffect, useState } from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    name: "Maria",
    id: 1,
  });

  useEffect(() => {
    localStorage.setItem("user", userData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
