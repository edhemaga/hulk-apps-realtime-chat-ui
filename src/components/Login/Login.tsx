// Login.tsx

import { FC, useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';

interface LoginProps {
    onLogin: (email: string, password: string) => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // You can perform validation here before calling onLogin
        onLogin(email, password);
    };

    return (
        <div className='h-screen flex'>
            <Container className='m-auto' maxWidth="sm">
                <div className='pt-1 pb-1 text-3xl font-bold'>Login to chat!</div>
                <div className='pt-1 pb-3'>Please enter your credentials.</div>
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
