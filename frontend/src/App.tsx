import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { PrivateRoute } from './components/layouts/PrivateRoute';
import {DashboardPage} from "./pages/DashboardPage";
import {UserTable} from "./components/users/UserTable";
import {RecordsList} from "./components/records/RecordsList";
import {Container} from "@mui/material";
import {NewRecord} from "./components/records/NewRecord";

function App() {
    return (
        <Container>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path={'/'} element={ <PrivateRoute><DashboardPage/></PrivateRoute>}></Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard/users" element={<PrivateRoute> <UserTable/> </PrivateRoute>} />
                        <Route path="/dashboard/records" element={<PrivateRoute> <RecordsList/> </PrivateRoute>} />
                        <Route path="/dashboard/newrecord" element={<PrivateRoute> <NewRecord/> </PrivateRoute>} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </Container>
    );
}

export default App;