import styled from 'styled-components'


const AuthContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
img{
    width:100%;
    max-width:400px;
    margin-top:60px;
    margin-bottom:10px;
}
h1 {
    font-size:30px;
    text-align:center;
    color:#000000;
    margin-top:10px;
    margin-bottom:120px;
}
a{
    text-decoration:none;
    text-align: center;
    color:#021a67;
    font-size:18px;
    margin:10px;
    margin-bottom:120px;
}
.auth > input {
    max-width: 400px;
}
@media (max-width: 600px) {
    padding:0 50px;
    box-sizing: border-box;
    h1{
    font-size:26px;
    }
}
`

const Form = styled.form`
display:flex;
flex-direction:column;
align-items:center;
width:100%;
max-width:500px;
input, textarea {
  font-family: 'Lexend', sans-serif;
  width:100%;
  box-sizing:border-box;
  padding:5px 10px;
  height:42px;
  margin:4px 0;
  font-size:20px;
  border:1px solid #021a67;
  border-radius:10px;
  color:#58728a;
}
textarea{
    height:auto;
}
button {
    background-color: #021a67;
    color:#FFFFFF;
    font-size:20px;
    font-weight: 700;
    margin:15px 0;
    border:none;
    border-radius:10px;
    padding:0 20px;
    box-sizing:border-box;
    height:42px;
}

@media (max-width: 600px) {
    input,textarea,button{
    font-size:16px;
    }
    input,button{
    height:34px;
    }
}
`


export {
    AuthContainer,
    Form
}