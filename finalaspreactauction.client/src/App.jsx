import React from "react"
import CarList from "./Components/Fetch/CarList"
import Header from "./Components/Page/Header"
import Footer from "./Components/Page/Footer"
import AdminSide from "./Components/Admin/AdminSide"
import ModelList from "./Components/Fetch/ModelList"
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
        </div>
    )
}

export default App