import { useEffect } from "react";
import { useState } from "react";
function Footer() {
    const [make, setMake] = useState([]);
    const [cars, setCars] = useState([]);
    function GetMakes() {
        fetch("https://localhost:7038/api/Brand/GetAll")
            .then(res => res.json())
            .then((data) => {
                setMake(data);
            })
    }

    function GetCarsById(brandId) {
        fetch(`https://localhost:7038/api/Car/GetByBrandName?id=${brandId}`).then((res) => res.json())
            .then(data => {
                setCars(data);
            })
    }

    useEffect(() => {
        GetMakes();
    }, [])

    return (
        <div className="grid grid-cols-4 gap-4 place-items-center">
            {make.map((brand) => (
                <li key={brand.id}>
                    <a className="btnMake" href={`https://localhost:7038/api/Car/GetByBrandId?id=${brand.id}`}>{brand.name}</a>
                    {/*<button className="btnMake" onClick={() => GetCarsById(brand.id)}>{brand.name}</button>*/}
                </li>
            ))
            }
        </div>

    )
}

export default Footer;