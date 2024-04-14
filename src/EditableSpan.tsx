import {ChangeEvent, Fragment, useState} from "react";
import TextField from '@mui/material/TextField';

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
    className?: string
}

export const EditableSpan = ({ value, onChange,className }: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    const activateEditModeHandler = () => {
        setEditMode(true)
    }
    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return (
        <>
            {editMode ? (
                <TextField
                    className={"col-8 p-0 m-0"}
                    variant={'outlined'}
                    value={title}
                    size={'small'}
                    onChange={changeTitleHandler}
                    onBlur={deactivateEditModeHandler}
                    autoFocus
                />
            ) : (
                <span
                    onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
}