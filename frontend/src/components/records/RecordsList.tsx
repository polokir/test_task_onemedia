import React, {useEffect, useState} from "react";
import {Header} from "../dashboard/Header";
import {recordsService} from "../../services/recordsService";
import {Record} from "../../types/records.types";
import {Card, CardActions, CardContent, Grid, IconButton, TextField, Typography} from "@mui/material";


export const RecordsList: React.FC = () => {
    const [records, setRecords] = useState<Record[]>([]);
    const [editId, setEditId] = useState<number|null>(null);
    const [editData, setEditData] = useState<Partial<Record>>({});

    useEffect(() => {
        const fetchRecords = async () => {
            const records = await recordsService.getRecords();
            setRecords(records);
        }
        fetchRecords();
    },[]);

    const updateRecord = async (id:number) => {
        try {

            await recordsService.updateRecord(id, editData);
            console.log("Record updated", editData);
            setRecords((prevState) =>
                prevState.map((r) => (r.id) === id ? {...r, ...editData}: r));
            setEditId(null);
            setEditData({});
        }catch (er) {
            console.error(er);
        }
    }

    const editRecord = (r: Record) => {
        setEditId(r.id);
        setEditData({
            title: r.title,
            content: r.content,
        });
    }

    const deleteRecord = async (id: number) => {
        await recordsService.deleteRecord(id);
        setRecords((prevState) =>
            prevState.filter((r) => r.id !== id)
        );
    }

    const cancelEdit = () => {
        setEditId(null);
        setEditData({});
    };

    return (
        <>
            <Header />

            <Typography
                variant="h4"
                sx={{ mt: 4, mb: 2, textAlign: "center" }}
            >
                Record List
            </Typography>

            <Grid container spacing={3} sx={{ p: 3 }}>
                {records.map((rec) => (
                    <Grid key={rec.id}>
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                {editId === rec.id ? (
                                    <TextField
                                        size="small"
                                        value={editData.title}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                title: e.target.value
                                            })
                                        }
                                    />
                                    ) : (
                                    <Typography variant="h6" gutterBottom>
                                        {rec.title}
                                    </Typography>
                                    )}

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {editId === rec.id ? (
                                        <TextField
                                            size="small"
                                            value={editData.content}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    content: e.target.value
                                                })
                                            }
                                        />
                                    ) : (
                                        <Typography variant="h6" gutterBottom>
                                            {rec.content}
                                        </Typography>
                                    )}
                                </Typography>

                                <Typography variant="caption" color="gray">
                                    Created: {new Date(rec.created_at).toString()}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                {editId === rec.id ? (
                                    <>
                                        <IconButton
                                            size={"small"}
                                            color="success"
                                            onClick={() => updateRecord(rec.id)}
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
                                        onClick={() => editRecord(rec)}
                                    >
                                        Edit
                                    </IconButton>
                                )}
                                <IconButton
                                    size={"small"}
                                    color="error"
                                    onClick={() => deleteRecord(rec.id)}
                                >
                                    delete
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}