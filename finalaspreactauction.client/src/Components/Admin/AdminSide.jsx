import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddModel from "./AdminSideAddModel";
import Header from "../Page/Header";

function AdminSide() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Adminname, setAdminname] = useState('');
    const [token, setToken] = useState(null);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);



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

                setTimeout(() => {
                    setResponse(null);
                    setName('')
                    setDescription('')
                },10000)
            } else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (error) {
            setError("Error: Could not connect to the server.");
            console.error("Error: ", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);

                const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                const userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

                setUserRole(role);
                console.log(role);

                if (role === 'Admin') {
                    setAdminname(userName);
                    setToken(token);
                } else {
                    setError("You are not admin.");
                    navigate("/#");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setError("Invalid token.");
                navigate("/#");
            }
        } else {
            setError("You need to log in first.");
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            {console.log(userRole)}
            {userRole === "Admin" && (
                <div>
                    {/*<Header adminName={Adminname} />*/}
                    <h2 id="adminSideName">Welcome {Adminname}</h2>
                    <AddModel/>
                    <h3 style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>{!flag ? "Add New Make" : "Cancel"}</h3>
                    {flag && <Form onSubmit={handleSubmit} className="forEdit">
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
                    }
                    {response && (
                        <div>
                            {console.log(response)}
                            <h3>Make Added Successfully</h3>
                            <p>Name: {response.name}</p>
                            {
                                response.description !== '' && (<p>Description: {response.description}</p>)}
                        </div>
                    )}

                    {error && (
                        <div style={{ color: "red", marginTop: "10px" }}>
                            <p>{error}</p>
                        </div>
                    )}
                </div>)}
        </>
    );
}

export default AdminSide;
