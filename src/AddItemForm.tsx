import { Btn } from './Button'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField } from '@mui/material';
import { IconButton, Checkbox } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox'

type PropsType = {
    addItem: (title: string) => void
    theme: any
}

export const AddItemForm = ({ addItem,theme }: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Обязательное поле')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div className={"mb-3"}>
            <div className="row d-flex justify-content-between">
                <div className="col-9 inpText">
                    <TextField
                        className={error ? 'form-control is-invalid input-title' : 'form-control input-title'}
                        value={title}
                        placeholder={"theme.palette.primary.contrastText"}
                        onChange={changeItemHandler}
                        onKeyUp={addItemOnKeyUpHandler}
                        label={'Введите название'}
                        error={!!error}
                        helperText={error}
                    >

                    </TextField>
                </div>
                <div className="col-3 inpBtn">
                    <IconButton
                        style={{paddingLeft: '16px'}}
                        id={"liveToastBtn"}
                        color={"primary"}
                        onClick={addItemHandler}
                    >
                        <AddBoxIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}