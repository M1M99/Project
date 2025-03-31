import CarList from "./Components/Fetch/CarList"
import Header from "./Components/Page/Header"
import Footer from "./Components/Page/Footer"
import AdminSide from "./Components/Admin/AdminSide"
import ModelList from "./Components/Fetch/ModelList"
import Emp from "./Components/Emp"
import AddCar1 from "./Components/Fetch/AddCar1"
import AdminLayout from "./Components/Page/AdminLayout"
import GetCarByMake from "./Components/Fetch/GetCarByMake"
import Example from "./Components/Example/Example"

function App() {
    return (
        <div>
            <Header />
            <CarList />
            <ModelList />
            <Footer />
            <Emp />
            <Example/>
        </div>
    )
}

export default App