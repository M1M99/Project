import logo from "C:/Users/ASUS/source/repos/FinalAspReactAuction/finalaspreactauction.client/src/assets/AuctIon.png";

function Header() {
    return (
        <header >
            <section>
                <img src={logo} alt="React logo" width="90px" height="90px" />
                <span id="title">Online Car Auction</span>
            </section>
        </header>
    );
}

export default Header;
