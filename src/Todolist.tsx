import React from 'react'
import {ChangeEvent,KeyboardEvent,useState} from 'react'
import {Btn} from './Button'
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm"
import {EditableSpan } from "./EditableSpan"
import { Delete } from '@mui/icons-material'
import { IconButton, Checkbox } from '@mui/material';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from '@mui/material/Button';
import {ButtonBase} from "@mui/material";
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
    theme: any
}

export const Todolist = ({ title, subTitle, description, tasks, date, removeTask, changeFilter, addTask,changeTaskStatus, filter,todolistId,removeTodolist,updateTask, updateTodolist,theme}: PropsType) => {
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
        <div className={"p-2  border-infoborder border-warning"}>
            <Row className={"d-flex justify-content-between"}>
                <div className={"col-9"}>
                    <EditableSpan value={title} onChange={updateTodolistHandler}/>
                </div>
                <div className={"col-3"}>
                    <IconButton style={{left: '8px'}} className={""} onClick={removeTodolistHandler}>
                        <Delete/>
                    </IconButton>
                </div>
            </Row>
            <h4>{subTitle}</h4>
            <p>{description}</p>
            <AddItemForm
                theme={theme}
                addItem={addTaskCallback}
            />
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue,todolistId)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, task.id, title)
                        }
                        return (
                            <ListItem key={task.id} className={task.isDone ? 'is-done pe-0' : 'pe-0'}>
                                <div className={"row mb-3 w-100 d-flex justify-content-between"}>
                                    <div className={"col-9 w-auto "}>
                                        <Checkbox
                                            checked={task.isDone}
                                            color={"success"}
                                            onChange={changeTaskStatusHandler}
                                        >
                                        </Checkbox>
                                        <EditableSpan
                                            onChange={changeTaskTitleHandler}
                                            value={task.title} />
                                    </div>
                                    <div className={"col-3 ps-1 pe-0 position-relative"} style={{left: '17px'}}>
                                        <IconButton
                                            className={"col-12"}
                                            onClick={() => removeTask(task.id,todolistId)}>
                                            <Delete/>
                                        </IconButton>
                                    </div>
                                </div>
                            </ListItem>
                        )
                    })}
                </List>

            )}
            <div className={"d-flex justify-content-evenly col-12 mb-3"}>
                <Button
                    variant={filter === 'all' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('all')}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('active')}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('completed')}
                >
                    Completed
                </Button>
            </div>
            <div>{date}</div>
        </div>
    )
}