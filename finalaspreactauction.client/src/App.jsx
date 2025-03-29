import CarList from "./Components/Fetch/CarList"
import Header from "./Components/Page/Header"
import Footer from "./Components/Page/Footer"
import AdminSide from "./Components/Admin/AdminSide"
import ModelList from "./Components/Fetch/ModelList"
import Emp from "./Components/Emp"
import AddCar1 from "./Components/Fetch/AddCar1"

function App() {
    return (
        <div>
            <Header />
            <CarList />
            <ModelList />
            <Footer />
            <AdminSide />
            <AddCar1 />
            <Emp />
        </div>
    )
}

export default App