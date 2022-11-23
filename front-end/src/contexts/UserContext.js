import { createContext, useEffect, useState } from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userData) {
      const data = localStorage.getItem("user");
      if (data) {
        setUserData(data);
      }
    } else {
      localStorage.setItem("user", userData);
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
