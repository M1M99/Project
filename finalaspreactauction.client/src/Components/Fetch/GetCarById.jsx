import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Col, Divider, Row, message } from 'antd';
import axios from 'axios';
import BookmarkToggle from '../Example/Bookmark';

const style = { background: '#0092ff', padding: '8px 2px', borderRadius: "5px" };

const GetCarById = () => {
    const { id } = useParams();  
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`https://localhost:7038/api/Car/GetById?id=${id}`) 
            .then((res) => {
                setCarData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch car data');
                setLoading(false);
                message.error('Error fetching data');
            });
    }, [id]); 

    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    return (
        <>
            <Divider orientation="left">Car Details</Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={10}>
                    <img src={carData.imageUrl} alt={carData.vin} />
                    <Row style={{ width: "120px", height: "auto" }}> {/*or Col*/}
                        <video muted autoPlay src={carData.videoUrl}></video>
                    </Row>
                </Col>
                <Col className="gutter-row" span={7}>
                    <div style={style}>
                        <span style={{ borderLeft: "2px solid red" }}>VEHICLE INFORMATION</span>
                        <h4>{carData?.country}</h4>
                        <p>{carData?.description}</p>
                        <p>Price: {carData?.price}</p>
                        <p>{carData?.fuelType}</p>
                        <p>{carData?.engine}</p>
                        <p>{carData?.damage}</p>
                    </div>
                </Col>
                <Col className="gutter-row" span={7}>
                    <div style={style}>
                        <span>BID INFORMATION</span>
                        <BookmarkToggle />
                    </div>
                </Col>
            </Row>
        </>
    );

};

export default GetCarById;
