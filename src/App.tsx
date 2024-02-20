import React, { useState } from 'react';
import './App.css';
import Todolist, { Task } from './components/Todolist/Todolist';

export type filterValuesTypes = "all" | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<Task>>(
        [
            { id: 1, title: 'Html', isDone: true },
            { id: 2, title: 'css', isDone: false },
            { id: 3, title: 'js', isDone: false }
        ]
    )
    let [counter, setCounter] = useState(5)
    let [taskFilter, setTaskFilter] = useState<filterValuesTypes>('all')

    let taskForTodoList = tasks
    if (taskFilter === "active") {
        taskForTodoList = tasks.filter(el => el.isDone === false)
    }
    if (taskFilter === "completed") {
        taskForTodoList = tasks.filter(el => el.isDone === true)
    }


    function removeTask(id: number) {
        let outputTasks = tasks.filter(el => el.id !== id)
        setTasks(outputTasks)
    }
    function changeFilter(filter: filterValuesTypes) {
        setTaskFilter(filter)
    }
    function addTask(value: string) {
        let newTask = {
            id: counter,
            title: value,
            isDone: false
        }
        setCounter((prev) => prev + 1)
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist tasks={taskForTodoList} title='first' removeTask={removeTask} changeFilter={changeFilter} addTask={addTask} />
        </div>
    );
}

export default App;
