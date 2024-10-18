import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';
import { icons } from '../../../assets';

const CommunityInDoctor = () => {
    const [theMessage, setTheMessage] = useState('');
    const [storedData, setStoreData] = useState<any>(JSON.parse(localStorage.getItem('community chat') || '[]'));
    const userInfo = useLocation();

    const submitMessage = () => {
        const time = new Date().getHours() + ':' + new Date().getMinutes();
        const newMessage = {
            mail: userInfo.state.data.email,
            time: time,
            message: theMessage,
            role: userInfo.state.data.role
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
        <div className={styles.main_msg_admin}>
            <h1>Community Chat</h1>

            <div className={styles.mess}>
                <div className={styles.mess_inner_cont}>
                    {
                        storedData.length > 0 && storedData.map((item: any) => (
                            <div className={item.mail === userInfo.state.data.email ? `${styles.my_chat}` : ``}>
                                {item.role === 'admin' ? <div title='Admin' className={styles.box_cust}>A</div> : item.role === 'doctor' ? <div className={item.role === 'doctor' ? styles.box_doct : styles.box_cust} title='Doctor'>D</div> : <></>}
                                <h3>{item.mail}</h3>
                                <p>{item.message}</p>
                                <p>{item.time}</p>
                            </div>
                        )
                        )
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
    )
}

export default CommunityInDoctor
