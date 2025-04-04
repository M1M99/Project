import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from '../../../../node_modules/axios/index';
import React, { Fragment } from 'react';


function ResponsiveAutoExample() {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [search, setSearch] = useState('');
    const [userrole, setUserRole] = useState('');
    const navigate = useNavigate();
    const [carIdToUpdate, setCarIdToUpdate] = useState(null);
    const [selectedCarDetails, setSelectedCarDetails] = useState(null);

    const [editBtn, setEditBtn] = useState(false);

    const update = (carId) => {
        setCarIdToUpdate(carId);
        const carToUpdate = cars.find(car => car.id === carId);
        setSelectedCarDetails(carToUpdate);
    }


    const carUrl = "https://localhost:7038/api/Car/Cars";
    const makeUrl = "https://localhost:7038/api/Brand/GetAll";
    const modelUrl = "https://localhost:7038/api/Model/GetAllModel";

    useEffect(() => {
        fetch(carUrl)
            .then((response) => response.json())
            .then((res) => {
                setCars(res);
            })
            .catch((error) => {
                console.error("Error fetching car data:", error);
                setCars([]);
            });

        fetch(makeUrl)
            .then((response) => response.json())
            .then((res) => {
                setMakes(res);
            })
            .catch((error) => {
                console.error("Error fetching makes data:", error);
                setMakes([]);
            });

        fetch(modelUrl)
            .then((response) => response.json())
            .then((res) => {
                setModels(res);
            })
            .catch((error) => {
                console.error("Error fetching models data:", error);
                setModels([]);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                setUserRole(role);
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate("/#");
            }
        } else {
            navigate("/");
        }
    }, [navigate]);

    const getMakeName = (makeId) => {
        const make = makes.find(m => m.id === makeId);
        return make ? make.name : "Unknown Make";
    };

    const getModelName = (modelId) => {
        const model = models.find(m => m.id === modelId);
        return model ? model.name : "Unknown Model";
    };

    const handleAction = (carId) => {
        axios.delete("https://localhost:7038/api/Car/DeleteById", {
            headers: null,
            params: { id: carId }
        })
            .then(() => {
                fetch(carUrl)
                    .then((response) => response.json())
                    .then((res) => {
                        setCars(res);
                    })
            })
    };

    const editHandle = () => {
        setEditBtn(!editBtn);
    };

    return (
        <Container className="bg-[#3B3C36] p-3 rounded-3 mt-3">
            <Row>
                {console.log(cars)}
                {cars.map((res) => (
                    <React.Fragment key={res.id}>
                        <Col sm={4}>
                            <img src={res.imageUrl} alt="Car" className="img-fluid rounded-sm" />
                        </Col>
                        <Col sm={4}>
                            <h5>{res.year}</h5>
                            <h5>{res.branch}</h5>
                        </Col>
                        <Col sm={4}>
                            <div>
                                <h5>{res.country}</h5>
                                <h5>{res.fuelType}</h5>
                            </div>
                        </Col>
                    </React.Fragment>
                ))}
            </Row>
        </Container>

    );
}

export default ResponsiveAutoExample;