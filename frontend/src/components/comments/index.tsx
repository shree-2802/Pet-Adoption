import React from 'react'
import styles from './index.module.scss';
import { feedbackType } from '../../redux/slice/login';


export type commentsType = {
    commentArray: feedbackType[],
    onClickFunction: (user: feedbackType) => void;
}

const Comments = ({ commentArray, onClickFunction }: commentsType) => {
    return (
        <div className={styles.comment}>
            <h2>Comment Section</h2>
            {
                commentArray.length === 0 ? <p>No Comments Yet</p> :
                    <div className={styles.comment_section}>

                        {

                            commentArray.map((comment, ind) => (
                                <div key={ind} onClick={() => onClickFunction(comment)}>
                                    <h6>{comment.email}</h6>
                                    <p>{comment.feedback}</p>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Comments
