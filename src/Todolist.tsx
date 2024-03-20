import React from 'react'
import {ChangeEvent,KeyboardEvent,useState} from 'react'
import {Btn} from './Button'
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm"
import {EditableSpan } from "./EditableSpan"
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
type PropsType = {
    title: string
    todolistId: string
    subTitle?: string
    description?: string
    // @ts-ignore
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: string
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({ title, subTitle, description, tasks, date, removeTask, changeFilter, addTask,changeTaskStatus, filter,todolistId,removeTodolist,updateTask, updateTodolist}: PropsType) => {
    const [success, setSuccess] = useState<string | null>(null)
    const addTaskCallback = (title: string) => {
        addTask(title, todolistId)
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }
    return (
        <div className={"col-sm-3 border border-infoborder border-warning rounded-4"}>
            <EditableSpan value={title} onChange={updateTodolistHandler} />
            <Btn title={'x'} onClick={removeTodolistHandler} />
            <h4>{subTitle}</h4>
            <p>{description}</p>
            <AddItemForm
                addItem={addTaskCallback}
            />
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue,todolistId)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, task.id, title)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <div className={"row mb-3"}>
                                    <div className={"col-9"}>
                                        <input type="checkbox" checked={task.isDone}
                                               onChange={changeTaskStatusHandler}/>
                                        <EditableSpan
                                            onChange={changeTaskTitleHandler}
                                            value={task.title} />
                                    </div>
                                    <div className={"col"}>
                                        <Btn
                                            className={"btn btn-danger"}
                                            title={"X"}
                                            onClick={() => removeTask(task.id,todolistId)}/>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>

            )}
            <div className={"d-flex justify-content-evenly col-12"}>
                <Btn
                    className={filter === 'all' ? 'btn btn-success' : 'btn btn-primary'}
                    title={'All'}
                    onClick={() => changeFilterTasksHandler('all')}/>
                <Btn
                    className={filter === 'active' ? 'btn btn-success' : 'btn btn-primary'}
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('active')}/>
                <Btn
                    className={filter === 'completed' ? 'btn btn-success' : 'btn btn-primary'}
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}