import styled from 'styled-components'

const Container = styled.div`
margin-top:120px;
display:flex;
flex-direction:column;
align-items:center;
`
const ListContainer = styled.ul`
width:80%;
margin:30px 0;
color:#021a67;
display:flex;
flex-direction:column;
align-items:center;
h2{
    font-size:24px;
    line-height:40px;
}
a{
    color:#021a67;
    font-weight:700;
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
    ListContainer,
    UploadButton
}