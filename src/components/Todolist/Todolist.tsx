import { filterValuesTypes } from '../../App'
import AddValueForm from '../AddValueForm/AddValueForm'
import EditableTitle from '../EditableTitle/EditableTitle'
import { Button, Checkbox, IconButton, Paper } from '@mui/material';
import { Stack } from '@mui/material';
import { CloseSharp } from '@mui/icons-material';

type Props = {
    title: string
    tasks: Array<Task>
    removeTask: (id: number, taskListId: number) => void
    changeFilter: (filter: filterValuesTypes, taskListId: number) => void
    addTask: (value: string, taskListId: number) => void
    changeStatus: (id: number, taskListId: number) => void
    taskFilter: filterValuesTypes
    taskListId: number
    removeTodoList: (taskListId: number) => void
    editTitle: (title: string, id: number, taskListId: number) => void
    editTaskTitle: (title: string, taskListId: number) => void
}
export type Task = {
    id: number
    title: string
    isDone: boolean
}


function Todolist({ title, tasks, removeTask, changeFilter, addTask, changeStatus, taskFilter, taskListId, removeTodoList, editTitle, editTaskTitle }: Props) {

    function addNewTask(value: string) {
        addTask(value, taskListId)
    }
    function changeTitle(title: string) {
        editTaskTitle(title, taskListId)
    }
    return (
        <Paper elevation={3} sx={{ p: '10px', display: "flex", flexDirection: "column", maxWidth: "280px" }}>
            <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                <EditableTitle title={title} changeTitle={changeTitle} />
                <IconButton aria-label="delete" size='small' onClick={() => removeTodoList(taskListId)}>
                    <CloseSharp fontSize="inherit" />
                </IconButton>
            </Stack>
            <AddValueForm addNewItem={addNewTask} />
            <ul>
                {tasks.map((el) => {
                    function changeTitle(title: string) {
                        editTitle(title, el.id, taskListId)
                    }
                    return (
                        <Stack direction={"row"} alignItems={'center'} justifyContent={'center'} spacing={1} key={el.id} className={el.isDone ? 'is_done' : ""}>
                            <Checkbox checked={el.isDone} onChange={() => changeStatus(el.id, taskListId)} />
                            <EditableTitle title={el.title} changeTitle={changeTitle} />
                            <IconButton aria-label="delete" size='small' onClick={() => { removeTask(el.id, taskListId) }}>
                                <CloseSharp fontSize="inherit" />
                            </IconButton>
                        </Stack>
                    )
                }
                )
                }
            </ul>
            <Stack direction={'row'} spacing={1} sx={{ marginTop: "auto" }}>
                <Button sx={{ padding: '5px' }} onClick={() => changeFilter('all', taskListId)} size='small' variant={taskFilter === 'all' ? 'contained' : 'outlined'}>All</Button>
                <Button sx={{ padding: '5px' }} onClick={() => changeFilter('active', taskListId)} size='small' variant={taskFilter === 'active' ? 'contained' : 'outlined'}>Active</Button>
                <Button sx={{ padding: '5px' }} onClick={() => changeFilter('completed', taskListId)} size='small' variant={taskFilter === 'completed' ? 'contained' : 'outlined'}>Completed</Button>
            </Stack>
        </Paper>
    )
}

export default Todolist
