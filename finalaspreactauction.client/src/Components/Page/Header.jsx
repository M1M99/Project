import { useEffect, useState } from "react";
import logo from "../../assets/auction.png";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import './../../index.css'
import { Link } from 'react-router-dom';

function Header({ adminName}) {
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    const Image = styled.img`
        width: 80px;
        height: 80px;
        border-radius: 50%;
    `;

    const Nav = styled.nav`
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
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);

        navigate('/login');
    };
    return (
        <>
            <header>
                <Nav>
                    <Image src={logo} alt="Logo" />
                    <Span id="title"><Link to="/#">Online Car Auction</Link></Span>
                    {!isAuthenticated ? (
                        <button className="navBtn" id="login" style={{ marginLeft: "auto" }} onClick={() => setShowLogin(true)}>Log in</button>)
                        :
                        (<button className="navBtn" onClick={handleLogout} style={{ marginLeft: "auto" }}>Log out<span style={{ display: "flex", justifyContent: "center", fontSize: "0.5rem" }}>{adminName}</span></button>)
                    }</Nav>
            </header>
        </>
    );
}

export default Header;
