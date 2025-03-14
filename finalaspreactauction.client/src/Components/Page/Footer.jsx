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
        <div style={{ border: "2px solid aqua", margin: "5px", borderRadius:"5px" }}>
        <h5>Makes :</h5>
            <ul className="make" >
                {make.map((brand) => (
                    <li key={brand.id} className="make">
                        <a className="btnMake" href={`https://localhost:7038/api/Car/GetByBrandName?id=${brand.id}`}>{brand.name}</a>
                        {/*<button className="btnMake" onClick={() => GetCarsById(brand.id)}>{brand.name}</button>*/}
                    </li>
                ))
                }
            </ul>
        </div>

    )
}

export default Footer;