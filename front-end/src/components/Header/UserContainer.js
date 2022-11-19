import styled from "styled-components";

const UserContainer = styled.div`
  width: 100px;
  p:first-child {
    color: #021a67;
    font-size: 20px;
    line-height: 30px;
    cursor: pointer;
  }
  position: fixed;
  right: 40px;
  top: 19px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: ${({ visible }) => (visible ? "none" : "3px solid #3b99ed")};
  > div {
    border-top: ${({ visible }) => (visible ? "3px solid #3b99ed" : "none")};
    display: ${({ visible }) => (visible ? "flex" : "none")};
  }
`;

export default UserContainer;
