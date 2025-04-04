import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../Page/Footer";

const GetPP = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7038/api/Car/GetP/P")
            .then((res) => {
                setCars(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h3>Best Top {cars.length} Cars</h3>
            {cars.map((car) => (
                <div key={car.id}>
                    <ul>
                        <li>
                            <img src={car.imageUrl} />
                            <h1>{car.id}</h1>
                            <h1>{car.year}</h1>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GetPP;
