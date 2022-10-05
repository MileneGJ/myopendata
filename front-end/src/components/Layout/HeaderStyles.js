import styled from 'styled-components'

const HeaderSpan = styled.span`
position: fixed;
top:0;
left:0;
width:100%;
height: 90px;
display: flex;
justify-content: space-between;
padding:10px 40px;
box-sizing:border-box;
align-items:center;
img {
    height:70px;
}
form{
    width:40%;
    display:flex;
}
input, select {
    font-family: 'Lexend', sans-serif;
    width:100%;
    box-sizing:border-box;
    padding:5px 10px;
    height:38px;
    margin:4px 2px;
    font-size:18px;
    border:1px solid #021a67;
    border-radius:10px;
    color:#58728a;
}
select{
    width:auto;
    background-color:#FFFFFF;
}
div{
    color:#021a67;
    font-size:20px;
}
>div:last-child{
    color:#3b99ed;
    height:45px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
    align-items:center;
    border-radius:50px;
    border:2px solid #3b99ed;
}
`


export {
    HeaderSpan
}