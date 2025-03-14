import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
function AdminSide() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); 
        setError(null); 

        const makeData = {
            name: name,
            description: description
        };

        try {
            const res = await fetch("https://localhost:7038/api/Brand/AddMake", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(makeData),
            });

            if (res.ok) {
                const data = await res.json();
                setResponse(data);
            } else {
                setError(`Error: ${res.statusText}`); 
            }
        } catch (error) {
            setError("Error: Could not connect to the server.");
            console.error("Error: ", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div>
            <h3>Add New Make</h3>
            <Form onSubmit={handleSubmit} className="forEdit">
                <Form.Group className="mb-3" controlId="formBasicName" style={{ padding: "0 5px" }}>
                    <Form.Label style={{ fontFamily: "sans-serif" }}>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription" style={{ padding: "0 5px" }}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    style={{ display: "block", width: "50%", margin: "0 auto" }}
                    disabled={loading} 
                >
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </Form>

            {response && (
                <div>
                    <h3>Make Added Successfully</h3>
                    <p>Name: {response.name}</p>
                    <p>Description: {response.description}</p>
                </div>
            )}

            {error && (
                <div style={{ color: "red", marginTop: "10px" }}>
                    <p>{error}</p> {/* Display error message */}
                </div>
            )}
        </div>
    );
}

export default AdminSide;
