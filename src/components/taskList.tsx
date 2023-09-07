import { Box, Checkbox, List, ListItem, Typography } from "@mui/material"


export type TaskListProps = {
    label: string,
    list: string[]
}
/**
 * TaskList
 */
const TaskListComponent = ({ label, list }: TaskListProps): JSX.Element => {
    return (
        <>
            <Box>
                <Typography variant="h6">{label}</Typography>
                <List>
                    {list.map((task: string) => (
                        <ListItem key={task}>
                            <Checkbox />
                            {task}
                        </ListItem>
                    ))}
                </List>
            </Box>

        </>
    )
}

export default TaskListComponent