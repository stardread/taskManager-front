'use client'
import SearchForm from "@/components/searchForm";
import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import request from 'superagent';
import isEmpty from 'lodash.isempty';
import TaskListComponent from "@/components/taskList";
import HomeButton from "@/components/homeButton";

export default function TaskList() {
    const [idFromSearchForm, setIdFromSearchForm] = useState<string>("");
    const [taskList, setTaskList] = useState<any>(null);
    const [apiCallError, setApiCallError] = useState<string | null>(null);

    const handleDataFromChild: any = useCallback((id: string) => {
        setIdFromSearchForm(id);
    }, []);

    const callGetTaskList = async (id: string) => {
        try {
            const response = await request.get(`http://localhost:3000/tasks/task/${id}`);
            setApiCallError(null);
            return response.body;
        } catch (error: any) {
            setApiCallError(`An error has occurred during API call: ${error.message}`);
            setTaskList(null);
            return null;
        }
    };

    useEffect(() => {
        if (!isEmpty(idFromSearchForm)) {
            const handleTaskList = async () => {
                const newTaskList = await callGetTaskList(idFromSearchForm);
                if (newTaskList) {
                    setTaskList(newTaskList);
                }
            };
            handleTaskList();
        }
    }, [idFromSearchForm]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
        }}>
            <HomeButton />
            <Box>
                <Typography variant="h5" >
                    Recherche de liste de taches
                </Typography>
                <SearchForm onIdFromSearchForm={handleDataFromChild} />
                {apiCallError && <Typography>{apiCallError}</Typography>}
                {!isEmpty(taskList) && <TaskListComponent label={taskList.label} list={taskList.list} />}

            </Box>
        </div>
    );
}