import React, { useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {Alert, Box, Button, CircularProgress, Container, Paper, TextField, Typography} from "@mui/material";

export const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(formData);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" textAlign="center" mb={3}>
                    Sign Up
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={(e) => setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))}
                        required
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))}
                        required
                    />

                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        margin="normal"
                        name="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))}
                        required
                    />

                    <TextField
                        label="Last Name"
                        type="text"
                        fullWidth
                        margin="normal"
                        name="last_name"
                        value={formData.last_name}
                        onChange={(e) => setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Login"}
                    </Button>

                    <Typography component="p" align="center" sx={{ mt: 1 }}> If you already have an account go to <NavLink to={'/login'}>Sign In</NavLink> </Typography>
                </Box>
            </Paper>
        </Container>
    )
};