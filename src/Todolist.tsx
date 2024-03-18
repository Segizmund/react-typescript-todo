import React from 'react'
import {ChangeEvent,useState} from 'react'
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
}

export const Todolist = ({ title, subTitle, description, tasks, date, removeTask, changeFilter, addTask}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    return (
        <div>
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
            <p>{description}</p>
            <div>{tasks.map(t => t.title)}</div>
            <div>
                <input value={taskTitle}
                       onChange={event => setTaskTitle(event.currentTarget.value)}
                       onKeyUp={event => {
                           if (event.key === 'Enter') {
                               addTaskHandler()
                           }
                       }}
                />
                <Button
                    title={'+'}
                    onClick={addTaskHandler}
                />
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button title={"X"} onClick={()=>removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={()=> changeFilter('all')}/>
                <Button title={'Active'} onClick={()=> changeFilter('active')}/>
                <Button title={'Completed'} onClick={()=> changeFilter('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}