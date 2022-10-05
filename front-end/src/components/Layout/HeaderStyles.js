import styled from 'styled-components'

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

>div:last-child{
    width:100px;
    p:first-child{
        color:#021a67;
        font-size:20px;
        line-height:30px;
    }
    position:fixed;
    right:40px;
    top:26px;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    align-items:center;
    border-bottom:${({visible})=>visible?'none':'3px solid #3b99ed'};
}
`

const UserOptions = styled.div`
    background-color:#FFFFFF;
    display:${({visible})=>visible?'flex':'none'};
    flex-direction:column;
    font-size:16px;
    text-align:center;
    padding:4px 0;
    color:#3b99ed;
    a{
        color:#3b99ed;
        text-decoration:none;
        margin:5px 0;
    }
    p{
        margin:5px 0;
    }
    border-top:${({visible})=>visible?'3px solid #3b99ed':'none'};
`


export {
    HeaderSpan,
    UserOptions
}