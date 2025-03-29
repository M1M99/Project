import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Emp() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Carousel interval={200}>
            <Carousel.Item>
                <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} // Set height and style
 src="https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMHIspMBvMZq6G5OtgSv31nBJaA4qh4NSEGewirQ91wRmWBi2Ow7gVdc0BtUlhDfzEPspAnPdjEiZJyNydlctBvoZ9nf8dXFWr6a%25JsewTRmWBi1%25k7gVdcF5XUlhDfu7dspAnPeAEiZkm69PTvmCT8ZVHE5AKfyUxtMlJ49pNmH" text="First slide" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} src="https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1080x624/dam/pnr/2024/Products/992-II/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg/jcr:content/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg" text="First slide" />
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Porsche/911/11757/1717680690776/front-left-side-47.jpg" text="First slide" />
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Emp;
