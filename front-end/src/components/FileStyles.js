import styled from 'styled-components'

const FileSpan = styled.span`
display:flex;
justify-content:space-between;
align-items:center;
width:90%;
box-sizing:border-box;
margin:10px 0;
cursor:pointer;
div{
    overflow: hidden;
}
>div:first-child{
    margin:0 20px;
    width:70%;
    @media (max-width: 600px) {
        width:100%;
    }
}
>div:last-child{
    width:30%;
    max-width:200px;
    @media (max-width: 600px) {
        display:none;
    }
}
h2{
    text-align:left;
    font-size:18px;
    line-height:20px;
    margin:0;
    margin-bottom:5px;
    width:100%;
    max-width:500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
p{
    text-align:left;
    font-size:14px;
    line-height:18px;
    margin:0;
    width:100%;
    max-width:500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`


export {
    FileSpan
}