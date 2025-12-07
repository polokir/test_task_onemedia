import React, { useEffect } from "react";
import {Header} from "../components/dashboard/Header";
import {Container} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";


export const DashboardPage: React.FC = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    console.log(user);

    useEffect(()=>{
        if (!user) {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <Container>
                <Header/>
            </Container>

        </div>
    )
}