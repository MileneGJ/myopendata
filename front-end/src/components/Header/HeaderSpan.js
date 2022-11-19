import styled from "styled-components";

const HeaderSpan = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
  box-sizing: border-box;
  align-items: center;
  background-color: #ffffff;
  img {
    height: 70px;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    input,
    select {
      display: none;
    }
  }
`;

export default HeaderSpan;
