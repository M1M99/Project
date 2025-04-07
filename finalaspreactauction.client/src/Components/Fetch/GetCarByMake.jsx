import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./../Page/Header";
import GetPP from "./GetPricePerformanceCars";
import Footer from "../Page/Footer";

const GetCarByMake = () => {
    const { id } = useParams();
    const [cars, setCars] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!id) {
            setError("No makeId provided");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const brandResponse = await axios.get(`https://localhost:7038/api/Brand/GetById?id=${id}`);
                setBrandName(brandResponse.data.name);

                const carsResponse = await axios.get(`https://localhost:7038/api/Car/GetByBrandId?id=${id}`);
                setCars(carsResponse.data);

            } catch (err) {
                setError("Failed to fetch data");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);





    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header />
            <div className="carPages">
                {cars.length === 0 ? (
                    <GetPP />
                ) : (
                    <>
                        <h2>Cars for Brand: {brandName || "Loading brand name..."}</h2>
                        <ul className="flex flex-wrap">
                            {cars.map((car) => (
                                <li key={car.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                                    <img
                                        src={car.imageUrl || "path/to/default-image.jpg"}
                                        alt={car.makeId}
                                        className="w-full h-auto object-cover"
                                    />
                                    {/*<h5>{brandName}</h5>*/}
                                    <h5>{car.makeId}</h5>
                                    <h5>{car.id}</h5>
                                    <h5>Year : {car.year}</h5>
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default GetCarByMake;
