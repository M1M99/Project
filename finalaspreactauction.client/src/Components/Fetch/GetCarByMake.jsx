import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // useParams'ý import ettik
import axios from "axios";  // Axios'u import ettik
import Header from "./../Page/Header"
const GetCarByMake = () => {
    const { id } = useParams();  // URL'deki 'id' parametresini alýyoruz
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("No makeId provided");
            setLoading(false);
            return;
        }

        setLoading(true);

        axios
            .get(`https://localhost:7038/api/Car/GetByBrandId?id=${id}`)
            .then((res) => {
                setCars(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch data");
                setLoading(false);
                console.log(err);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
        <Header/>
            <h2>Cars for Brand {id}</h2>
            <ul className="flex flex-wrap">
                {cars.map((car) => (
                    <li key={car.id}>
                        <img src={car.imageUrl} />
                        <h5>{car.makeId}</h5>
                        <h5>{car.id}</h5>
                        <h5>Year : {car.year}</h5>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetCarByMake;
