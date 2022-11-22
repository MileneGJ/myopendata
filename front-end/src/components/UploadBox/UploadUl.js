import styled from "styled-components";

const UploadUl = styled.ul`
  margin: 20px;
  width: 100%;
  overflow: hidden;
  li {
    display: flex;
    color: #2b3f51;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
    }
    div:first-child {
      flex-direction: column;
      width: 100%;
    }
    h3 {
      font-size: 16px;
      color: #2b3f51;
      text-align: left;
      line-height: 22px;
      margin: 0;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      font-size: 14px;
      line-height: 22px;
      margin: 0;
    }
    h4 {
      margin: 0;
      height: 100%;
      margin-left: 5px;
      font-size: 14px;
      color: #e57878;
      cursor: pointer;
    }
    span {
      display: flex;
      align-items: center;
    }
  }
  & + li {
    margin-top: 15px;
  }
`;

export default UploadUl;
