import styled from 'styled-components'

const FileSpan = styled.span`
display:flex;
justify-content:space-between;
align-items:center;
width:80%;
box-sizing:border-box;
margin:10px 0;
>div:first-child{
    display:flex;
}
h2{
    text-align:left;
    font-size:18px;
    line-height:20px;
    margin:0;
    margin-bottom:5px;
}
p{
    text-align:left;
    font-size:14px;
    line-height:18px;
    margin:0;
    width:auto;
}
`


export {
    FileSpan
}