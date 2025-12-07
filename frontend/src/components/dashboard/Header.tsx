import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, textDecoration: "none" }}
                    component={Link}
                    to="/"
                    color="inherit"
                >
                    Admin Panel
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/dashboard/users"
                        sx={{ textTransform: "none" }}
                    >
                        UserList
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/dashboard/records"
                        sx={{ textTransform: "none" }}
                    >
                        RecordList
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/dashboard/newrecord"
                        sx={{ textTransform: "none" }}
                    >
                        New Record
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
};
