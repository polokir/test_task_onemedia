import React, { useState } from "react";
import {
    Container,
    Paper,
    Box,
    TextField,
    Button,
    Typography,
    Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Header } from "../dashboard/Header";
import { recordsService } from "../../services/recordsService";
import {useAuth} from "../../contexts/AuthContext";
import {Record} from "../../types/records.types";
export const NewRecord: React.FC = () => {
    const {user} = useAuth();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!user) return;
            await recordsService.createRecord({
                user_id: user.id,
                title,
                content,
            } as Record);
            setTitle("");
            setContent("");
            navigate("/dashboard/records");
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || "Failed to create record");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h5" mb={2} textAlign="center">
                        New Record
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            fullWidth
                            margin="normal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <TextField
                            label="Content"
                            fullWidth
                            margin="normal"
                            multiline
                            minRows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Create record"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};
