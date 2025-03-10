import { useEffect } from "react";
import { useState } from "react";

function Footer() {
    const [make, setMake] = useState([]);
    function GetMakes() {
        fetch("https://localhost:7038/api/Brand/GetAll").then(res => res.json()).then((data) => {
            var data1 = Object.values(data);
            setMake(data1);
        })
    }

    useEffect(() => {
        GetMakes();
    }, [])

    return (
        <div style={{}}>
                <ul className="make" >
                    {make.map((brand) => (
                        <div>
                            <li key={brand.id} className="make">
                                <a className="btnMake" href={`https://localhost:7038/api/Car/GetByBrandName?id=${brand.id}`}>{brand.name}</a>
                            </li>
                        </div>
                    ))
                    }
                </ul>
        </div>
    )
}

export default Footer;