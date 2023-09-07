'use client'

import HomeButton from "@/components/homeButton";
import { useState } from "react";
import request from 'superagent';
import { useRouter } from 'next/navigation';
import { Box, Button, List, ListItem, TextField, Typography } from "@mui/material";

export default function AddTaskList() {
    const router = useRouter();
    const [listName, setListName] = useState<string>('');
    const [taskName, setTaskName] = useState<string>('');
    const [tasks, setTasks] = useState<string[]>([]);

    const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Check the name contains only letters
        const value = event.target.value;
        if (/^[A-Za-z\s]+$/.test(value) && value !== '') {
            setListName(value);
        }
    };

    const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value);
    };

    const handleAddTask = () => {
        if (taskName.trim() !== '') {
            setTasks([...tasks, taskName]);
            setTaskName('');
        }
    };

    const handleSaveList = async () => {
        try {
            const postResponse = await request.post("http://localhost:3000/tasks/addTask").send({ label: listName, list: tasks });
            alert(postResponse.body.message);
        } catch (error) {
            console.error('Erreur lors du post :', error);
        }
        router.push("/");
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
        }}>
            <HomeButton />
            <Box>
                <Typography variant="h5">
                    Ajout d&apos;une nouvelle liste
                </Typography>
                <TextField
                    label="Nom de la liste"
                    variant="outlined"
                    fullWidth
                    value={listName}
                    onChange={handleListNameChange}
                    style={{
                        marginBottom: '8px',
                    }}
                />
                <List>
                    {tasks.map((task, index) => (
                        <ListItem key={index}>{task}</ListItem>
                    ))}
                </List>
                <div>
                    <TextField
                        label="Nom de la tâche"
                        variant="outlined"
                        value={taskName}
                        onChange={handleTaskNameChange}
                        style={{
                            marginBottom: '8px',
                        }}
                    />
                    <Button variant="outlined"
                        onClick={handleAddTask}
                        style={{
                            marginTop: '16px',
                            marginLeft: '8px'
                        }}>Ajouter</Button>
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveList}
                    disabled={!listName || tasks.length === 0}
                    style={{
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}
                >
                    Sauvegarder
                </Button>
            </Box>
        </div>
    );
}