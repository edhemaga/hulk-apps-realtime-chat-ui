import { FC, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../shared/network/axios";

import { TextField, Button, Container, Grid } from "@mui/material";

const Login: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginStatus, setLoginStatus] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username: email,
        password: password,
      });
      if (response.data) {
        localStorage.setItem("access_token", response.data);
        navigate("/");
      }
    } catch (err) {
      setEmail('');
      setPassword('');
      setLoginStatus('Login unsuccessful! Please try again!')
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
          <div className="block pt-4 pl-4">
            {loginStatus && <div className="my-2 text-red-600">{loginStatus}</div>}
            <div>No account? <a href="register">Register here</a>.</div>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
