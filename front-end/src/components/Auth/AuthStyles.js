import styled from 'styled-components'


const AuthContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
img{
    height:200px;
    margin-top:60px;
    margin-bottom:10px;
}
h1 {
    font-size:30px;
    color:#000000;
    margin-top:10px;
    margin-bottom:120px;
}
a{
    text-decoration:none;
    color:#021a67;
    font-size:18px;
    margin:10px;
    margin-bottom:120px;
}
`

const Form = styled.form`
display:flex;
flex-direction:column;
align-items:center;
width:400px;
input {
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
button {
    background-color: #021a67;
    color:#FFFFFF;
    font-size:20px;
    margin:15px 0;
    border:none;
    border-radius:10px;
    width:40%;
    height:42px;
}

`


export {
    AuthContainer,
    Form
}