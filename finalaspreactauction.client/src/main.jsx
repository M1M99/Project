import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Account from './Account/Account';

createRoot(document.getElementById('root')).render(
    <StrictMode>    
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} key={location.key} />
                <Route path="/login" element={<Account />} key={location.key} />
        </Routes>
        </BrowserRouter>
    </StrictMode>
)
