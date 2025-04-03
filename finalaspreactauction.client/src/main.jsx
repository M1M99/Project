import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Account from './Account/Account';
import AddCar1 from './Components/Fetch/AddCar1';
import AdminSide from './Components/Admin/AdminSide';
import CarList from './Components/Fetch/CarList';
import AdminLayout from './Components/Page/AdminLayout';
import NotFound from './Components/Page/NotFound';
import GetCarByMake from './Components/Fetch/GetCarByMake';
import UpdateMakeForm from './Components/Admin/UpdateMake';
import UpdateModelForm from './Components/Admin/UpdateModel';
import ResponsiveAutoExample from './Components/Example/ResponsiveAutoExample';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} key={location.key} />
                <Route path="/login" element={<Account />} key={location.key} />
                <Route path="/adminside" element={<div className="m-2 flex flex-row px-3 gap-2">
                    {<AdminSide />}
                    {<AddCar1 />}
                    <a style={{ fontSize: "25px", textDecoration: "none", color: "#000" }} href="/delete">Delete</a>
                </div>} key={location.key} />
                <Route path="/addNew" element={<><AdminLayout /> <AddCar1 /></>} key={location.key} />
                <Route path="/delete" element={<CarList />} key={location.key} />
                <Route path="/addmakeormodel" element={<AdminSide />} key={location.key} />
                <Route path="/UpdateMakeForm" element={<UpdateMakeForm />} key={location.key} />
                <Route path="/UpdateModel" element={<UpdateModelForm />} key={location.key} />
                <Route path="/admin" element={
                    <div> <AdminLayout /> <ResponsiveAutoExample/></div>
                }/>
                <Route path={`/getCarByBrand/:id`} element={<GetCarByMake />} key={location.key}></Route>
                <Route path="*" element={<NotFound />} key={location.key}></Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
