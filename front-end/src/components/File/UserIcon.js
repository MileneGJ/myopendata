import styled from "styled-components";

const UserIcon = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 12px;
  }
  div {
    border-radius: 50px;
    width: 24px;
    height: 24px;
    background-color: #3b99ed;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }
`;
export default UserIcon;
