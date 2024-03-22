import React, {Fragment, useState} from 'react';
import { v1 } from 'uuid'
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm"
import {Header} from "./Header"
import {AppBar, IconButton, Typography, Toolbar} from "@mui/material";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {Successful} from "./Successful";
import './App.css';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
type TaskType = {
    id?: string
    title: string
    isDone?: boolean
}
type TodolistType ={
    id: string
    title: string
    filter: FilterValuesType
}
type ThemeMode = 'dark' | 'light'
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })
    const removeTask = (taskId: string, todolistId: string) => {
        // 1. Найдем таски для тудулиста, в котором будет происходить удаление
        const todolistTasks = tasks[todolistId]
        // 2. Удалим таску по которой кликнули
        const newTodolistTasks = todolistTasks.filter(t => t.id !== taskId)
        // 3. Перезапишем массив тасок на новый (отфильтрованный) массив
        tasks[todolistId] = newTodolistTasks
        // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasks, newTodolistTasks })
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? { ...tl, filter } : tl
        })
        setTodolists(newTodolists)
    }
    /*const [filter, setFilter] = useState<FilterValuesType>('all')*/

    const addTask = (title: string, todolistId: string) => {
        // 1. Создадим новую таску
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        // 2. Найдем массив тасок для тудулиста, в который будем добавлять новую таску
        const todolistTasks = tasks[todolistId]
        // 3. Перезапишем массив тасок на новый массив, добавив в начало новую таску
        tasks[todolistId] = [newTask, ...todolistTasks]
        // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasks })
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        // 1. Найдем таски для тудулиста, в котором будет происходить изменение
        const todolistTasks = tasks[todolistId]
        // 2. Пробежимся по таскам и изменим статус такси по которой нажали
        const newTodolistTasks = todolistTasks.map(t =>
            t.id == taskId ? { ...t, isDone: taskStatus } : t
        )
        // 3. Перезапишем массив тасок на новый массив, с уже измененным статусом у таски
        tasks[todolistId] = newTodolistTasks
        // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasks })
    }
    const [showA, setShowA] = useState(false);
    const closeShow = (showA:any) => {
        showA ? alert("asd") : alert("123")
    };
    //логика для удаления тудулиста
    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)
        delete tasks[todolistId]
        // засетаем в state копию объекта
        setTasks({ ...tasks })
    }
    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = { id: todolistId, title: title, filter: 'all' }
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [todolistId]: [] })
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)),
        }
        setTasks(newTodolistTasks)
    }
    const updateTodolist = (todolistId: string, title: string) => {
        const newTodolists = todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl))
        setTodolists(newTodolists)
    }
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#ef6c00',
            },
            text:{
                primary: '#ef6c00',
            }
        },
    })
    const changeModeHandler = (themeMode: any) => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }
    return (
        <div className={"container App mx-auto"}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <Header
                setThemeMode={setThemeMode}
                theme={theme}
            />
            <Row className={"mb-3"}>
                <h2 className={"text-center"}>Todo-List</h2>
            </Row>
            <Row className={"MainInput mb-3 ps-2 pe-2"}>
                <AddItemForm
                    theme={theme}
                    addItem={addTodolist}/>
            </Row>
            <Container fixed>
                <Grid container spacing={15}>
                {todolists.map(tl => {
                    const allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks

                    if (tl.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                    }

                    if (tl.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                    }
                    return (
                        <Grid>
                            <Paper>
                                <Todolist
                                    key={tl.id}
                                    todolistId={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist }
                                    updateTask={updateTask}
                                    updateTodolist={updateTodolist}
                                    theme={theme}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
                </Grid>
            </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
