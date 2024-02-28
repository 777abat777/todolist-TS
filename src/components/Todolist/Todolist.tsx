import React, { ChangeEvent, useState } from 'react'
import { filterValuesTypes } from '../../App'
import AddValueForm from '../AddValueForm/AddValueForm'
import EditableTitle from '../EditableTitle/EditableTitle'

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
        <div className='todo_list'>
            <EditableTitle title={title} changeTitle={changeTitle} /><button onClick={() => removeTodoList(taskListId)}>x</button>
            <AddValueForm addNewItem={addNewTask} />
            <ul>
                {tasks.map((el) => {
                    function changeTitle(title: string) {
                        editTitle(title, el.id, taskListId)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? 'is_done' : ""}>
                            <input type="checkbox" checked={el.isDone} onChange={() => changeStatus(el.id, taskListId)} />
                            <EditableTitle title={el.title} changeTitle={changeTitle} />
                            <button onClick={() => { removeTask(el.id, taskListId) }}>x</button>
                        </li>
                    )
                }
                )
                }
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
