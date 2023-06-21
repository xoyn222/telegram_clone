import React, {ChangeEvent, useState, KeyboardEvent, FC} from 'react';
import {TextField} from "@mui/material";

type EditMessageType = {
    message: string
    changeMessage: (mess: string) => void
    editMode: boolean
    setEditMode: (mode: boolean) => void
}

export const EditMessage: FC<EditMessageType> = ({message, changeMessage, editMode, setEditMode}) => {

    const [inputValue, setInputValue] = useState<string>(message)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        changeMessage(inputValue)
        setEditMode(false)
    }
    const onChaneInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && offEditMode()

    return (
        editMode
            ? <TextField onBlur={offEditMode}
                         onKeyUp={onKeyPress}
                         autoFocus
                         value={inputValue}
                         onChange={onChaneInputHandler}
                         variant={'standard'}
                         sx={{width: '120px'}}
            />
            : <span onDoubleClick={onEditMode} className={'editSpan'}>{message}</span>
    );
};

