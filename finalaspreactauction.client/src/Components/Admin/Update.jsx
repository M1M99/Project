import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCarForm({ carId, carDetails, makes, models }) {
    const [car, setCar] = useState({
        id: carId,
        Branch: '',
        Country: '',
        Cylinder: '',
        Damage: '',
        Description: '',
        Engine: '',
        FuelType: '',
        Key: '',
        MakeId: 0,
        ModelId: 0,
        Otometer: '',
        Price: '',
        SaleDocument: '',
        Vin: '',
        Year: '',
        photo: null,
        video: null,
    });

    useEffect(() => {
        if (carDetails && carDetails.id === carId) {
            setCar({
                id: carId,
                Branch: carDetails.Branch || '',
                Country: carDetails.Country || '',
                Cylinder: carDetails.Cylinder || '',
                Damage: carDetails.Damage || '',
                Description: carDetails.Description || '',
                Engine: carDetails.Engine || '',
                FuelType: carDetails.FuelType || '',
                Key: carDetails.Key || '',
                MakeId: carDetails.MakeId || 0,
                ModelId: carDetails.ModelId || 0,
                Otometer: carDetails.Otometer || '',
                Price: carDetails.Price || '',
                SaleDocument: carDetails.SaleDocument || '',
                Vin: carDetails.Vin || '',
                Year: carDetails.Year || '',
                photo: null,
                video: null,
            });
        }
    }, [carDetails, carId]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prevCar) => ({
            ...prevCar,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'photo') {
            setCar((prevCar) => ({
                ...prevCar,
                photo: files[0],
            }));
        } else if (name === 'video') {
            setCar((prevCar) => ({
                ...prevCar,
                video: files[0],
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(car).forEach((key) => {
            if (car[key] !== undefined && car[key] !== null) {
                formData.append(key, car[key]);
            }
        });

        try {
            const response = await axios.put('https://localhost:7038/api/Car', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Car updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };

    return (
        <div>
            <h2>Update Car</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Branch"
                    value={car.Branch}
                    onChange={handleChange}
                    placeholder="Branch"
                />
                <input
                    type="text"
                    name="Country"
                    value={car.Country}
                    onChange={handleChange}
                    placeholder="Country"
                />
                <input
                    type="text"
                    name="Cylinder"
                    value={car.Cylinder}
                    onChange={handleChange}
                    placeholder="Cylinder"
                />
                <input
                    type="text"
                    name="Damage"
                    value={car.Damage}
                    onChange={handleChange}
                    placeholder="Damage"
                />
                <input
                    type="text"
                    name="Description"
                    value={car.Description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    name="Engine"
                    value={car.Engine}
                    onChange={handleChange}
                    placeholder="Engine"
                />
                <input
                    type="text"
                    name="FuelType"
                    value={car.FuelType}
                    onChange={handleChange}
                    placeholder="Fuel Type"
                />
                <input
                    type="text"
                    name="Key"
                    value={car.Key}
                    onChange={handleChange}
                    placeholder="Key"
                />
                <input
                    type="number"
                    name="Price"
                    value={car.Price}
                    onChange={handleChange}
                    placeholder="Price"
                />
                <input
                    type="number"
                    name="Otometer"
                    value={car.Otometer}
                    onChange={handleChange}
                    placeholder="Odometer"
                />
                <input
                    type="text"
                    name="SaleDocument"
                    value={car.SaleDocument}
                    onChange={handleChange}
                    placeholder="Sale Document"
                />
                <input
                    type="text"
                    name="Vin"
                    value={car.Vin}
                    onChange={handleChange}
                    placeholder="Vin"
                />
                <input
                    type="number"
                    name="Year"
                    value={car.Year}
                    onChange={handleChange}
                    placeholder="Year"
                />

                <div>
                    <label htmlFor="MakeId">Select Make:</label>
                    <select name="MakeId" value={car.MakeId} onChange={handleChange}>
                        <option value={0}>Select a Make</option>
                        {makes.map((make) => (
                            <option key={make.id} value={make.id}>
                                {make.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="ModelId">Select Model:</label>
                    <select name="ModelId" value={car.ModelId} onChange={handleChange}>
                        <option value={0}>Select a Model</option>
                        {models.map((model) => (
                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Upload Photo:</label>
                    <input type="file" name="photo" onChange={handleFileChange} />
                </div>

                <div>
                    <label>Upload Video:</label>
                    <input type="file" name="video" onChange={handleFileChange} />
                </div>

                <button type="submit">Update Car</button>
            </form>
        </div>
    );
}

export default UpdateCarForm;
