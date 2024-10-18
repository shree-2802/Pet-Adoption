import { useSelector } from 'react-redux';
import { logoutuser, userType } from '../../../redux/slice/login';
import { RootState, useAppDispatch } from '../../../redux/store';
import styles from './index.module.scss';
import { toPascalCase } from '../../../utils/text';
import { icons } from '../../../assets';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendMail } from '../../../redux/actions';

const AdminNavbar = () => {
    const [page, setPage] = useState("home");
    const userInfo: userType = useSelector<RootState>((state) => state.user.loggedInUser) as userType;
    const adminnavbar = [{ icon: <icons.FaHome fontSize={27} />, name: "home" }, { icon: <icons.RiListCheck3 fontSize={27}/>, name: "pets_list" }, { icon: <icons.GiBuyCard fontSize={27} />, name: "add_pet" }, { icon: <icons.VscFeedback fontSize={27} />, name: "feedbacks" },{icon:<icons.IoPeople fontSize={27}/>,name:"community"}]
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = (page: string) => {
        setPage(page)
    }
    const logout = () => {
        dispatch(logoutuser());
        dispatch(sendMail({mail:userInfo.email,type:'loggedout'}))
    }
    useEffect(() => {
        (page === "add_pet") ?
            navigate("/admin/addpet") : page === 'pets_list' ? navigate('/admin/pets') : navigate(`/admin/${page}`,{state:{data:userInfo}})

    }, [page])
    return (
        <div className={styles.admin_navbar}>
            <div className={styles.admin_navbar_top}>
                <div className={styles.admin_navbar_userInfo}>
                    <img src={"https://images.unsplash.com/photo-1595520519880-a86c48ea536c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnaHRzfGVufDB8fDB8fHww"} alt='S'/>
                    <div className={styles.admin_navbar_userInfo_role}>
                        <h2 className={styles.admin_navbar_userInfo_name}>{userInfo.name}</h2>
                        <p>{toPascalCase(userInfo.role)}</p>
                    </div>
                </div>
                <div className={styles.admin_navbar_navContent}>
                    {adminnavbar.map(item =>
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

export default AdminNavbar

