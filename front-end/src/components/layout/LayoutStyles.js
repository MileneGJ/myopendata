import styled from 'styled-components'

const Container = styled.div`
margin:100px 0;
display:flex;
flex-direction:column;
align-items:center;
.fileDescription{
    h2,p{
    width:100%;
    max-width:900px;
    text-align: justify;
    }
    a{
        font-size:16px;
    }
}
@media (max-width: 600px) {
    margin-top:70px;
}
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
    font-size:20px;
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
    width:100%;
    max-width:500px;
    text-align:justify;
    word-wrap: break-word;
    line-height:24px;
    font-size:16px;
    margin:20px 0 10px 0;
}
`

const HeaderSpan = styled.span`
position: fixed;
top:0;
left:0;
width:100%;
height: 90px;
display: flex;
justify-content:space-between;
padding:10px 40px;
box-sizing:border-box;
align-items:center;
background-color: #FFFFFF;
img {
    height:70px;
    cursor: pointer;
}

@media (max-width:600px) {
    input, select{
        display:none;
    }
}
`

const FooterSpan = styled.span`
display: none;
position: fixed;
bottom:0;
left:0;
width:100%;
height: 70px;
padding:10px 40px;
box-sizing:border-box;
background-color: #FFFFFF;

@media (max-width: 600px) {
    display: flex;
    justify-content:center;
    align-items:center;
}
`

export {
    Container,
    InnerContent,
    HeaderSpan,
    FooterSpan
}