import { useEffect } from "react";
import { useState } from "react";
import GetCarByMake from "../Fetch/GetCarByMake";
import { Link } from "react-router-dom";
import { QRCode } from 'antd';

function Footer() {
    const [make, setMake] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    function GetMakes() {
        fetch("https://localhost:7038/api/Brand/GetAll")
            .then(res => res.json())
            .then((data) => {
                setMake(data);
            });
    }

    useEffect(() => {
        GetMakes();
    }, []);

    const handleCar = (makeId) => {
        setSelectedId(makeId)
    }


    return (
        <div className="grid grid-cols-4 gap-4 place-items-center" id="footer">
            {make.map((brand) => (
                <li key={brand.id}>
                    <Link
                        to={`/getCarByBrand/${brand.id}`}
                        onClick={() => handleCar(brand.id)}
                    >
                        {brand.name}
                    </Link>
                </li>
            ))
            }
            <div>
            <QRCode
                errorLevel="H"
                value="https://localhost:50007/"
                icon="https://static.thenounproject.com/png/1025889-200.png"
                style={{
                    width:"150px",
                    marginLeft: "auto",
                    maxWidth: "50%",
                    height: "auto",
                }}
                />
            </div>
            {selectedId && <GetCarByMake makeId={selectedId} />}
        </div>

    )
}

export default Footer;