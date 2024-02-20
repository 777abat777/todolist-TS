import React, { ChangeEvent, useState } from 'react'
import { filterValuesTypes } from '../../App'

type Props = {
    title: string
    tasks: Array<Task>
    removeTask: (id: number) => void
    changeFilter: (filter: filterValuesTypes) => void
    addTask: (value: string) => void
}
export type Task = {
    id: number
    title: string
    isDone: boolean
}

function Todolist({ title, tasks, removeTask, changeFilter, addTask }: Props) {
    let [newTaskValue, setNewTaskValue] = useState<string>('')
    function editTaskValue(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskValue(e.currentTarget.value)
    }
    function addNewTask() {
        addTask(newTaskValue)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text" value={newTaskValue} onChange={editTaskValue} />
                <button onClick={addNewTask}>+</button>
            </div>
            <ul>
                {tasks.map((el) =>
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone} />
                        <span>{el.title}</span>
                        <button onClick={() => { removeTask(el.id) }}>x</button>
                    </li>)}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist