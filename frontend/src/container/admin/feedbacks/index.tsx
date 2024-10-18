import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import Comments from '../../../components/comments';
import { RootState, useAppDispatch } from '../../../redux/store';
import { getFeedbacks, sendMail } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import { feedbackType } from '../../../redux/slice/login';
import { icons } from '../../../assets';
import { acknowledgementSent } from '../../../utils/sweetalert';

const Feedbacks = () => {
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState('Appreciation comments');
    const [mail, setMail] = useState<string>('');
    const [reply, setReply] = useState('');
    const filterArr = ['Appreciation comments', 'Betterment comments'];
    const feedbacksData: feedbackType[] = useSelector<RootState>(state => state.user.feedbacks) as feedbackType[];
    const goodFeedback: feedbackType[] = [];
    const badFeedbacks: feedbackType[] = [];
    const dispatch = useAppDispatch();
    feedbacksData?.forEach((feedback: feedbackType) => {
        feedback.type === "good" ? goodFeedback.push(feedback) : badFeedbacks.push(feedback)
    })

    const onClickHandleFunction = (user: feedbackType) => {
        setModal(true);
        setMail(user?.email.toString());
    }
    const onSubmit = () => {
        dispatch(sendMail({
            mail,
            type: "reply",
            reply
        }))
        setModal(false)
        acknowledgementSent();
    }
    useEffect(() => {
        console.log(goodFeedback," bad ", badFeedbacks);
        dispatch(getFeedbacks());
    }, [])

    return (
        <>
            <div className={styles.feedbacks}>
                <div className={styles.feedbacks_filter}>
                    {filterArr.map(item => <div className={filter === item ? styles.selected : styles.unselected} onClick={() => { setFilter(item) }} key={item}>{item}</div>)}
                </div>
                <div>
                    {filter === "Appreciation comments" ? <Comments commentArray={goodFeedback} onClickFunction={onClickHandleFunction} /> : <Comments commentArray={badFeedbacks} onClickFunction={onClickHandleFunction} />}
                </div>
                {
                    modal && <div className={styles.modal_reply}>
                        <div>
                            <h3>Acknowledgement </h3>
                            <input className={styles.modal_email} placeholder={mail} disabled />
                            <textarea placeholder='Reply comment' value={reply} onChange={(e) => setReply(e.target.value)} />
                            <button type='submit' onClick={onSubmit}>Submit</button>
                            <button className={styles.cross_icon} onClick={() => setModal(false)}>{<icons.RxCross2 fontSize={15} />}</button>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default Feedbacks
