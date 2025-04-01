import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import Loading from './Loading';
import { Button } from 'bootstrap';
import axios from '../../../../node_modules/axios/index';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UpdateCarForm from '../Admin/Update';
import { Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const CarList = () => {
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

    const filteredCars = cars.filter(car =>
        car.vin.toLowerCase().includes(search.toLowerCase()) ||
        getMakeName(car.makeId).toLowerCase().includes(search.toLowerCase()) ||
        getModelName(car.modelId).toLowerCase().includes(search.toLowerCase()) ||
        car.year.toString().includes(search)
    );

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
        <Container id="container">
            {/*{console.log(cars)}*/}
            <div className='inputDiv'>
                {userrole === "Admin" && (<FontAwesomeIcon icon={faPenToSquare} className="editForAdminIcon" onClick={() => { editHandle() }} />)}
                <FontAwesomeIcon style={{ display: "flex", width: "30px", height: "30px", margin: "auto 3px" }} className="iconSearch" icon={faSearchengin} />
                <input
                    onChange={(ev) => setSearch(ev.target.value)}
                    value={search}
                    className='inputSeach'
                    type="text"
                    placeholder='Search'
                />
            </div>

            {cars.length === 0 ? (
                <Loading />
            ) : (
                filteredCars.length === 0 ? (
                    <p>No Cars Found</p>
                ) : (
                    filteredCars.map((car) => (
                        <div className="flex" id="listofcar" key={car.id}>
                            <div id="imgCar" className="w-[250px]"><img src={car.imageUrl} alt={car.vin} /></div>
                            <div id="detailscars" className="w-xl flex justify-between">
                                <table className="table-auto m-2">
                                    <thead>
                                        <tr>
                                            <th>Details </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{getMakeName(car.makeId)}</td>
                                            <td>{getModelName(car.modelId)}</td>
                                            <td>{car.year}</td>
                                        </tr>
                                        <tr>
                                            <td><p id="damage">{car.damage}</p></td>
                                            <td><p id="typeofFuel">{car.fuelType}</p></td>
                                            <td>{car.otometer}</td>
                                        </tr>
                                        <tr>
                                            <td>{car.country}</td>
                                            <td>{car.vin}</td>
                                            <td>{car.engine}L</td>
                                            {userrole === "Admin" && editBtn && (
                                                <div>
                                                    <td id="edit" className="absolute right-50">
                                                        {/*<button onClick={() => update(car.id)} className="btn btn-primary">*/}
                                                        {/*    Update*/}
                                                        {/*</button>*/}
                                                        <Tooltip title="Edit">
                                                            <IconButton onClick={() => update(car.id)}>
                                                                <ModeEditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                    <td id="delete" className="absolute right-10">
                                                        {/*<button onClick={() => handleAction(car.id)} className="btn btn-primary">*/}
                                                        {/*    Delete*/}
                                                        {/*</button>*/}
                                                        <Tooltip title="Delete">
                                                            <IconButton onClick={() => handleAction(car.id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                </div>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )
            )}

            {carIdToUpdate && selectedCarDetails && editBtn && (
                <UpdateCarForm carId={carIdToUpdate} carDetails={selectedCarDetails} makes={makes} models={models} />
            )}
        </Container>
    );
};

const Container = styled.div`
    margin: 0 10px;
    padding: 0 10px;
    padding-bottom: 10px;
    border-radius: 3px;
    background-color: #8ecae6;
`;

export default CarList;
