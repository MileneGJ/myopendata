import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUserName } from "../../services/users";
import errorHandler from "../../utils/errorHandler";
import UserContainer from "./UserContainer";
import UserOptions from "./UserOptions";

export default function UserMenu() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [appearOptions, setAppearOptions] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("User not logged in");
      navigate("/");
    } else {
      async function getName() {
        try {
          const data = await getUserName(token);
          setUserName(data.name);
        } catch (error) {
          errorHandler(error);
        }
      }
      getName();
    }
  }, []);

  function deleteSession() {
    localStorage.removeItem("token");
    navigate("/");
  }

  async function deleteAccount() {
    try {
      await deleteUser(token);
      alert("User was successfully deleted");
      navigate("/");
    } catch (error) {
      errorHandler(error);
    }
  }

  function showOptions() {
    setAppearOptions(!appearOptions);
  }

  return (
    <UserContainer onClick={showOptions} visible={appearOptions}>
      <p>{userName}</p>
      <UserOptions>
        <Link to={`/search?user=${userName}`}>My files</Link>
        <p onClick={deleteSession}>Logout</p>
        <p onClick={deleteAccount}>Delete account</p>
      </UserOptions>
    </UserContainer>
  );
}
