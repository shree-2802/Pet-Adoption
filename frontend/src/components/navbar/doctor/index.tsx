import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import { toPascalCase } from '../../../utils/text';
import { icons } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { logoutuser, userType } from '../../../redux/slice/login';
import { RootState, useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { sendMail } from '../../../redux/actions';

const DoctorNavbar = () => {
    const [page, setPage] = useState('home');
    const userInfo: userType = useSelector<RootState>((state) => state.user.loggedInUser) as userType;
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const doctornavbar = [{ icon: <icons.FaHome fontSize={27} />, name: "home" }, { icon: <icons.IoPeople fontSize={27} />, name: "community" }, { icon: <icons.FcRules fontSize={27}/>, name: 'instruction' }]

    const logout = () => {
        dispatch(logoutuser());
        dispatch(sendMail({ mail: userInfo.email, type: 'loggedout' }))
    }
    const handleClick = (page: string) => {
        setPage(page)
    }

    useEffect(() => {
        navigate(`/doctor/${page}`, { state: { data: userInfo } });
    }, [page])

    return (
        <div className={styles.admin_navbar}>
            <div className={styles.admin_navbar_top}>
                <div className={styles.admin_navbar_userInfo}>
                    <img src={"https://images.unsplash.com/photo-1595520519880-a86c48ea536c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnaHRzfGVufDB8fDB8fHww"} alt='S' />
                    <div className={styles.admin_navbar_userInfo_role}>
                        <h2 className={styles.admin_navbar_userInfo_name}>{toPascalCase(userInfo.name)}</h2>
                        <p>{toPascalCase(userInfo.role)}</p>
                    </div>
                </div>
                <div className={styles.admin_navbar_navContent}>
                    {doctornavbar.map(item =>
                        <div key={item.name} className={page === item.name ? ` ${styles.display_line}` : styles.admin_navbar_navContent_single} onClick={() => handleClick(item.name)}>
                            <div className={styles.line}></div>
                            {item.icon}
                            <p>{toPascalCase(item.name)}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.admin_navbar_logout} onClick={logout}>
                <icons.FaSignOutAlt fontSize={27} />
                <h2>Logout</h2>
            </div>
        </div>
    )
}

export default DoctorNavbar
