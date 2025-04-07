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
import App1 from "./Components/Example/DarkMode"
import UpdateModelForm from "./Components/Admin/UpdateModel"
import Fooo2 from "./Components/Example/Emps"
import AnimatedButton from "./Components/Example/salam"
import Salam from "./Components/Example/salam"
import App122 from "./Components/Example/salam123"
import GetCarById from "./Components/Example/salam123"
import CarouselForDetails from "./Components/Example/carousel"
import BookmarkToggle from "./Components/Example/svgg"
import Auction from "./Components/Auction/AuctionHandle"
import App111 from "./Components/Example/NewJsx"
/*import Dark from "./Components/Example/hahsdas"*/
//import FileUpload from "./Components/Example/UploadFile"


function App() {
    return (
        <div>
            {/*<App111/>*/}
            <Header />
            <CarList />
            <ModelList />
            <Auction/>
            <Emp />
            <Example />
            {/*<App1 />*/}
            {/*<ThreeDCardDemo/>*/}
            {/*<FileUpload/>*/}
            {/*<Fooo2/>*/}
            {/*<Salam />*/}
            <CarouselForDetails />
            <Footer />
        </div>
    )
}

export default App