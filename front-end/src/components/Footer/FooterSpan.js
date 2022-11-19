import styled from "styled-components";

const FooterSpan = styled.span`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 10px 40px;
  box-sizing: border-box;
  background-color: #ffffff;

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default FooterSpan;
