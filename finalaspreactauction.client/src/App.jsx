import React from "react"
import './index.css'
import CarList from "./Components/Fetch/CarList"
import Header from "./Components/Page/Header"
import Footer from "./Components/Page/Footer"
import AdminSide from "./Components/Admin/AdminSide"
import ModelList from "./Components/Fetch/ModelList"
//import Account from "./Components/Account/Account"
//import MakeList from "./Components/Fetch/MakeList"

function App() {
    return (
        <div>
            <Header />
            <CarList />
            {/*<MakeList/>*/}
            <AdminSide />
            <ModelList />
            <Footer />
            {/*<Account/>*/}
        </div>
    )
}

export default App