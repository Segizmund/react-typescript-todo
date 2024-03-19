import React from 'react'
import {ChangeEvent,KeyboardEvent,useState} from 'react'
import {Btn} from './Button'
import {FilterValuesType} from "./App";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
type PropsType = {
    title: string
    subTitle: string
    description: string
    // @ts-ignore
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (taskId: string, newStatusValue: boolean) => void
    filter: string
}

export const Todolist = ({ title, subTitle, description, tasks, date, removeTask, changeFilter, addTask,changeTaskStatus, filter}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setSuccess("Таск Успешно добавлен")
            setTaskTitle('')
        }
        else{
            setError('Обязательное поле')
        }
    }
    //Отслеживание изминение input
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    //Отслеживание нажатие "Enter"
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        setSuccess(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }
    return (
        <div className={"col-sm-3 border border-infoborder border-warning rounded-4"}>
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
            <p>{description}</p>
            <div className={"container"}>
                <div className="row mb-3">
                    <div className="col-9">
                        <input
                            className={error ? 'form-control is-invalid' : 'form-control'}
                            id={"floatingInputInvalid"}
                            value={taskTitle}
                            onChange={changeTaskTitleHandler}
                            onKeyUp={addTaskOnKeyUpHandler}
                        />
                    </div>
                    <div className="col">
                        <Btn
                            id={"liveToastBtn"}
                            className={"btn btn-primary"}
                            title={'+'}
                            onClick={addTaskHandler}
                        />
                    </div>
                </div>
                {error && <label htmlFor="floatingInputValue">Обязательное поле</label>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <div className={"row mb-3"}>
                                    <div className={"col-9"}>
                                        <input type="checkbox" checked={task.isDone}
                                               onChange={changeTaskStatusHandler}/>
                                        <span>{task.title}</span>
                                    </div>
                                    <div className={"col"}>
                                        <Btn
                                            className={"btn btn-danger"}
                                            title={"X"}
                                            onClick={() => removeTask(task.id)}/>
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