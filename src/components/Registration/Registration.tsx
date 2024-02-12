import { FC, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../shared/network/axios";

import { TextField, Button, Container, Grid } from "@mui/material";
import { IUserRegistration } from "../../shared/models/User/IUser";

const Registration: FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const [registrationStatus, setRegistrationStatus] = useState<string>("");


    const handleRegister = async () => {
        try {
            if (password !== confirmedPassword) {
                setRegistrationStatus('Password do not match!')
                return
            };
            const response = await axiosInstance.post("/user/register", {
                name,
                surname,
                email,
                password,
                confirmedPassword
            });
            if (response.data) {
                navigate("/login");
            }
        } catch (err) {
            setName('');
            setSurname('');
            setEmail('');
            setPassword('');
            setConfirmedPassword('');
            setRegistrationStatus('Registration unsuccessful! Please try again!')
        }
    };

    return (
        <div className="h-screen flex">
            <Container className="m-auto" maxWidth="sm">
                <div className="pt-1 pb-1 text-3xl font-bold">Register</div>
                <div className="pt-1 pb-3">Please fill the missing fields.</div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="First name"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Last name"
                            type="text"
                            fullWidth
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email/Username"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Confirm password"
                            type="password"
                            fullWidth
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleRegister}>
                            Submit
                        </Button>
                    </Grid>
                    <div className="block pt-4 pl-4">
                        {registrationStatus && <div className="my-2 text-red-600">{registrationStatus}</div>}
                    </div>
                </Grid>
            </Container>
        </div>
    );
};

export default Registration;
