import styled from "styled-components";

const UploadButton = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 54px;
  right: 40px;
  background-color: #021a67;
  color: #ffffff;
  font-size: 20px;
  margin: 15px 0;
  border: none;
  border-radius: 10px;
  height: 42px;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: 600px) {
    font-size: 16px;
    width: 100%;
    right: 0;
    border-radius: 0;
  }
`;

export default UploadButton;
