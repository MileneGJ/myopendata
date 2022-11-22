import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { deleteUser } from "../../services/users";
import errorHandler from "../../utils/errorHandler";
import UserContainer from "./UserContainer";
import UserOptions from "./UserOptions";

export default function UserMenu() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [appearOptions, setAppearOptions] = useState(false);
  const token = localStorage.getItem("token");

  function deleteSession() {
    localStorage.removeItem("token");
    setUserData({});
    navigate("/signin");
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
      <p>{userData.name}</p>
      <UserOptions>
        <Link to={`/author/${userData.name}`}>My files</Link>
        <p onClick={deleteSession}>Logout</p>
        <p onClick={deleteAccount}>Delete account</p>
      </UserOptions>
    </UserContainer>
  );
}
