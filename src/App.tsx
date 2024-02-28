import React, { useState } from 'react';
import './App.css';
import Todolist, { Task } from './components/Todolist/Todolist';
import AddValueForm from './components/AddValueForm/AddValueForm';

export type filterValuesTypes = "all" | 'active' | 'completed'
export type taskListType = {
    id: number
    title: string
    filter: filterValuesTypes
}
export type taskObjectsTypes = {
    [key: string]: Array<Task>
}

function App() {
    let [counter, setCounter] = useState(5)
    let [todoId, setTodoId] = useState(3)
    let todolist1Id = 1
    let todolist2Id = 2
    let [taskLists, setTasklists] = useState<Array<taskListType>>([
        { id: todolist1Id, title: "first", filter: 'all' },
        { id: todolist2Id, title: "second", filter: 'completed' },
    ])
    let [taskObjects, setTaskObjects] = useState<taskObjectsTypes>({
        [todolist1Id]: [
            { id: 1, title: 'Html', isDone: true },
            { id: 2, title: 'css', isDone: false },
            { id: 3, title: 'js', isDone: false }
        ],
        [todolist2Id]: [
            { id: 1, title: 'Html', isDone: true },
            { id: 2, title: 'css', isDone: false },
            { id: 3, title: 'js', isDone: false }
        ]
    })



    function removeTask(id: number, taskListId: number) {
        let outputTasks = taskObjects[taskListId].filter(el => el.id !== id)
        taskObjects[taskListId] = outputTasks
        setTaskObjects({ ...taskObjects })

    }
    function removeTodoList(taskListId: number) {
        let newTaskLists = taskLists.filter(el => el.id !== taskListId)
        delete taskObjects[taskListId]
        setTasklists(newTaskLists)
        setTaskObjects({ ...taskObjects })
    }

    function changeFilter(filter: filterValuesTypes, taskListId: number) {
        let tasklist = taskLists.find((el) => el.id === taskListId)
        if (tasklist) {
            tasklist.filter = filter
            setTasklists([...taskLists])
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
        setTaskObjects({ ...taskObjects })
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
        setTaskObjects({ ...taskObjects })
    }
    function addNewTaskList(title: string) {
        let newTaskList: taskListType = { id: todoId, title: title, filter: 'all' }
        setTasklists([newTaskList, ...taskLists])
        taskObjects[todoId] = []
        setTaskObjects({ ...taskObjects })
        setTodoId((prev) => prev + 1)
    }

    return (

        <div className="App">
            <AddValueForm addNewItem={addNewTaskList} />
            {taskLists.map((taskList) => {
                let taskForTodoList = taskObjects[taskList.id]
                if (taskList.filter === "active") {
                    taskForTodoList = taskForTodoList.filter(el => el.isDone === false)
                }
                if (taskList.filter === "completed") {
                    taskForTodoList = taskForTodoList.filter(el => el.isDone === true)
                }
                return (
                    <Todolist key={taskList.id} taskListId={taskList.id} taskFilter={taskList.filter} tasks={taskForTodoList} title={taskList.title} removeTask={removeTask}
                        changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus} removeTodoList={removeTodoList} />
                )
            }
            )}

        </div>
    );
}

export default App;
