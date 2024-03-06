import React, { useEffect, useState } from 'react';
import './App.css';
import Todolist, { Task } from './components/Todolist/Todolist';
import AddValueForm from './components/AddValueForm/AddValueForm';
import { Grid, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hook/hook';
import { setTodos, selectTodos, fetchTodos } from './redux/todoSlice/todoSlice';
import { todoApi } from './api/api';

export type filterValuesTypes = "all" | 'active' | 'completed'


function App() {

    let dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    let taskLists = useAppSelector(selectTodos)
    let loading=useAppSelector(state=>state.todos.loading)

    function removeTask(id: number, taskListId: number) {

    }
    function removeTodoList(taskListId: number) {
        todoApi.deleteTodoList(taskListId).then((res) => {
            // dispatch(fetchTodos())
        })
    }

    function changeFilter(filter: filterValuesTypes, taskListId: number) {
        // let tasklist = taskLists.find((el) => el.id === taskListId)
        // if (tasklist) {
        //     tasklist.filter = filter
        //     dispatch(setTodos([...taskLists]))
        // }
    }

    function addTask(value: string, taskListId: number) {
        // let newTask = {
        //     id: counter,
        //     title: value,
        //     isDone: false
        // }
        // setCounter((prev) => prev + 1)
        // taskObjects[taskListId] = [newTask, ...taskObjects[taskListId]]
        // dispatch(setTaskObjects({ ...taskObjects }))
    }
    function changeStatus(id: number, taskListId: number) {
        // let output = taskObjects[taskListId].map((el) => {
        //     if (el.id === id) {
        //         el.isDone = !el.isDone
        //         return el
        //     }
        //     return el
        // })
        // taskObjects[taskListId] = output
        // dispatch(setTaskObjects({ ...taskObjects }))
    }
    function addNewTaskList(title: string) {
        todoApi.addTodoList(title, 'admin').then((res) => {
            // dispatch(fetchTodos())
        })
        // let newTaskList = { id: todoId, title: title, filter: 'all' }
        // dispatch(setTodos([newTaskList, ...taskLists]))
        // taskObjects[todoId] = []
        // dispatch(setTaskObjects({ ...taskObjects }))
        // setTodoId((prev) => prev + 1)
    }

    function editTitle(title: string, id: number, taskListId: number) {
        // let output = taskObjects[taskListId].map((el) => {
        //     if (el.id === id) {
        //         el.title = title
        //         return el
        //     }
        //     return el
        // })
        // taskObjects[taskListId] = output
        // dispatch(setTaskObjects({ ...taskObjects }))
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
            {loading?<h1>Loading...</h1>:
            <Grid container spacing={2} sx={{ padding: '20px 0' }}>
                {taskLists.map((taskList) => {
                    return (
                        <Grid key={taskList.id} item sx={{ padding: '20px' }}>
                            <Todolist editTaskTitle={editTaskTitle} editTitle={editTitle} key={taskList.id} taskListId={taskList.id} taskFilter={'all'} tasks={taskList.tasks} title={taskList.title} removeTask={removeTask}
                                changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus} removeTodoList={removeTodoList} />
                        </Grid>
                    )
                }
                )}
            </Grid>
          }
        </div>
    );
}

export default App;
