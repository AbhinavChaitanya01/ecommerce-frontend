import React, { useContext, useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import LogContext from '../contexts/logContext';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const {setLog,setIsSeller,setEmail} = useContext(LogContext);

    const url = "https://e-commerce-cyan-nine.vercel.app/api";
    const [userCredentials, setUserCredentials] = useState({ buyerName: "", ownerName: "", vendorName: "", email: "", password: "", type: "Buyer" });

    const handleChange = (e) => {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(userCredentials)
            const endpoint = userCredentials.type === "Buyer" ? `${url}/buyers/signUp` : `${url}/sellers/sellersignup`;
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userCredentials),
            });
            const res = await response.json();
            console.log(res);
            if (res.status) {
                localStorage.setItem("Token", res.token);
                setLog(true);
                if(userCredentials.type === "Seller") setIsSeller(true);
                else setIsSeller(false);
                setEmail(userCredentials.email);
                navigate('/');

            } else {
                console.log(res.message);
            }
        } catch (error) {
            console.log(error);
        }
        setUserCredentials({ buyerName: "", ownerName: "", vendorName: "", email: "", password: "", type: "Buyer" });
    };

    return (
        <div className="container my-4 w-50">
            <h2 className="text-center custom-font">SignUp</h2>
            <form>
                <TextField
                    select
                    label="Select Account Type"
                    onChange={handleChange}
                    fullWidth
                    className="mb-3"
                    variant="filled"
                    value={userCredentials.type}
                    name="type"
                >
                    <MenuItem value="Buyer">Customer</MenuItem>
                    <MenuItem value="Seller">Seller</MenuItem>
                </TextField>

                <TextField
                    label={userCredentials.type === "Buyer" ? "Customer's Name" : "Seller's Name"}
                    className="mb-3"
                    onChange={handleChange}
                    fullWidth
                    variant="filled"
                    name={userCredentials.type === "Buyer" ? "buyerName" : "ownerName"}
                    value={userCredentials.type === "Buyer" ? userCredentials.buyerName : userCredentials.ownerName}
                />

                {userCredentials.type !== "Buyer" && (
                    <TextField
                        label="Vendor's Name"
                        className="mb-3"
                        onChange={handleChange}
                        fullWidth
                        variant="filled"
                        name="vendorName"
                        value={userCredentials.vendorName}
                    />
                )}

                <TextField
                    label="Email"
                    onChange={handleChange}
                    fullWidth
                    variant="filled"
                    name="email"
                    value={userCredentials.email}
                />
                <div id="emailHelp" className="form-text mb-3">We'll never share your email with anyone else.</div>

                <TextField
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    fullWidth
                    className="mb-3"
                    variant="filled"
                    name="password"
                    value={userCredentials.password}
                />
                <div className='text-center'>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;
