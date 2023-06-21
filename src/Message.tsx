import React, {FC, useEffect, useState} from 'react';
import s from "./App.module.css";
import {MessageType} from "./App";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import {EditMessage} from "./EditMessage";

type MessageMeType = {
    message: MessageType
    containerStyle: string
    messageStyle: string
    funcContainer: string
    angleStyle: string
    imgSrc: string
    alt: string
    id: string
    deleteMessage: (id: string) => void
    changeMessage: (mess: string, id: string) => void
}

export const Message: FC<MessageMeType> = ({message,
                                               containerStyle,
                                               messageStyle,
                                               funcContainer,
                                               angleStyle,
                                               imgSrc,
                                               alt,
                                               deleteMessage,
                                               id,
                                               changeMessage
}) => {

  const [creationTime, setCreationTime] = useState<Date>();
  const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
        const now = new Date(Date.now());
        setCreationTime(now);
    }, []);

    let timeFormat = new Intl.DateTimeFormat("ru", {
        hour: "numeric",
        minute: "numeric",
    });

    const stringTime = `${timeFormat.format(creationTime)}`

    const deleteMessageCB = () => deleteMessage(id)

    const editMessageClick = () => {
        setEditMode(true)
    }

    const changeMessageCB = (mess: string) => {
        changeMessage(mess, id)
    }

    if (alt === "Mr. Smith") {
        return <li className={containerStyle}>
            <div className={messageStyle}>
                <EditMessage message={message.message} changeMessage={changeMessageCB} editMode={editMode} setEditMode={setEditMode}/>
                <div className={funcContainer}>
                    <IconButton onClick={deleteMessageCB}>
                        <Delete/>
                    </IconButton>
                    <IconButton onClick={editMessageClick}>
                        <EditIcon/>
                    </IconButton>
                    {stringTime}
                </div>
            </div>
            <div className={angleStyle}></div>
            <img
                src={imgSrc}
                alt={alt} className={s.ava}
            />
        </li>
    } else {
        return  <li className={containerStyle}>
            <img
                src={imgSrc}
                alt={alt} className={s.ava}
            />
            <div className={angleStyle}></div>
            <div className={messageStyle}>
                <EditMessage message={message.message} changeMessage={changeMessageCB} editMode={editMode} setEditMode={setEditMode}/>
                <div className={funcContainer}>
                    <IconButton onClick={deleteMessageCB}>
                        <Delete/>
                    </IconButton>
                    <IconButton onClick={editMessageClick}>
                        <EditIcon/>
                    </IconButton>
                    {stringTime}
                </div>
            </div>
        </li>
    }
};

// everything
// everything