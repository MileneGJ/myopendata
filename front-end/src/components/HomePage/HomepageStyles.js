import styled from 'styled-components'

const Container = styled.div`
margin-top:120px;
display:flex;
flex-direction:column;
align-items:center;
`
const InnerContent = styled.div`
width:80%;
margin:30px 0;
color:#021a67;
display:flex;
flex-direction:column;
align-items:center;
>h2{
    font-size:24px;
    text-align:center;
    margin:24px 0;
}
a{
    color:#021a67;
    font-weight:700;
}
h3{
    color:#3b99ed;
    width:60%;
    font-size:20px;
    margin:20px 0;
    text-align:center;
}
>p{
    color:#2b3f51;
    width:400px;
    text-align:justify;
    line-height:24px;
    font-size:16px;
    margin:20px 0 10px 0;
}
`
const UploadButton = styled.button`
position:fixed;
bottom:60px;
right:30px;
background-color: #021a67;
color:#FFFFFF;
font-size:20px;
margin:15px 0;
border:none;
border-radius:10px;
height:42px;
padding:0 20px;
box-sizing:border-box;
`

export {
    Container,
    InnerContent,
    UploadButton
}