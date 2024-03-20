import { Btn } from './Button'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
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
        <div className={"container"}>
            <div className="row mb-3">
                <div className="col-9">
                    <input
                        className={error ? 'form-control is-invalid' : 'form-control'}
                        id={"floatingInputInvalid"}
                        value={title}
                        onChange={changeItemHandler}
                        onKeyUp={addItemOnKeyUpHandler}
                    />
                </div>
                <div className="col">
                    <Btn
                        id={"liveToastBtn"}
                        className={"btn btn-primary"}
                        title={'+'}
                        onClick={addItemHandler}
                    />
                </div>
            </div>
            {error && <label htmlFor="floatingInputValue">Обязательное поле</label>}
        </div>
    )
}