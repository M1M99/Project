import React, { useEffect, useState } from 'react';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const url1 = "https://localhost:7038/api/Car/Cars";

    useEffect(() => {
        fetch(url1)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);

                const carArray = Object.values(res);
                setCars(carArray);
            })
            .catch((error) => {
                console.error("Error data:", error);
                setCars([]);
            });
    }, []);

    return (
        <div>
            {cars.length === 0 ? (
                <strong>Loading...</strong>
            ) : (
                cars.map((car) => (
                    <li key={car.id}>
                        <div>
                            <p style={{ color: "brown", fontWeight: "bold", lineHeight: "40px", letterSpacing: "1px", fontSize: "20px" }}>
                                {car.id}. {car.make.name} {car.model.name} {car.year}
                            </p>
                        </div>
                    </li>
                ))
            )}
        </div>
    );
};

export default CarList;
