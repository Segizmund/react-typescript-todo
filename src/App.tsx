import React, {Fragment, useState} from 'react';
import { v1 } from 'uuid'
import {Todolist} from './Todolist';
import './App.css';
type TaskType = {
    id?: string
    title: string
    isDone?: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false },
    ])
    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false,
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const newState = tasks.map(t => (t.id == taskId ? { ...t, isDone: taskStatus } : t))
        setTasks(newState)
    }
    return (
        <div className={"App"}>
        <Fragment>
            <Todolist
                title={"Обучение"}
                subTitle={"Уроки"}
                description={"Описание уроков"}
                tasks={tasksForTodolist}
                date={"14.03.2024"}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus ={changeTaskStatus}
                filter={filter}
            />
        </Fragment>
        </div>
    );
}

export default App;
