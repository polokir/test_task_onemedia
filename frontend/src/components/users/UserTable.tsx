import React, { useEffect, useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    IconButton, Typography
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { userService } from "../../services/userService";
import { Role, User } from "../../types/auth.types";
import {Header} from "../dashboard/Header";

export const UserTable: React.FC = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<User>>({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await userService.getAllUsers();
                setUsers(res);
            } catch (e) {
                console.error(e);
            }
        };

        if (user && user.role === Role.ADMIN) {
            fetchUsers();
        }
    }, [user]);

    if (!user || user.role !== Role.ADMIN) {
        return null;
    }

    const editUser = (u: User) => {
        setEditId(u.id);
        setEditData({
            email: u.email,
            last_name: u.last_name,
            first_name: u.first_name,
            role: u.role,
        });
    }

    const updateUser = async (id: number) => {
        try {
            await userService.updateUser(id, editData);
            setUsers((prevState) =>
            prevState.map((u) => (u.id) === id ? {...u, ...editData}: u));
            setEditId(null);
            setEditData({});
        }catch (er) {
            console.error(er);
        }
    }

    const cancelEdit = () => {
        setEditId(null);
        setEditData({});
    };

    const deleteUser = async (id: number) => {
        await userService.deleteUser(id);
        setUsers((prevState) =>
            prevState.filter((u) => u.id !== id)
        );
    }

    return (<>
            <Header/>
            <Typography
                variant="h4"
                sx={{ mt: 4, mb: 2, textAlign: "center" }}
            >
                User List
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {users.length > 0 &&
                            Object.keys(users[0]).map((key, idx) => (
                                <TableCell key={idx}>{key}</TableCell>
                            ))}
                        <TableCell>action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell key={idx}>{item.id}</TableCell>
                            <TableCell>{item.email}</TableCell>
                                {editId === item.id ? (
                                    <TextField
                                        size="small"
                                        value={editData.first_name}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                first_name: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    <TableCell>{item.first_name}</TableCell>
                                )}
                                {editId === item.id ? (
                                    <TextField
                                        size="small"
                                        value={editData.last_name}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                last_name: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    <TableCell>{item.last_name}</TableCell>
                                )}
                                {editId === item.id ? (
                                    <TextField
                                        size="small"
                                        value={editData.role}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                role: e.target.value as Role
                                            })
                                        }
                                    />
                                ) : (
                                    <TableCell>item.role</TableCell>
                                )}
                            <TableCell>{item.created_at.toString()}</TableCell>
                            <TableCell>{item.updated_at.toString()}</TableCell>
                            <TableCell>
                                <TableCell>
                                    {editId === item.id ? (
                                        <>
                                            <IconButton
                                                size={"small"}
                                                color="success"
                                                onClick={() => updateUser(item.id)}
                                            >
                                                Save
                                            </IconButton>

                                            <IconButton
                                                size={"small"}
                                                color="error"
                                                onClick={cancelEdit}
                                            >
                                                Cancel
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton
                                            size={"small"}
                                            color="primary"
                                            onClick={() => editUser(item)}
                                        >
                                            Edit
                                        </IconButton>
                                    )}
                                    <IconButton
                                        size={"small"}
                                        color="error"
                                        onClick={() => deleteUser(item.id)}
                                    >
                                        delete
                                    </IconButton>
                                </TableCell>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
