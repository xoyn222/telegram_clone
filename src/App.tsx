import React, {ChangeEvent, useState, KeyboardEvent, useEffect, useRef} from 'react';
import s from './App.module.css';
import {IconButton, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {v1} from "uuid";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {Message} from "./Message";

export type MessageType = { id: string, message: string, whose: 'my' | 'hers' }

type MessagesType = Array<MessageType>

function App() {

    let [addMyMess, setAddMyMess] = useState<string>('')
    let [addHerMess, setHerMess] = useState<string>('')

    let [allMessages, setAllMessages] = useState<MessagesType>([
        {id: v1(), message: 'will you marry me?', whose: 'my'},
        {id: v1(), message: 'maybe', whose: 'hers'},
    ])
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const [listReff] = useAutoAnimate<HTMLUListElement>()
    const ref = useRef<HTMLDivElement>(null)
    const ref_2 = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = Math.ceil(ref.current.scrollHeight - ref.current.clientHeight);
        }
        if (ref_2.current) {
            ref_2.current.scrollTop = Math.ceil(ref_2.current.scrollHeight - ref_2.current.clientHeight);
        }
    }, [allMessages])

    const newMyMessCreate = (e: ChangeEvent<HTMLInputElement>) => setAddMyMess(e.currentTarget.value)
    const newHerMessCreate = (e: ChangeEvent<HTMLInputElement>) => setHerMess(e.currentTarget.value)
    const addMyNewMess = () => {
        if (addMyMess.trim()) {
            let newMess: MessageType = {id: v1(), message: addMyMess.trim(), whose: 'my'}
            setAllMessages([...allMessages, newMess])
            setAddMyMess('')
        }
    }
    const addHerNewMess = () => {
        if (addHerMess.trim()) {
            let newMess: MessageType = {id: v1(), message: addHerMess.trim(), whose: 'hers'}
            setAllMessages([...allMessages, newMess])
            setHerMess('')
        }
    }
    const onKeyPushMe = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addMyNewMess()
        }
    }
    const onKeyPushHer = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addHerNewMess()
        }
    }

    const deleteMessage = (id: string) => {
        const newAllMessages = allMessages.filter(m => m.id !== id)
        setAllMessages(newAllMessages)
    }

    const changeMessage = (mess: string, id: string) => {
        const newAllMessages = allMessages.map(m => m.id === id ? {...m, message: mess} : m)
        setAllMessages(newAllMessages)
    }

    return (
        <div className={s.App}>
            <div className={s.container}>
                <div className={s.displayMain}>
                    <div className={s.companion}>
                        <img
                            src='https://kartinkin.net/uploads/posts/2021-03/1616119039_2-p-bred-pitt-krasivie-foto-2.jpg'
                            alt="Groot" className={s.companionAva}
                        />
                        <div className={s.companionName}>Mr. Smith</div>
                    </div>
                    <div className={s.display} ref={ref}>
                        <ul ref={listRef} className={s.displayUl}>
                            {allMessages.map(message => {
                                if (message.whose === 'my') {
                                    return <Message message={message}
                                                    containerStyle={s.meContainerLi}
                                                    messageStyle={s.messMe}
                                                    funcContainer={s.functionalContainer}
                                                    angleStyle={s.angleMe}
                                                    imgSrc="https://kartinkin.net/uploads/posts/2021-03/1616119039_2-p-bred-pitt-krasivie-foto-2.jpg"
                                                    alt="Mr. Smith"
                                                    deleteMessage={deleteMessage}
                                                    changeMessage={changeMessage}
                                                    key={message.id}
                                                    id={message.id}
                                    />
                                } else if (message.whose === 'hers') {
                                    return <Message message={message}
                                                    containerStyle={s.herContainerLi}
                                                    messageStyle={s.messHer}
                                                    funcContainer={s.functionalContainer}
                                                    angleStyle={s.angleHer}
                                                    imgSrc="https://remarka.city/gallery/sun9-23.userapi.com/s/v1/if2/4AHw0fp3vUkkYWQTn2nKrIT0crPcM4kaIH7QDXm3tY14nIo5WqwUvfE-9BwUjUAZzxovycNW6Rn5J1bgguUEOul6.jpg?size=200x200&quality=96&crop=280,0,1106,1106&ava=1"
                                                    alt="Mrs. Smith"
                                                    deleteMessage={deleteMessage}
                                                    changeMessage={changeMessage}
                                                    key={message.id}
                                                    id={message.id}
                                    />
                                }
                            })}
                        </ul>
                    </div>
                    <div className={s.btnInp}>
                        <TextField variant={'outlined'}
                                   label={'Enter your message'}
                                   sx={{m: '4%', width: '75%'}}
                                   onChange={newMyMessCreate}
                                   onKeyDown={onKeyPushMe}
                                   value={addMyMess}
                                   multiline
                                   maxRows={4}
                                   InputProps={{sx: {height: '90px'}}}
                        />
                        <IconButton color={'primary'}
                                    onClick={addMyNewMess}
                                    className={s.btnStyle}
                                    sx={{mt: '10px', borderRadius: '10px'}}
                        ><SendIcon/></IconButton>
                    </div>
                </div>
            </div>
            <div className={s.containerHers}>
                <div className={s.displayMain}>
                    <div className={s.companion}>
                        <img
                            src="https://remarka.city/gallery/sun9-23.userapi.com/s/v1/if2/4AHw0fp3vUkkYWQTn2nKrIT0crPcM4kaIH7QDXm3tY14nIo5WqwUvfE-9BwUjUAZzxovycNW6Rn5J1bgguUEOul6.jpg?size=200x200&quality=96&crop=280,0,1106,1106&ava=1"
                            alt="Groot" className={s.companionAva}
                        />
                        <div className={s.companionName}>Mrs. Smith</div>
                    </div>
                    <div className={s.display} ref={ref_2}>
                        <ul className={s.displayUl} ref={listReff}>
                            {allMessages.map(message => {
                                if (message.whose === 'my') {
                                    return <Message message={message}
                                                    containerStyle={s.herContainerLi}
                                                    messageStyle={s.messHer}
                                                    funcContainer={s.functionalContainer}
                                                    angleStyle={s.angleHer}
                                                    imgSrc="https://kartinkin.net/uploads/posts/2021-03/1616119039_2-p-bred-pitt-krasivie-foto-2.jpg"
                                                    alt="Mrs. Smith"
                                                    deleteMessage={deleteMessage}
                                                    changeMessage={changeMessage}
                                                    key={message.id}
                                                    id={message.id}
                                    />
                                } else if (message.whose === 'hers') {
                                    return <Message message={message}
                                                    containerStyle={s.meContainerLi}
                                                    messageStyle={s.messMe}
                                                    funcContainer={s.functionalContainer}
                                                    angleStyle={s.angleMe}
                                                    imgSrc="https://remarka.city/gallery/sun9-23.userapi.com/s/v1/if2/4AHw0fp3vUkkYWQTn2nKrIT0crPcM4kaIH7QDXm3tY14nIo5WqwUvfE-9BwUjUAZzxovycNW6Rn5J1bgguUEOul6.jpg?size=200x200&quality=96&crop=280,0,1106,1106&ava=1"
                                                    alt="Mr. Smith"
                                                    deleteMessage={deleteMessage}
                                                    changeMessage={changeMessage}
                                                    key={message.id}
                                                    id={message.id}
                                    />
                                }
                            })}
                        </ul>
                    </div>
                    <div className={s.btnInp}>
                        <TextField variant={'outlined'}
                                   label={'Enter your message'}
                                   sx={{m: '4%', width: '75%'}}
                                   onChange={newHerMessCreate}
                                   onKeyDown={onKeyPushHer}
                                   value={addHerMess}
                                   multiline
                                   maxRows={4}
                                   InputProps={{sx: {height: '90px'}}}
                        />
                        <IconButton color={'primary'}
                                    onClick={addHerNewMess}
                                    className={s.btnStyle}
                                    sx={{mt: '10px', borderRadius: '10px'}}
                        ><SendIcon/></IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
