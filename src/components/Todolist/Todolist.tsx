import React, { ChangeEvent, useState } from 'react'
import { filterValuesTypes } from '../../App'

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
}
export type Task = {
    id: number
    title: string
    isDone: boolean
}

function Todolist({ title, tasks, removeTask, changeFilter, addTask, changeStatus, taskFilter, taskListId, removeTodoList }: Props) {
    let [newTaskValue, setNewTaskValue] = useState<string>('')
    let [errorInput, setErrorInput] = useState<null | string>(null)
    function editTaskValue(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskValue(e.currentTarget.value)
    }
    function addNewTask() {
        if (newTaskValue.trim() === "") {
            setErrorInput("error input")
            return
        }
        addTask(newTaskValue.trim(), taskListId)
        setNewTaskValue('')
    }


    return (
        <div className='todo_list'>
            <span>{title}</span> <button onClick={() => removeTodoList(taskListId)}>x</button>
            <div>
                <input type="text" value={newTaskValue} onChange={editTaskValue} onKeyDown={() => setErrorInput(null)} />
                <button onClick={addNewTask}>+</button>
                {errorInput && <div>{errorInput}</div>}
            </div>
            <ul>
                {tasks.map((el) =>
                    <li key={el.id} className={el.isDone ? 'is_done' : ""}>
                        <input type="checkbox" checked={el.isDone} onChange={() => changeStatus(el.id, taskListId)} />
                        <span>{el.title}</span>
                        <button onClick={() => { removeTask(el.id, taskListId) }}>x</button>
                    </li>)}
            </ul>
            <div>
                <button onClick={() => changeFilter('all', taskListId)} className={taskFilter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={() => changeFilter('active', taskListId)} className={taskFilter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={() => changeFilter('completed', taskListId)} className={taskFilter === 'completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist