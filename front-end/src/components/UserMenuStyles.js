import styled from "styled-components";

const UserDiv = styled.div`
width:100px;
p:first-child{
    color:#021a67;
    font-size:20px;
    line-height:30px;
}
position:fixed;
right:40px;
top:19px;
box-sizing:border-box;
display:flex;
flex-direction:column;
align-items:center;
border-bottom:${({ visible }) => visible ? 'none' : '3px solid #3b99ed'};
>div{
    border-top:${({ visible }) => visible ? '3px solid #3b99ed' : 'none'};
    display:${({ visible }) => visible ? 'flex' : 'none'};
}
`

const UserOptions = styled.div`
background-color:#FFFFFF;
box-shadow:0 1px 4px rgba(0,0,0,0.2);
flex-direction:column;
font-size:16px;
text-align:center;
padding:4px 0;
box-sizing: border-box;
color:#3b99ed;
padding-bottom:10px;

a{
    color:#3b99ed;
    text-decoration:none;
    margin:5px 0;
}
p{
    margin:5px 0;
}
`

export {
    UserOptions,
    UserDiv
}