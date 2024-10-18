import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import { icons } from '../../../assets';
import Select from '../../../components/select';
import { successSubmission } from '../../../utils/sweetalert';
import Feedbacks from '../../admin/feedbacks';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { postFeedbacks } from '../../../redux/actions';

export type messageDetailsType = {
    mail: String,
    content: String,
    date: String,
    role:string
}

const Contact = () => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [messaging, setMessaging] = useState(false);
    const [type, setType] = useState('');
    const [messageContent, setMessageContent] = useState<null | messageDetailsType>(null);
    const [theMessage, setTheMessage] = useState('');
    const typeData = ['Good', 'Bad'];
    const [comment, setComment] = useState('');
    const userInfo = useLocation();
    const dispatch = useAppDispatch();
    const [storedData, setStoreData] = useState<any>(JSON.parse(localStorage.getItem('community chat') || '[]'));
    const contacts = [
        {
            icon: <icons.BiSolidMessageRounded fontSize={27} />,
            message: "Send Feedbacks",
            content: "Chat with our product handlers and agents"
        },
        {
            icon: <icons.IoPeople fontSize={27} />,
            message: "Ask the community",
            content: "Find other to ask queries! connect with our customers"
        },
        {
            icon: <icons.FaHandshake fontSize={27} />,
            message: "Resolution Center",
            content: "Resolve transaction or account issues"
        },
        {
            icon: <icons.IoIosCall fontSize={27} />,
            message: "Call Us",
            content: "We'll answer as soon as we can"
        }]
    const petSet = {
        pet: type,
        setPet: setType
    }
    const onClick = (type: String) => {
        if (type === 'Send Feedbacks')
            setModal(true);
        if (type === 'Ask the community')
            setMessaging(true);
    }

    const submit = () => {
        if (userInfo.state.data.email) {
            dispatch(postFeedbacks({
                email: userInfo.state.data.email,
                feedback: comment,
                type: (type === 'Good' ? 'good' : 'bad')
            }))
        }
        successSubmission()
        setModal(false)
        setEmail('');
        setType('')
        setComment('')
    }

    const submitMessage = () => {
        const time = new Date().getHours() + ':' + new Date().getMinutes();
        const newMessage = {
            mail: userInfo.state.data.email,
            time: time,
            message: theMessage,
            role:userInfo.state.data.role
        }
        let existing = [];
        if (localStorage.getItem('community chat')) {
            existing = JSON.parse(localStorage.getItem('community chat')!);
        }
        existing.push(newMessage);
        localStorage.setItem('community chat', JSON.stringify(existing));
        setStoreData(
            localStorage.getItem('community chat')
                ? JSON.parse(localStorage.getItem('community chat')!)
                : []
        );
        setTheMessage('');
    }

    useEffect(() => {
    }, [storedData])
    return (
        <div className={styles.contactus}>
            <div className={styles.contactus_blur}>
                <div className={styles.contactus_blur_content}>
                    <h2>Contact Us</h2>
                    <div className={styles.contactus_blur_content_cont}>
                        {
                            contacts.map(contact => (
                                <div key={contact.message}>
                                    {contact.icon}
                                    <p onClick={() => onClick(contact.message)} className={styles.context}>{contact.message}</p>
                                    <p>{contact.content}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={modal ? styles.modal : styles.modal_close}>
                <div>
                    <h3>Feedback form</h3>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
                    <Select dataSet={typeData} state={'active'} petSet={petSet} />
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Enter comments' />
                    <button onClick={submit}>Submit</button>
                    <div className={styles.cross_icon} onClick={() => setModal(false)}><icons.RxCross2 fontSize={18} /></div>
                </div>
            </div>
            {
                messaging && <div className={styles.message}>
                    <div className={styles.main_msg}>
                        <div className={styles.message_content}>
                            <h3>Welcome to community chat</h3>
                            <icons.RxCross2 onClick={() => setMessaging(false)} />
                        </div>
                        <div className={styles.mess}>
                            <div className={styles.mess_inner_cont}>
                                {
                                    storedData.length > 0 && storedData.map((item: any) => (
                                        <div className={item.mail === userInfo.state.data.email ? `${styles.my_chat}` : ``}>
                                            {item.role==='admin'?<div title='Admin' className={styles.box_cust}>A</div>:item.role==='doctor'?<div className={styles.box_cust} title='Doctor'>D</div>:<></>}
                                            <h3>{item.mail}</h3>
                                            <p>{item.message}</p>
                                            <p>{item.time}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={styles.message_sending}>
                            <div >
                                <textarea placeholder='Send Message' value={theMessage} onChange={(e) => setTheMessage(e.target.value)} />
                                <button onClick={submitMessage}>
                                    <icons.IoSend />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Contact
