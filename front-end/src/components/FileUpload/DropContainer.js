import styled from "styled-components";

const DropContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 5px 10px;
  height: 70px;
  margin: 4px 0;
  font-size: 20px;
  color: #58728a;
  border: 2px dashed #021a67;
  border-radius: 10px;
  cursor: pointer;

  ${({ isDragActive }) =>
    isDragActive
      ? `
border-color:#6aa84f;
color:#6aa84f;
`
      : ""}
  ${({ isDragReject }) =>
    isDragReject
      ? `
border-color:#e57878;
color:#e57878;
`
      : ""}

transition: height 0.2s ease;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export default DropContainer;
