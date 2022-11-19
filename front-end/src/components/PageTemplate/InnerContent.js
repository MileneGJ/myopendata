import styled from "styled-components";

const InnerContent = styled.div`
  width: 80%;
  margin: 30px 0;
  color: #021a67;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h2 {
    font-size: 24px;
    text-align: center;
    margin: 24px 0;
  }
  a {
    color: #021a67;
    font-size: 20px;
    font-weight: 700;
  }
  h3 {
    color: #3b99ed;
    width: 60%;
    font-size: 20px;
    margin: 20px 0;
    text-align: center;
  }
  > p {
    color: #2b3f51;
    width: 100%;
    max-width: 500px;
    text-align: justify;
    word-wrap: break-word;
    line-height: 24px;
    font-size: 16px;
    margin: 20px 0 10px 0;
  }
`;

export default InnerContent;
