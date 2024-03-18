import React from 'react'
import {ChangeEvent,KeyboardEvent,useState} from 'react'
import {Button} from './Button'
import {FilterValuesType} from "./App";
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
                        <Button
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
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                </div>
                                <div className={"col"}>
                                <Button
                                    className={"btn btn-danger"}
                                    title={"X"}
                                    onClick={()=>removeTask(task.id)}/>
                                </div>
                            </div>
                            </li>
                        )
                    })}
                </ul>

            )}
            <div className={"d-flex justify-content-evenly col-12"}>
                <Button
                    className={filter === 'all' ? 'btn btn-success' : 'btn btn-primary'}
                    title={'All'}
                    onClick={()=> changeFilterTasksHandler('all')}/>
                <Button
                    className={filter === 'active' ? 'btn btn-success' : 'btn btn-primary'}
                    title={'Active'}
                    onClick={()=> changeFilterTasksHandler('active')}/>
                <Button
                    className={filter === 'completed' ? 'btn btn-success' : 'btn btn-primary'}
                    title={'Completed'}
                    onClick={()=> changeFilterTasksHandler('completed')}/>
            </div>
            <div>{date}</div>
            {success && <div className="toast" id="myToast">
                <div className="toast-header">
                    <strong className="me-auto"><i className="bi-gift-fill"></i> We miss you!</strong>
                    <small>11 mins ago</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    It's been a long time since you visited us. We've something special for you. <a href="#">Click
                    here!</a>
                </div>
            </div>}
        </div>
    )
}