import logo from "../../assets/auction.png";
import styled from "styled-components"
function Header() {
    const Image = styled.img`
        width:80px;
        height:80px;
        border-radius:50%;
    `

    const Container = styled.div`
        margin:1px 3px;
        height:82px;
        background-color:#121825;
        border-radius: 10px;
        padding:0 15px;
        display:flex;
        //flex-wrap:wrap;
        align-items:center;
        //justify-content: space-between;
    `

    const Span = styled.span`
          color: #a9d6e5;
          font-size: 22px;
          font-weight: 600;  
    `
    return (
        <header >
            <Container>
                <Image src={logo} alt="Logo" />
                <Span id="title">Online Car Auction</Span>
            </Container>
        </header>
    );
}

export default Header;
