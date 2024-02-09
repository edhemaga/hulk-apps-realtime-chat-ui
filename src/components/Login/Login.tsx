import { FC, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../shared/network/axios";

import { TextField, Button, Container, Grid } from "@mui/material";

const Login: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await axiosInstance.post("/user/login", {
      username: email,
      password: password,
    });
    if (response.data) {
      localStorage.setItem("access_token", response.data);
      navigate("/");
    }
  };
  return (
    <div className="h-screen flex">
      <Container className="m-auto" maxWidth="sm">
        <div className="pt-1 pb-1 text-3xl font-bold">Login to chat!</div>
        <div className="pt-1 pb-3">Please enter your credentials.</div>
        <Grid container spacing={2}>
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
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
