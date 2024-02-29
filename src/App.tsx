import React, { useState } from 'react';
import './App.css';
import Todolist, { Task } from './components/Todolist/Todolist';
import AddValueForm from './components/AddValueForm/AddValueForm';
import { Grid, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hook/hook';
import { setTodos, setTaskObjects, removeTaskAction } from './redux/todoSlice/todoSlice';

export type filterValuesTypes = "all" | 'active' | 'completed'

export type taskObjectsTypes = {
    [key: string]: Array<Task>
}

function App() {
    let dispatch = useAppDispatch()
    let taskLists = useAppSelector(state => state.todoReducer.taskLists)
    let taskObjects = useAppSelector(state => state.todoReducer.taskObjects)
    let [counter, setCounter] = useState(5)
    let [todoId, setTodoId] = useState(3)

    function removeTask(id: number, taskListId: number) {
        dispatch(removeTaskAction({ id, taskListId }))
    }
    function removeTodoList(taskListId: number) {
        let newTaskLists = taskLists.filter(el => el.id !== taskListId)
        delete taskObjects[taskListId]
        dispatch(setTodos(newTaskLists))
        dispatch(setTaskObjects({ ...taskObjects }))
    }

    function changeFilter(filter: filterValuesTypes, taskListId: number) {
        let tasklist = taskLists.find((el) => el.id === taskListId)
        if (tasklist) {
            tasklist.filter = filter
            dispatch(setTodos([...taskLists]))
        }
    }

    function addTask(value: string, taskListId: number) {
        let newTask = {
            id: counter,
            title: value,
            isDone: false
        }
        setCounter((prev) => prev + 1)
        taskObjects[taskListId] = [newTask, ...taskObjects[taskListId]]
        dispatch(setTaskObjects({ ...taskObjects }))
    }
    function changeStatus(id: number, taskListId: number) {
        let output = taskObjects[taskListId].map((el) => {
            if (el.id === id) {
                el.isDone = !el.isDone
                return el
            }
            return el
        })
        taskObjects[taskListId] = output
        dispatch(setTaskObjects({ ...taskObjects }))
    }
    function addNewTaskList(title: string) {
        let newTaskList = { id: todoId, title: title, filter: 'all' }
        dispatch(setTodos([newTaskList, ...taskLists]))
        taskObjects[todoId] = []
        dispatch(setTaskObjects({ ...taskObjects }))
        setTodoId((prev) => prev + 1)
    }

    function editTitle(title: string, id: number, taskListId: number) {
        let output = taskObjects[taskListId].map((el) => {
            if (el.id === id) {
                el.title = title
                return el
            }
            return el
        })
        taskObjects[taskListId] = output
        dispatch(setTaskObjects({ ...taskObjects }))
    }
    function editTaskTitle(title: string, taskListId: number) {
        let task = taskLists.find(el => el.id === taskListId)
        if (task) {
            task.title = title
            dispatch(setTodos([...taskLists]))
        }
    }

    return (
        <div className="App" style={{ padding: '20px' }}>
            <Paper sx={{ width: '250px', padding: '20px' }}>
                <h2 style={{ textAlign: "center" }}>Add new list</h2>
                <AddValueForm addNewItem={addNewTaskList} />
            </Paper>
            <Grid container spacing={2} sx={{ padding: '20px 0' }}>
                {taskLists.map((taskList) => {
                    let taskForTodoList = taskObjects[taskList.id]
                    if (taskList.filter === "active") {
                        taskForTodoList = taskForTodoList.filter(el => el.isDone === false)
                    }
                    if (taskList.filter === "completed") {
                        taskForTodoList = taskForTodoList.filter(el => el.isDone === true)
                    }
                    return (
                        <Grid item sx={{ padding: '20px' }}>
                            <Todolist editTaskTitle={editTaskTitle} editTitle={editTitle} key={taskList.id} taskListId={taskList.id} taskFilter={taskList.filter} tasks={taskForTodoList} title={taskList.title} removeTask={removeTask}
                                changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus} removeTodoList={removeTodoList} />
                        </Grid>
                    )
                }
                )}
            </Grid>

        </div>
    );
}

export default App;
