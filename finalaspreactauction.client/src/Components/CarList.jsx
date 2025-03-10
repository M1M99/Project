import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const CarList = () => {
    const Container = styled.div`
        margin:0 10px;
        padding:0 10px;
        border-radius:3px;
        background-color:#8ecae6;
    `
    
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
        <Container>
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
        </Container>
    );
};

export default CarList;
