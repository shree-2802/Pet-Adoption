import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/store';
import { logoutuser, userType } from '../../../redux/slice/login';
import { toPascalCase } from '../../../utils/text';
import { useNavigate } from 'react-router-dom';
import { icons } from '../../../assets';
import { sendMail } from '../../../redux/actions';

const UserNavbar = () => {
    const navigate = useNavigate();
    const userInfo: userType = useSelector<RootState>(state => state.user.loggedInUser) as userType;
    const [page, setPage] = useState('Home');
    const dispatch = useAppDispatch();
    const pageArr = ['Home', 'Donate Pet', 'Order Pets', 'About Us', 'Contact', "logout"];

    useEffect(() => {
        if (page === 'Home') {
            navigate('/user/home')
        }
        else if (page === 'Donate Pet') {
            navigate('/user/salepet', { state: { data: userInfo } });
        }
        else if (page === 'Order Pets') {
            navigate('/user/records', { state: { data: userInfo } });
        }
        else if (page === 'About Us') {
            navigate('/user/aboutus')
        }
        else if (page === "Contact") {
            navigate('/user/contact', { state: { data: userInfo } })
        }
        else {
            dispatch(logoutuser());
            dispatch(sendMail({ mail: userInfo.email, type: 'loggedout' }))
        }
    }, [page])

    return (
        <div className={styles.usernavbar}>
            <div>
                <div><img src={"https://plus.unsplash.com/premium_photo-1688541098711-fc692bcf5763?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hpdmF8ZW58MHx8MHx8fDA%3D"} alt='U' /></div>
                <p>Hi {toPascalCase(userInfo.name)} !</p>
            </div>
            <div>
                {pageArr.map(pg => <p key={pg} className={pg === page ? styles.selected : styles.unselected} onClick={() => setPage(pg)}>{pg === 'logout' ? <icons.FaPowerOff fontSize={17} /> : pg}</p>)}
            </div>
        </div>
    )
}

export default UserNavbar
