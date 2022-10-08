import styled from "styled-components";


const SearchForm = styled.form`
width:40%;
display:flex;
input, select {
    background-color:#FFFFFF;
    font-family: 'Lexend', sans-serif;
    box-sizing:border-box;
    padding:5px 10px;
    height:38px;
    margin:4px 2px;
    font-size:18px;
    border:1px solid #021a67;
    border-radius:10px;
    color:#58728a;
}
input{
    width:100%;
}
@media (max-width: 600px) {
    width:100%;
    input,select{
    font-size:16px;
    height:34px;
    }
}
`

export {
    SearchForm
}