import { createContext, useEffect, useState } from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    try {
      const item = window.localStorage.getItem("user");
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  useEffect(() => {
    const formattedData = JSON.stringify(userData);
    localStorage.setItem("user", formattedData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
