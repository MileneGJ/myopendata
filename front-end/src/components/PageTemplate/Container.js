import styled from "styled-components";

const Container = styled.div`
  margin: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .fileDescription {
    align-items: flex-start;
    h2,
    p {
      width: 100%;
      max-width: 900px;
      text-align: justify;
    }
    a {
      font-size: 16px;
    }
  }
  @media (max-width: 600px) {
    margin-top: 70px;
  }
`;

export default Container;
