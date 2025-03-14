import { useEffect, useState } from "react";
import logo from "../../assets/auction.png";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import './../../index.css'
function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();
    const Image = styled.img`
        width: 80px;
        height: 80px;
        border-radius: 50%;
    `;

    const Container = styled.div`
        margin: 1px 3px;
        height: 82px;
        background-color: #121825;
        border-radius: 10px;
        padding: 0 15px;
        display: flex;
        align-items: center;
    `;

    const Span = styled.span`
        color: #a9d6e5;
        font-size: 22px;
        font-weight: 600;
        cursor: pointer;
    `;

    useEffect(() => {
        if (showLogin) {
            navigate("/login");
        }
    }, [showLogin, navigate])

    return (
        <>
            <header>
                <Container>
                    <Image src={logo} alt="Logo" />
                    <Span id="title">Online Car Auction</Span>
                    <Span style={{ marginLeft: "auto" }} onClick={() => setShowLogin(true)}>Log in</Span>
                </Container>
            </header>
        </>
    );
}

export default Header;
